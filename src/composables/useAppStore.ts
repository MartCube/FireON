import { defineStore } from 'pinia'
import type { App } from "~~/src/types"
import { AppQuery } from "~~/src/queries"
import { useI18n } from 'vue-i18n'
export default defineStore('AppStore', () => {

	// i18n
	const { locale } = useI18n()


	// data fetching
	const { fetch } = useSanity()
	const { data } = useAsyncData(`App`, (): Promise<App> => fetch(AppQuery))

	// getters
	const logo = computed(() => data.value?.logo || null)
	const links = computed(() => data.value?.links || null)
	const smedias = computed(() => data.value?.smedias || null)
	const content = computed(() => data.value?.content || null)
	if (data.value) useMetaTags(data.value.metaTags)


	return {
		// data getters
		logo,
		links,
		smedias,
		content,
	}
})
