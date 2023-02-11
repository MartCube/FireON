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
		}
	},

	sanity: {
		projectId: process.env.SANITY_ID,
		dataset: process.env.SANITY_DATASET,
		minimal: true,
		apiVersion: '2023-01-01'
	},

	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml']
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
})