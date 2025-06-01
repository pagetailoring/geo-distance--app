<script setup lang="ts">
const pointOne = ref()
const pointTwo = ref()
</script>

<template>
  <form>
    <UiInput v-model="pointOne" name="pointOne" />
    <UiInput v-model="pointTwo" name="pointTwo" />
    <UiButton type="submit">
      <span> Check distance </span>
    </UiButton>
  </form>
</template>
