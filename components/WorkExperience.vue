<template>
  <div class="flex flex-col gap-3 mb-6">
    <div class="flex flex-col gap-1">
      <h3 class="text-lg font-semibold text-gray-950">
        {{ title }}
      </h3>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <p class="text-base font-medium text-orange-700">
          {{ company }}
        </p>
        <p class="text-sm font-medium text-gray-600">
          {{ duration }}
        </p>
      </div>
    </div>
    <ul class="list-disc list-outside ml-5 space-y-1.5">
      <li
        v-for="(item, index) in responsibilities"
        :key="index"
        class="text-sm text-gray-950/90 leading-relaxed"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  company: string
  duration: string
  responsibilities: string[]
}

defineProps<Props>()
</script>
