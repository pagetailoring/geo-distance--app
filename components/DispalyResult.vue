<script setup lang="ts">
const { resultMeters } = defineProps<{
  resultMeters: number
}>()

const resultToDisplay = computed<string>(() => {
  const meters = (resultMeters % 1000) + ' m'
  const kilometers =
    `${getRounded(resultMeters / 1000)}`
      .split('')
      .reverse()
      .map((char, index) => (index > 0 && index % 3 === 0 ? char + ' ' : char))
      .reverse()
      .join('') + ' km '

  return resultMeters > 999 ? kilometers + meters : meters
})
</script>

<template>
  <section class="result card">
    <h2>Distance between points</h2>
    <p class="xlg">
      {{ resultToDisplay }}
    </p>
    <slot />
  </section>
</template>
