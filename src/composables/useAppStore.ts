import { defineStore } from 'pinia'
import type { App } from "~~/src/types"
import { AppQuery } from "~~/src/queries"

export default defineStore('AppStore', () => {

	// i18n
	const { locale } = useI18n()

	// data fetching
	const { fetch } = useSanity()
	const { data, pending, refresh } = useAsyncData(
		`App - ${locale.value}`,
		(): Promise<App> => fetch(AppQuery, { lang: locale.value })
	)

	// data getters
	const logo = computed(() => data.value?.logo || null)
	const links = computed(() => data.value?.links || null)
	const smedias = computed(() => data.value?.smedias || null)
	const content = computed(() => data.value?.content || null)
	// meta tags
	if (data.value) useMetaTags(data.value.metaTags)


	function refreshApp() {
		refresh()
	}

	watch(locale, async (newLocale) => {
		if (newLocale) {
			const { refreshBasket } = useBasketStore()
			refreshApp()
			refreshBasket()
		}
	})

	return {
		// data fetching
		pending,
		refreshApp,
		// data getters
		logo,
		links,
		smedias,
		content,
	}
})
