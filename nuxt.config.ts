// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.API_BASE_URL || 'https://api.muszakivizsgaztatas.hu',
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/app.css'],
  ssr: true,

  app: {
    head: {
      title: 'Autó vizsgáztatás - Autó vizsgáztatás Budapesten',
      htmlAttrs: {
        lang: 'hu',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Ne maradjon le a gyors és kényelmes autó vizsgáztatásról Budapesten! Több száz elégedett ügyféllel és profi csapatunkkal garantáljuk a zökkenőmentes ügyintézést. Foglaljon időpontot még ma!',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        {
          'http-equiv': 'Content-Security-Policy',
          content: `
            default-src 'self' https: data:;
            img-src 'self' https: http: data:;
            font-src 'self' https: data:;
            style-src 'self' https: 'unsafe-inline';
            script-src 'self' https: 'unsafe-inline' 'unsafe-eval';
          `,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.alkuszom.info' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/sitemap',
    [
      'nuxt-mail',
      {
        message: {
          to: 'szerviz@auto-vizsgaztatas.hu',
        },
        smtp: {
          host: 's57.tarhely.com',
          port: 587,
          auth: {
            user: 'szerviz@auto-vizsgaztatas.hu',
            pass: 'Hacker13prog',
          },
        },
      },
    ],
  ],

  site: {
    url: 'https://www.auto-vizsgaztatas.hu',
    trailingSlash: true,
  },

  sitemap: {
    sources: ['/api/sitemap'],
    // defaults: { priority: 0.7 },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },

  compatibilityDate: '2024-12-10',
})
