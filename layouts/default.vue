<template>
  <div
    class="bg-linear-to-b from-white transition-all duration-1000"
    :class="{
      'to-yellow-100': $route.path === '/',
      'to-violet-100': $route.path === '/blog',
    }"
    :style="{
      '--tw-gradient-to-position': '100vh',
    }"
  >
    <div class="w-[calc(100vw-4rem)] lg:w-5xl border-x-2 border-x-gray-200 mx-auto">
      <NavigationBar class="sticky z-10 -top-8 py-10" />
      <HorizontalLine />
      <slot />
      <HorizontalLine />
      <div class="h-30">
        <div class="flex flex-col items-center justify-center h-full">
          <span class="text-gray-500 text-sm">© 2025 hensuu.dev</span>
        </div>
      </div>
    </div>
  </div>
</template>
