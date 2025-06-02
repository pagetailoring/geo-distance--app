export default defineNuxtConfig({
  modules: [
    '@nuxtjs/html-validator',
    '@nuxt/eslint',
    // '@nuxt/fonts',
    '@vueuse/nuxt',
    'nuxt-svgo',
    '@nuxtjs/leaflet',
  ],

  imports: { dirs: ['types', 'utils'] },

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Geo Distance Calculator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        {
          name: 'description',
          content:
            'Application to calculate distances between geographical points',
        },
      ],
    },
  },

  css:
    process.env.NODE_ENV === 'development'
      ? ['~/assets/styles/main.scss', '~/assets/styles/dev.scss']
      : ['~/assets/styles/main.scss'],

  compatibilityDate: '2025-05-15',

  typescript: { typeCheck: true, strict: true },

  eslint: { config: { stylistic: true } },

  svgo: { defaultImport: 'component' },
})
