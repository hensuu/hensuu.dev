<template>
  <div>
    <div class="w-full h-30 p-1 shadow">
      <div class="max-w-6xl mx-auto flex justify-between items-center h-full">
        <div class="flex items-center space-x-4">
          <LogoSticker class="w-14 h-14 -rotate-12 drop-shadow-sm/20 stroke-green-500" />
          <span class="text-5xl font-semibold text-green-500">hensuu.dev</span>
        </div>
      </div>
    </div>
    <div class="w-full h-16 p-1 shadow">
      <div class="max-w-6xl mx-auto flex justify-center items-center gap-8 h-full">
        <RouteSign
          color="green"
          primary-text="經歷"
          secondary-text="Works"
        />
        <RouteSign
          color="rose"
          primary-text="音樂"
          secondary-text="Music"
        />
        <RouteSign
          color="blue"
          primary-text="專案"
          secondary-text="Projects"
        />
      </div>
    </div>
    <div class="bg-yellow-50 ">
      <slot />
    </div>
  </div>
</template>
