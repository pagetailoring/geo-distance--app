<script setup lang="ts">
const { pointA, pointB, isError } = defineProps<{
  pointA: Coordinates
  pointB: Coordinates
  isError: boolean
}>()

const emit = defineEmits<{
  (e: 'updateA' | 'updateB', value: Coordinates): void
}>()

function swapLocations() {
  if (isError) return

  const tempA = pointA
  const tempB = pointB
  emit('updateA', tempB)
  emit('updateB', tempA)
}
</script>

<template>
  <UiButton
    title="Swap locations coordinates"
    class="solid"
    :class="{ lock: isError }"
    @click="swapLocations()"
  >
    <SvgoSwap />
  </UiButton>
</template>
