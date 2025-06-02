<script setup lang="ts">
defineProps<{
  isError: boolean
  isValidPointA: boolean
}>()

const emit = defineEmits<{ (event: 'reset'): void }>()
</script>

<template>
  <section class="alert card" :class="{ error: isError }">
    <div class="one">
      <small class="up">
        Invalid input for the
        {{ !isValidPointA ? 'first' : 'second' }} location.
      </small>
      <br />
      <small>
        Latitude range is {{ -1 * RANGE_LATITUDE }} to {{ RANGE_LATITUDE }},
        longitude is {{ -1 * RANGE_LONGITUDE }} to {{ RANGE_LONGITUDE }}.
      </small>
    </div>
    <div class="two">
      <UiButton
        class="reset"
        :class="{ solid: isError }"
        @click="emit('reset')"
      >
        <SvgoRefresh class="icon" />
        <small class="up">RESET</small>
      </UiButton>
    </div>
  </section>
</template>
