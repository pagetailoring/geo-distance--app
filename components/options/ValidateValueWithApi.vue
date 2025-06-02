<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'

const { pointA, pointB, resultMeters } = defineProps<{
  pointA: Coordinates
  pointB: Coordinates
  resultMeters: number
}>()

type State = 'pending' | 'error' | 'success'

const state = ref<State>('pending')
const test = ref<boolean | null>(null)

const updateState = (val = 'pending' as State) => (state.value = val)
function restTest() {
  test.value = null
  updateState()
}

const { calculate } = useDistanceCalculator()
async function compareWithBackendCalculation() {
  restTest()

  const response = await calculate(pointA, pointB)

  if (response && response?.distance && typeof response?.distance) {
    test.value = response?.distance === resultMeters
    updateState('success')
    return
  }

  updateState('error')
  console.log('🔥', 'res:', response)
}

watch(
  () => resultMeters,
  () => restTest()
)

watchDebounced(
  () => [pointA, pointB],
  () => compareWithBackendCalculation(),
  { debounce: 2000, immediate: true }
)

const isMounted = ref(false)
onMounted(async () => {
  await promiseTimeout(100)
  isMounted.value = true
})
</script>

<template>
  <div class="test" :style="{ opacity: isMounted ? 1 : 0 }">
    <div class="one" title="fetch data state">
      <SvgoPending
        :style="{ opacity: state === 'pending' ? 1 : 0 }"
        class="spin"
      />
      <SvgoClose :style="{ opacity: state === 'error' ? 1 : 0 }" />
      <SvgoCheck :style="{ opacity: state === 'success' ? 1 : 0 }" />
    </div>
    <div class="two" title="validation of distance with server">
      <SvgoClose class="error" :style="{ opacity: test === false ? 1 : 0 }" />
      <SvgoCheck class="success" :style="{ opacity: test === true ? 1 : 0 }" />
    </div>
  </div>
</template>
