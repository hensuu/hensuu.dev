<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Define the filter for shadow -->

    <!-- White outline layer with filter applied -->
    <g
      stroke="#fefefe"
      stroke-width="6"
    > <!-- not pure white, looks better with a slight off-white color -->
      <path d="M3 3v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3" />
      <path d="M7 9V7.5a2 2 0 0 0-4 0" />
      <path d="M 10.5 6 L 17.5 6" />
      <path d="m14.5 9 3-3-3-3" />

      <rect
        x="3"
        y="6"
        width="18"
        height="15"
        fill="white"
        stroke="none"
      />
    </g>

    <!-- Original foreground layer -->
    <g>
      <path d="M3 3v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3" />
      <path d="M7 9V7.5a2 2 0 0 0-4 0" />
      <path d="M 10.5 6 L 17.5 6" />
      <path d="m14.5 9 3-3-3-3" />
      <path d="M7.5 13v1" />
      <path d="M16.5 13v1" />
      <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />
    </g>
  </svg>
</template>

<script setup lang="ts">

</script>
