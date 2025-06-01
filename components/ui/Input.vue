<script setup lang="ts">
defineProps<{
  label?: string
  name: string
  type?: string
}>()

const modelValue = defineModel<string>()
</script>

<template>
  <div class="group">
    <label :for="name">
      <span>{{ label ? label : name }}</span>
    </label>
    <input v-bind="$attrs" :id="name" v-model="modelValue" :type="type ? type : 'text'" :name />
  </div>
</template>
