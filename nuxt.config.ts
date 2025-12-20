export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['nitro-cloudflare-dev', '@nuxt/eslint', '@nuxt/ui', '@nuxtjs/mdc'],

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },

    typescript: {
      tsConfig: {
        include: ['../emv.d.ts'],
      },
    },

    storage: {
      cache: {
        driver: 'cloudflare-kv-binding',
        binding: 'CACHE',
      },
    },
  },
});
