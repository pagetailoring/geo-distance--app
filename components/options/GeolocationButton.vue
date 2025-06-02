<script setup lang="ts">
import { until, useGeolocation } from '@vueuse/core'

const emit = defineEmits<{ (e: 'update', value: Coordinates): void }>()

const disabled = ref(false)

const title = computed(() => {
  return !isSupported.value
    ? 'Geolocation is not supported on your device'
    : 'Click to use your location in the form'
})

const { isSupported, coords, locatedAt, error, resume, pause } = useGeolocation(
  { immediate: false }
)
watchImmediate(isSupported, (val) => (disabled.value = !val))
watch(error, (val) => console.log('geolocation:', val))

async function getLocation() {
  resume()
  await until(locatedAt).not.toBeNull()
  await nextTick()

  const { accuracy, latitude, longitude } = coords.value
  // @idea if accuracy !== 0 emit else repeat ~~ ?? ~~ // Test because infinite loop is possible
  if (accuracy) emit('update', { latitude, longitude })

  await nextTick()
  pause()
}
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <UiButton><SvgoGps /></UiButton>
    </template>

    <UiButton
      :disabled
      :title
      class="gps"
      :class="{ lock: disabled, solid: isSupported }"
      @click="getLocation()"
    >
      <SvgoGps />
    </UiButton>
  </ClientOnly>
</template>
