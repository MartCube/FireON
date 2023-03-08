import { defineStore } from 'pinia'
import type { App } from "~~/src/types"
import { AppQuery } from "~~/src/queries"

export default defineStore('AppStore', () => {

	// data fetching
	const { locale } = useI18n()
	const { fetch } = useSanity()
	const { data, pending, refresh } = useAsyncData<App>(
		`App - ${locale}`,
		() => fetch(AppQuery, { lang: locale.value })
	)

	// data getters
	const logo = computed(() => data.value?.logo || null)
	const links = computed(() => data.value?.links || null)
	const smedias = computed(() => data.value?.smedias || null)
	const content = computed(() => data.value?.content || null)
	const metaTags = computed(() => data.value?.metaTags || null)



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
		metaTags,
	}
})
