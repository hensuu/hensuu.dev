<template>
  <div>
    <div class="px-6 sm:px-10 pt-10 pb-6">
      <div class="flex flex-col gap-3">
        <span class="text-rose-800/70 text-3xl">
          → Contemporary Art Gallery
        </span>
        <p class="text-yellow-950 font-medium text-base/relaxed">
          記錄我去過的當代藝術館 — 日本與台灣。點選地圖標記或側欄卡片，寫下造訪日期與感想，資料會保存在你的瀏覽器中。
        </p>
        <div class="flex flex-wrap gap-2 mt-1">
          <div class="bg-rose-50 border border-rose-200 px-3 py-1 rounded-lg">
            <span class="text-rose-800 font-medium text-sm">🗾 日本 <strong>{{ stats.jpVisited }}</strong>/{{ stats.jpTotal }}</span>
          </div>
          <div class="bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg">
            <span class="text-sky-800 font-medium text-sm">🇹🇼 台灣 <strong>{{ stats.twVisited }}</strong>/{{ stats.twTotal }}</span>
          </div>
          <div class="bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
            <span class="text-amber-800 font-medium text-sm">✦ 總計 <strong>{{ stats.jpVisited + stats.twVisited }}</strong>/{{ MUSEUMS.length }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 sm:px-10 pb-10">
      <div class="flex flex-col lg:flex-row gap-4 border border-gray-200 rounded-2xl bg-white/60 overflow-hidden">
        <ClientOnly>
          <div
            id="museum-map"
            ref="mapEl"
            class="h-[60vh] lg:h-[70vh] flex-1 min-w-0"
          />
          <template #fallback>
            <div class="h-[60vh] lg:h-[70vh] flex-1 min-w-0 flex items-center justify-center text-gray-500">
              Loading map…
            </div>
          </template>
        </ClientOnly>

        <aside class="lg:w-80 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col max-h-[70vh]">
          <div class="p-3 flex flex-col gap-2 border-b border-gray-200">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜尋美術館⋯"
              class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white/80 text-sm text-gray-800 outline-none focus:border-rose-400"
            >
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="f in filters"
                :key="f.key"
                class="px-3 py-1 rounded-full border text-xs cursor-pointer transition-all"
                :class="activeFilter === f.key
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white/70 text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-700'"
                @click="activeFilter = f.key"
              >
                {{ f.label }}
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto p-2">
            <div
              v-for="m in filteredMuseums"
              :key="m.id"
              class="p-3 rounded-xl border cursor-pointer transition-all mb-1.5"
              :class="selectedId === m.id
                ? 'bg-rose-50 border-rose-300'
                : 'border-transparent hover:bg-gray-50 hover:border-gray-200'"
              @click="selectMuseum(m.id)"
            >
              <div class="flex items-start gap-2">
                <span
                  class="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  :class="m.region === 'japan' ? 'bg-rose-400' : 'bg-sky-400'"
                />
                <div class="min-w-0 flex-1">
                  <div class="text-sm font-semibold text-gray-800 leading-snug">
                    {{ m.name }}
                  </div>
                  <div class="text-xs text-gray-500 italic mt-0.5 truncate">
                    {{ m.en }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ m.loc }}
                  </div>
                  <div
                    v-if="visitData[m.id]"
                    class="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    ✓ {{ visitData[m.id].date || '已造訪' }}{{ visitData[m.id].note ? ' · ' + truncate(visitData[m.id].note, 12) : '' }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="filteredMuseums.length === 0"
              class="text-center text-sm text-gray-400 py-6"
            >
              沒有符合的美術館
            </div>
          </div>
        </aside>
      </div>
    </div>

    <div
      v-if="editingId"
      class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      @click.self="closeEdit"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200">
        <h2 class="text-xl font-semibold text-rose-700">
          {{ editingMuseum?.name }}
        </h2>
        <p class="text-sm text-gray-500 mt-0.5 mb-5">
          {{ editingMuseum?.en }} — {{ editingMuseum?.loc }}
        </p>
        <label class="block text-xs uppercase tracking-wide text-gray-500 mb-1.5">造訪日期</label>
        <input
          v-model="editDate"
          type="date"
          class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-rose-400 mb-4"
        >
        <label class="block text-xs uppercase tracking-wide text-gray-500 mb-1.5">筆記</label>
        <textarea
          v-model="editNote"
          placeholder="寫下你的感想⋯"
          class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-rose-400 min-h-20 resize-y mb-5"
        />
        <div class="flex justify-end gap-2">
          <button
            v-if="hasVisit(editingId)"
            class="px-4 py-2 rounded-lg text-sm border border-red-300 text-red-600 hover:bg-red-50 cursor-pointer"
            @click="removeVisit"
          >
            移除紀錄
          </button>
          <button
            class="px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
            @click="closeEdit"
          >
            取消
          </button>
          <button
            class="px-4 py-2 rounded-lg text-sm bg-rose-500 text-white border border-rose-500 hover:bg-rose-600 cursor-pointer"
            @click="saveVisit"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

interface Museum {
  id: string
  name: string
  en: string
  region: 'japan' | 'taiwan'
  loc: string
  lat: number
  lng: number
}

interface Visit {
  date: string
  note: string
}

const MUSEUMS: Museum[] = [
  { id: 'kanazawa21', name: '金沢21世紀美術館', en: '21st Century Museum of Contemporary Art', region: 'japan', loc: '石川県金沢市', lat: 36.5607, lng: 136.6564 },
  { id: 'mot', name: '東京都現代美術館', en: 'Museum of Contemporary Art Tokyo', region: 'japan', loc: '東京都江東区', lat: 35.6805, lng: 139.8072 },
  { id: 'mori', name: '森美術館', en: 'Mori Art Museum', region: 'japan', loc: '東京都港区', lat: 35.6604, lng: 139.7292 },
  { id: 'nact', name: '国立新美術館', en: 'The National Art Center, Tokyo', region: 'japan', loc: '東京都港区', lat: 35.6651, lng: 139.7262 },
  { id: 'benesse', name: 'ベネッセハウス ミュージアム', en: 'Benesse House Museum', region: 'japan', loc: '香川県直島町', lat: 34.4562, lng: 133.9958 },
  { id: 'chichu', name: '地中美術館', en: 'Chichu Art Museum', region: 'japan', loc: '香川県直島町', lat: 34.4604, lng: 133.9908 },
  { id: 'lee_ufan', name: '李禹煥美術館', en: 'Lee Ufan Museum', region: 'japan', loc: '香川県直島町', lat: 34.4575, lng: 133.9933 },
  { id: 'teshima', name: '豊島美術館', en: 'Teshima Art Museum', region: 'japan', loc: '香川県土庄町', lat: 34.4925, lng: 134.0795 },
  { id: 'towada', name: '十和田市現代美術館', en: 'Towada Art Center', region: 'japan', loc: '青森県十和田市', lat: 40.6082, lng: 141.2063 },
  { id: 'aomori', name: '青森県立美術館', en: 'Aomori Museum of Art', region: 'japan', loc: '青森県青森市', lat: 40.8239, lng: 140.7040 },
  { id: 'monet_echigo', name: '越後妻有里山現代美術館 MonET', en: 'Echigo-Tsumari Museum MonET', region: 'japan', loc: '新潟県十日町市', lat: 36.9672, lng: 138.6856 },
  { id: 'mito', name: '水戸芸術館', en: 'Art Tower Mito', region: 'japan', loc: '茨城県水戸市', lat: 36.3709, lng: 140.4732 },
  { id: 'toyota', name: '豊田市美術館', en: 'Toyota Municipal Museum of Art', region: 'japan', loc: '愛知県豊田市', lat: 35.0878, lng: 137.1585 },
  { id: 'nmao', name: '国立国際美術館', en: 'The National Museum of Art, Osaka', region: 'japan', loc: '大阪市北区', lat: 34.6917, lng: 135.4917 },
  { id: 'nakanoshima', name: '大阪中之島美術館', en: 'Nakanoshima Museum of Art', region: 'japan', loc: '大阪市北区', lat: 34.6922, lng: 135.4887 },
  { id: 'momat', name: '東京国立近代美術館', en: 'MOMAT', region: 'japan', loc: '東京都千代田区', lat: 35.6906, lng: 139.7530 },
  { id: 'momak', name: '京都国立近代美術館', en: 'MoMAK', region: 'japan', loc: '京都市左京区', lat: 35.0115, lng: 135.7838 },
  { id: 'hara_arc', name: '原美術館 ARC', en: 'Hara Museum ARC', region: 'japan', loc: '群馬県渋川市', lat: 36.5234, lng: 138.9510 },
  { id: 'kumamoto', name: '熊本市現代美術館', en: 'Contemporary Art Museum Kumamoto', region: 'japan', loc: '熊本県熊本市', lat: 32.8021, lng: 130.7080 },
  { id: 'kirishima', name: '霧島アートの森', en: 'Kirishima Open-Air Museum', region: 'japan', loc: '鹿児島県湧水町', lat: 31.8820, lng: 130.7885 },
  { id: 'karuizawa', name: '軽井沢現代美術館', en: 'Museum of Contemporary Art Karuizawa', region: 'japan', loc: '長野県軽井沢町', lat: 36.3576, lng: 138.6170 },
  { id: 'fukuoka_asia', name: '福岡アジア美術館', en: 'Fukuoka Asian Art Museum', region: 'japan', loc: '福岡県福岡市', lat: 33.5936, lng: 130.4080 },
  { id: 'teamlab', name: 'チームラボボーダレス', en: 'teamLab Borderless', region: 'japan', loc: '東京都江東区', lat: 35.6268, lng: 139.7830 },
  { id: 'tfam', name: '台北市立美術館', en: 'Taipei Fine Arts Museum', region: 'taiwan', loc: '台北市中山區', lat: 25.0725, lng: 121.5247 },
  { id: 'moca_taipei', name: '台北當代藝術館', en: 'MOCA Taipei', region: 'taiwan', loc: '台北市大同區', lat: 25.0508, lng: 121.5193 },
  { id: 'ntmofa', name: '國立臺灣美術館', en: 'National Taiwan Museum of Fine Arts', region: 'taiwan', loc: '台中市西區', lat: 24.1414, lng: 120.6637 },
  { id: 'kmfa', name: '高雄市立美術館', en: 'Kaohsiung Museum of Fine Arts', region: 'taiwan', loc: '高雄市鼓山區', lat: 22.6527, lng: 120.2870 },
  { id: 'juming', name: '朱銘美術館', en: 'Juming Museum', region: 'taiwan', loc: '新北市金山區', lat: 25.2368, lng: 121.5960 },
  { id: 'yusiu', name: '毓繡美術館', en: 'Yu-Hsiu Museum of Art', region: 'taiwan', loc: '南投縣草屯鎮', lat: 23.9645, lng: 120.7020 },
  { id: 'chiayi', name: '嘉義市立美術館', en: 'Chiayi Art Museum', region: 'taiwan', loc: '嘉義市西區', lat: 23.4779, lng: 120.4377 },
  { id: 'tnam', name: '台南市美術館', en: 'Tainan Art Museum', region: 'taiwan', loc: '台南市中西區', lat: 22.9893, lng: 120.2045 },
  { id: 'kuandu', name: '關渡美術館', en: 'KdMoFA', region: 'taiwan', loc: '台北市北投區', lat: 25.1300, lng: 121.4638 },
  { id: 'c_lab', name: '臺灣當代文化實驗場 C-LAB', en: 'Taiwan Contemporary Culture Lab', region: 'taiwan', loc: '台北市大安區', lat: 25.0440, lng: 121.5330 },
  { id: 'moca_yilan', name: '壯圍沙丘旅遊服務園區', en: 'Zhuangwei Dune Center (Huang Sheng-Yuan)', region: 'taiwan', loc: '宜蘭縣壯圍鄉', lat: 24.7575, lng: 121.8156 },
  { id: 'alien_art', name: '金馬賓館當代美術館', en: 'Alien Art Centre', region: 'taiwan', loc: '高雄市鼓山區', lat: 22.6263, lng: 120.2660 },
]

const STORAGE_KEY = 'hensuu-gallery-visits'
const filters = [
  { key: 'all', label: '全部' },
  { key: 'japan', label: '日本' },
  { key: 'taiwan', label: '台灣' },
  { key: 'visited', label: '已造訪' },
  { key: 'unvisited', label: '未造訪' },
] as const

const visitData = ref<Record<string, Visit>>({})
const activeFilter = ref<'all' | 'japan' | 'taiwan' | 'visited' | 'unvisited'>('all')
const searchQuery = ref('')
const selectedId = ref<string | null>(null)
const editingId = ref<string | null>(null)
const editDate = ref('')
const editNote = ref('')
const mapEl = ref<HTMLElement | null>(null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletNS = any
let leaflet: LeafletNS = null
let map: LeafletNS = null
const markers: Record<string, LeafletNS> = {}

useHead({
  title: 'gallery · hensuu.dev',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css' },
  ],
})

const editingMuseum = computed(() => MUSEUMS.find(m => m.id === editingId.value) || null)

const filteredMuseums = computed(() => {
  return MUSEUMS.filter((m) => {
    if (activeFilter.value === 'japan' && m.region !== 'japan') return false
    if (activeFilter.value === 'taiwan' && m.region !== 'taiwan') return false
    if (activeFilter.value === 'visited' && !visitData.value[m.id]) return false
    if (activeFilter.value === 'unvisited' && visitData.value[m.id]) return false
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      return m.name.toLowerCase().includes(q)
        || m.en.toLowerCase().includes(q)
        || m.loc.toLowerCase().includes(q)
    }
    return true
  })
})

const stats = computed(() => {
  const jpTotal = MUSEUMS.filter(m => m.region === 'japan').length
  const twTotal = MUSEUMS.filter(m => m.region === 'taiwan').length
  const jpVisited = MUSEUMS.filter(m => m.region === 'japan' && visitData.value[m.id]).length
  const twVisited = MUSEUMS.filter(m => m.region === 'taiwan' && visitData.value[m.id]).length
  return { jpTotal, twTotal, jpVisited, twVisited }
})

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s
}

function hasVisit(id: string | null) {
  return id ? !!visitData.value[id] : false
}

function loadVisits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) visitData.value = JSON.parse(raw)
  }
  catch {
    visitData.value = {}
  }
}

function saveVisits() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitData.value))
  }
  catch (e) {
    console.error('localStorage save failed', e)
  }
}

function createIcon(region: 'japan' | 'taiwan', visited: boolean) {
  if (!leaflet) return null
  const color = visited ? '#10b981' : (region === 'japan' ? '#fb7185' : '#38bdf8')
  const border = visited ? '#6ee7b7' : (region === 'japan' ? '#fda4af' : '#7dd3fc')
  const size = visited ? 16 : 13
  return leaflet.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid ${border};border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function openEdit(id: string) {
  const v = visitData.value[id] || { date: '', note: '' }
  editingId.value = id
  editDate.value = v.date
  editNote.value = v.note
  map?.closePopup()
}

function closeEdit() {
  editingId.value = null
}

function saveVisit() {
  if (!editingId.value) return
  const id = editingId.value
  visitData.value = { ...visitData.value, [id]: { date: editDate.value, note: editNote.value.trim() } }
  saveVisits()
  refreshMarker(id)
  closeEdit()
}

function removeVisit() {
  if (!editingId.value) return
  const id = editingId.value
  const next: Record<string, Visit> = {}
  for (const key in visitData.value) {
    if (key !== id) next[key] = visitData.value[key]!
  }
  visitData.value = next
  saveVisits()
  refreshMarker(id)
  closeEdit()
}

function refreshMarker(id: string) {
  const m = MUSEUMS.find(x => x.id === id)
  if (!m) return
  const icon = createIcon(m.region, !!visitData.value[id])
  if (icon) markers[id]?.setIcon(icon)
}

function selectMuseum(id: string) {
  selectedId.value = id
  const m = MUSEUMS.find(x => x.id === id)
  if (!m || !map) return
  map.flyTo([m.lat, m.lng], 11, { duration: 0.8 })
  markers[id]?.openPopup()
}

function loadLeafletScript(): Promise<LeafletNS> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  if (w.L) return Promise.resolve(w.L)
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-leaflet]')
    if (existing) {
      existing.addEventListener('load', () => resolve(w.L))
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    script.async = true
    script.dataset.leaflet = 'true'
    script.onload = () => resolve(w.L)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

async function initMap() {
  if (!mapEl.value) return
  leaflet = await loadLeafletScript()
  const L = leaflet
  map = L.map(mapEl.value, {
    center: [32, 132],
    zoom: 5,
    zoomControl: true,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
  }).addTo(map)

  MUSEUMS.forEach((m) => {
    const visited = !!visitData.value[m.id]
    const icon = createIcon(m.region, visited)
    const marker = L.marker([m.lat, m.lng], { icon }).addTo(map)

    marker.on('click', () => {
      selectedId.value = m.id
    })

    marker.bindPopup(() => {
      const v = visitData.value[m.id]
      const visitInfo = v
        ? `<div style="margin-top:4px;font-size:12px;color:#059669">✓ ${v.date || '已造訪'}</div>`
        : ''
      return `<div style="font-size:14px;font-weight:600;color:#be123c">${m.name}</div>
        <div style="font-size:11px;color:#6b7280;margin-top:2px">${m.en}</div>
        <div style="font-size:11px;color:#6b7280">${m.loc}</div>
        ${visitInfo}
        <button data-museum-id="${m.id}" class="popup-edit-btn" style="margin-top:8px;padding:4px 12px;border-radius:6px;border:1px solid #f43f5e;background:transparent;color:#f43f5e;font-size:12px;cursor:pointer">
          ${v ? '編輯紀錄' : '標記造訪'}
        </button>`
    })

    markers[m.id] = marker
  })
}

function handlePopupClick(e: Event) {
  const target = e.target as HTMLElement
  if (target.classList.contains('popup-edit-btn')) {
    const id = target.getAttribute('data-museum-id')
    if (id) openEdit(id)
  }
}

onMounted(async () => {
  loadVisits()
  await nextTick()
  await initMap()
  document.addEventListener('click', handlePopupClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handlePopupClick)
  map?.remove()
  map = null
})
</script>

<style>
.leaflet-popup-content-wrapper {
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}
.leaflet-popup-content {
  margin: 10px 14px !important;
  font-family: inherit !important;
}
</style>
