<script setup lang="ts">
defineProps<{
  label?: string
  name: string
  type?: string
}>()

const modelValue = defineModel<number>()
</script>

<template>
  <input
    v-bind="$attrs"
    :id="name"
    v-model="modelValue"
    :title="label"
    :aria-label="label ? label : name"
    :type="type ? type : 'number'"
    :name
  />
</template>
