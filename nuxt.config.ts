import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({

	srcDir: 'src',

	css: ["@/assets/css/app.scss"],

	typescript: {
		strict: true,
		typeCheck: false,
		shim: false
	},

	components: {
		"dirs": [
			{ "path": "~/components", "global": true },
		],
	},

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
		}
	},

	modules: [
		'@nuxtjs/sanity',
		'@pinia/nuxt',
		'@nuxtjs/i18n',
		'nuxt-icon',
		// '@nuxtjs/google-analytics',
		'nuxt-gtag',
		// '~/modules/purge-comments'
		// '~/modules/style-inlining',
	],

	i18n: {
		locales: [
			{
				code: 'ua',
				name: 'Ukrainian',
			},
			{
				code: 'en',
				name: 'English',
			}
		],
		defaultLocale: 'ua',
		strategy: 'prefix_except_default',
		// lazy: true,
		// langDir: 'locales/',
		vueI18n: {
			legacy: false,
			locale: 'ua',
			fallbackLocale: 'ua',
			availableLocales: ['ua', 'en',],
			messages: {
        en: {
          toHome: 'To Home',
					emailCopied: 'email copied'
        },
        ua: {
          toHome: 'На головну',
					emailCopied: 'адресу скопійовано'
        },
      }
		}
	},

	sanity: {
		projectId: 'okruw9dl',
		dataset: 'production',
		minimal: true,
		apiVersion: '2023-01-01'
	},

	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml']
		}
	},

	runtimeConfig: {
		public: {
			mono: process.env.NUXT_MONO, // can be overridden by NUXT_API_SECRET environment variable
			novaposhta: process.env.NUXT_NOVAPOSHTA,
			npEndpoint: 'https://api.novaposhta.ua/v2.0/json/',
			monoEnpoint: 'https://api.monobank.ua/api/merchant/invoice/',
			sendGrid: process.env.NUXT_SENDGRID_API_KEY,
			crmkey: process.env.NUXT_CRM,
			crmEndpoint: 'https://api.keepincrm.com/v1/',
			domain: process.env.NUXT_DOMAIN,
			gtagId: 'G-WN7B494RN5',
    }
  },

	vite: {
		logLevel: 'info',
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/css/colors.scss";',
				},
			},
		},
	},

	gtag: {
		id: 'G-WN7B494RN5',
	},
	// googleAnalytics: {
  //   id: 'GTM-K49KX72B'
  // }
})