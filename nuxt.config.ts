// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  components: {
    global: true,
    dirs: ['~/components']
  },
  css: [
    '~/assets/css/global.css'
  ],
  app: {
    head: {
      script: [
      {
        src: 'https://cdn.rawgit.com/bungfrangki/efeksalju/2a7805c7/efek-salju.js',
        tagPosition: "bodyOpen"
      },
      {
        src: 'https://cdn.rawgit.com/bungfrangki/efeksalju/2a7805c7/efek-salju-2.js',
        tagPosition: "bodyOpen"
      },
    ]
    }
  }
})