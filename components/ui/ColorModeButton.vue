<script lang="ts" setup>
const isDark = useDark()
const toggleDark = useToggle(isDark)

const { shift, c } = useMagicKeys()
whenever(c, () => (shift.value ? toggleDark() : null))
</script>

<template>
  <ClientOnly>
    <UiButton class="mode" @click="toggleDark()">
      {{ isDark ? 'dark' : 'light' }}
    </UiButton>
  </ClientOnly>
</template>
