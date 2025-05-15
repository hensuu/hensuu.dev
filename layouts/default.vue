<template>
  <div
    class="h-[100rem] bg-linear-to-b from-white to-yellow-100"
    :style="{
      '--tw-gradient-to-position': '100vh',
    }"
  >
    <div class="w-[calc(100vw-4rem)] lg:w-4xl border-x-2 border-x-gray-200 mx-auto">
      <NavigationBar class="sticky z-10 -top-8 py-10" />

      <HorizontalLine />
      <slot />
    </div>
  </div>
</template>
