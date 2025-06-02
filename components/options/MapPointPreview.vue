<script lang="ts" setup>
import type { LatLngExpression, PointExpression } from 'leaflet'

const emit = defineEmits<{ (e: 'update', value: Coordinates): void }>()

const { point, second } = defineProps<{
  point: Coordinates
  second: Coordinates
}>()

const isOpen = ref(false)
const dialogRef = useTemplateRef('dialogRef')
const zoom = 12

const center = computed<PointExpression>(() => {
  return [point.latitude, point.longitude]
})
const latLng = computed<LatLngExpression>(() => {
  return [point.latitude, point.longitude]
})
const secondPoint = computed<LatLngExpression>(() => {
  return [second.latitude, second.longitude]
})

// @temp ~~ logic to improve @fix me
const newCoordinates = ref<Coordinates>()
type LatLngUpdate = {
  lat: number
  lng: number
}

function updateOnDrag(val: LatLngUpdate) {
  newCoordinates.value = {
    latitude: val.lat,
    longitude: val.lng,
  }
}

function openDialog() {
  isOpen.value = true
  dialogRef.value?.showModal()
}

function closeDialog() {
  if (newCoordinates.value) emit('update', newCoordinates.value)

  dialogRef.value?.close()
  isOpen.value = false
}

onMounted(() => {
  onKeyStroke((e) => {
    // block native <dialog> behevior to update coordinates during close
    if (e.code === 'Escape') e.preventDefault()

    if (isOpen.value) {
      if (e.code === 'Escape' || e.code === 'KeyQ') closeDialog()
    }
  })
})

const attribution = '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
</script>

<template>
  <UiButton class="solid" aria-label="Open map" @click="openDialog">
    <SvgoPin />
  </UiButton>

  <dialog ref="dialogRef" class="dialog">
    <LMap v-if="isOpen" :zoom style="z-index: 1" :center>
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="latLng" draggable @update:lat-lng="updateOnDrag">
        <LPopup>Coordinates (you can drag it)</LPopup>
      </LMarker>
      <LMarker :lat-lng="secondPoint">
        <LPopup>Second Point</LPopup>
      </LMarker>
    </LMap>

    <UiButton class="close" aria-label="Close map" @click="closeDialog">
      <SvgoClose />
    </UiButton>
  </dialog>
</template>
