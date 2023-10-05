// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: { url: "https://drbrunobarbosa.com.br" },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxtjs/robots",
    "nuxt-simple-sitemap",
    "nuxt-link-checker",
    "nuxt-og-image",
    "@nuxt/image",
  ],
});
