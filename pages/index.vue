<template>
  <div>
    <div class="h-110 p-10">
      <div class="flex flex-col gap-10 items-center justify-center h-full">
        <div class="flex flex-row items-center justify-center gap-2">
          <span class="text-4xl h-full font-medium text-sienna-400 mb-10">↘</span>
          <span class="text-5xl/17 inline-block w-min sm:w-64 md:w-fit font-medium whitespace-nowrap bg-clip-text text-transparent bg-linear-to-r from-sienna-400 via-lavender-400 to-shamrock-400 ">Hi, <wbr>it's me, <wbr>hensuu!</span>
          <LogoSticker
            class="ml-3 -mb-2 w-18 h-18 shrink-0 stroke-shamrock-600 stroke-[1.7] drop-shadow-md rotate-10"
          />
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
          <div class="bg-sienna-50 border border-sienna-200 px-3 py-1 rounded-lg">
            <span class="text-sienna-800 font-medium text-md">🧑‍💻 Developer</span>
          </div>
          <span class="text-sienna-800 font-normal text-xl mb-0.5">+</span>
          <div class="bg-sienna-50 border border-sienna-200 px-3 py-1 rounded-lg">
            <span class="text-sienna-800 font-medium text-md">🎵 Vocaloid Producer</span>
          </div>
        </div>
      </div>
    </div>
    <HorizontalLine />
  </div>
</template>

<script setup lang="ts">
useHead(
  {
    title: 'hensuu.dev',
  },
)
</script>
