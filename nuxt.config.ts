// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-01",

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/mdc'],

  css: ["~/assets/css/main.css"],

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    ai: true,
    cache: true,
    workers: true,
  },

  // https://devtools.nuxt.com
  devtools: { enabled: true },
});
