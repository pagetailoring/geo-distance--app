<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'

// ~/utils/defaults: DEFAULT_FIRST_LOCATION & DEFAULT_SECOND_LOCATION
const pointA = ref<Coordinates>(DEFAULT_FIRST_LOCATION)
const pointB = ref<Coordinates>(DEFAULT_SECOND_LOCATION)

const isValidPointA = computed<boolean>(() => isValidCoordinates(pointA.value))
const isValidPointB = computed<boolean>(() => isValidCoordinates(pointB.value))
const isError = computed<boolean>(
  () => !(isValidPointA.value && isValidPointB.value)
)

// ~/utils/calculate
const resultMeters = computed<number>((previous = 0) => {
  return !isError.value
    ? calculateHaversineDistance(pointA.value, pointB.value)
    : previous
})

function reset() {
  pointA.value = DEFAULT_FIRST_LOCATION
  pointB.value = DEFAULT_SECOND_LOCATION
}

const isTestWithApi = ref(false)
onMounted(async () => {
  await promiseTimeout(500)
  isTestWithApi.value = true
})
</script>

<template>
  <LazyDispalyResult :result-meters :is-error>
    <LazyOptionsValidateValueWithApi
      v-if="isTestWithApi"
      hydrate-on-idle
      :result-meters
      :point-a
      :point-b
    />
  </LazyDispalyResult>

  <div class="card">
    <h3>Select coordinates</h3>
    <UiCoordinatePoint
      id="A"
      v-model="pointA"
      :is-valid="isValidPointA"
      header="First location"
    >
      <LazyOptionsGeolocationButton
        hydrate-on-idle
        @update="(val) => (pointA = val)"
      />

      <LazyOptionsMapPointPreview
        :point="pointA"
        :second="pointB"
        @update="(val) => (pointA = val)"
      />
    </UiCoordinatePoint>

    <UiCoordinatePoint
      id="B"
      v-model="pointB"
      :is-valid="isValidPointB"
      header="Second location"
    >
      <LazyOptionsSwapLocationValues
        hydrate-on-idle
        :is-error
        :point-a
        :point-b
        @update-b="(val) => (pointB = val)"
        @update-a="(val) => (pointA = val)"
      />

      <LazyOptionsMapPointPreview
        :point="pointB"
        :second="pointA"
        @update="(val) => (pointB = val)"
      />
    </UiCoordinatePoint>
  </div>

  <LazyAlertCardWithReset :is-error :is-valid-point-a @reset="reset()" />
</template>
