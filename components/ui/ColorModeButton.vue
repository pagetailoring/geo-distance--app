<script lang="ts" setup>
const isDark = useDark()
const toggleDark = useToggle(isDark)

const { shift, c } = useMagicKeys()
whenever(c, () => (shift.value ? toggleDark() : null))
</script>

<template>
  <UiButton
    class="mode"
    title="shift + C"
    :aria-label="isDark ? 'dark' : 'light'"
    @click="toggleDark()"
  >
    <ClientOnly>
      <template #fallback>
        <SvgoMoon />
      </template>

      <SvgoMoon v-if="isDark" />
      <SvgoSun v-else />
    </ClientOnly>
  </UiButton>
</template>
