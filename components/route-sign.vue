<template>
  <div class="flex flex-row items-center space-x-3">
    <div
      class="w-2 h-8"
      :class="colorVariants[color]"
    />

    <div class="flex flex-col items-start">
      <span class="text-xl font-semibold">{{ primaryText }}</span>
      <span class="text-sm font-medium text-gray-600">{{ secondaryText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorVariants = {
  green: 'bg-green-500',
  rose: 'bg-rose-500',
  blue: 'bg-blue-500',
}

interface Props {
  color?: keyof typeof colorVariants
  primaryText?: string
  secondaryText?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'green',
  primaryText: 'DefaultPrimaryText',
  secondaryText: 'DefaultSecondaryText',
})
</script>
