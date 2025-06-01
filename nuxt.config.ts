export default defineNuxtConfig({
  modules: [
    '@nuxtjs/html-validator',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },

  css:
    process.env.NODE_ENV === 'development'
      ? ['~/assets/styles/main.scss', '~/assets/styles/dev.scss']
      : ['~/assets/styles/main.scss'],

  compatibilityDate: '2025-05-15',

  typescript: { typeCheck: true, strict: true },

  eslint: { config: { stylistic: true } },
})
