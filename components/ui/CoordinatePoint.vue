<script setup lang="ts">
const props = defineProps<{
  header?: string
  id?: string
  modelValue: Coordinates
  isValid?: boolean
}>()

// ~/utils/config
const maxLongitude = RANGE_LONGITUDE
const maxLatitude = RANGE_LATITUDE

const emit = defineEmits<{
  (e: 'update:modelValue', value: Coordinates): void
}>()

const latitude = computed<number>({
  get: () => props.modelValue.latitude,
  set: (val: number) => {
    emit('update:modelValue', { ...props.modelValue, latitude: Number(val) })
  },
})

const longitude = computed<number>({
  get: () => props.modelValue.longitude,
  set: (val: number) => {
    emit('update:modelValue', { ...props.modelValue, longitude: Number(val) })
  },
})
</script>

<template>
  <div class="group" :class="{ error: !isValid }">
    <span v-if="header" class="label">{{ header }}</span>

    <UiInput
      v-model.number="latitude"
      :name="`latitude-${id}`"
      label="Latitude"
      step="any"
      :min="-1 * maxLatitude"
      :max="maxLatitude"
      placeholder="Enter latitude"
    />

    <UiInput
      v-model.number="longitude"
      :name="`longitude-${id}`"
      label="Longitude"
      step="any"
      :min="-1 * maxLongitude"
      :max="maxLongitude"
      placeholder="Enter longitude"
    />
    <div class="options">
      <slot />
    </div>
  </div>
</template>
