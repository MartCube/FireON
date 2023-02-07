import { defineNuxtConfig } from 'nuxt/config'


export default defineNuxtConfig({

	srcDir: 'src',

	css: ["@/assets/css/app.scss"],

	typescript: { strict: true, typeCheck: true, shim: false },

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
		// '@nuxtjs/i18n',
		// '~/modules/purge-comments'
		// '~/modules/style-inlining',
		'nuxt-icon',
	],

	icon: {
		size: '24px',
		class: 'icon',
	},

	sanity: {
		projectId: process.env.SANITY_ID,
		dataset: process.env.SANITY_DATASET,
		minimal: true,
		apiVersion: '2022-10-21'
	},

	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml']
		}
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/css/colors.scss";',
				},
			},
		},
	},

})