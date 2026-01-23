<template>
  <div class="flex items-center justify-center ">
    <div class="flex flex-row gap-1 md:gap-2 items-center font-medium text-lg sm:text-xl stroke-[1.7]">
      <div
        class="rounded-full px-3 py-2 transition-all duration-200 cursor-pointer"
        :class="{ 'bg-yellow-50 stroke-yellow-700 ring ring-yellow-400 stroke-[2] scale-105': $route.path === '/',
                  'hover:bg-yellow-50 hover:stroke-yellow-700 stroke-gray-600': $route.path !== '/',
        }"
        @click="() => $router.push('/')"
      >
        <LogoOutlined class="" />
      </div>
      <span
        class="rounded-full px-3 py-2 transition-all duration-200 cursor-pointer"
        :class="{ 'bg-purple-50 text-purple-700 ring ring-purple-400 scale-105': $route.path === '/blog',
                  'hover:bg-purple-50 hover:text-purple-700  text-gray-600': $route.path !== '/blog',
        }"
        @click="() => $router.push('/blog')"
      >blog</span>
      <span
        class="rounded-full px-3 py-2 transition-all duration-200 cursor-pointer"
        :class="{ 'bg-blue-50 text-blue-700 ring ring-blue-400 scale-105': $route.path === '/project',
                  'hover:bg-blue-50 hover:text-blue-700  text-gray-600': $route.path !== '/project',
        }"
        @click="() => $router.push('/project')"
      >project</span>
      <span
        class="rounded-full px-3 py-2 transition-all duration-200 cursor-pointer"
        :class="{ 'bg-cyan-50 text-cyan-600 ring ring-cyan-400 scale-105': $route.path === '/now',
                  'hover:bg-cyan-50 hover:text-cyan-600  text-gray-600': $route.path !== '/now',
        }"
        @click="() => $router.push('/now')"
      >now</span>
    </div>
  </div>
</template>
