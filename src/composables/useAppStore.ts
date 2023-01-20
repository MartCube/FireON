import { defineStore } from 'pinia'
import type { App } from "~/assets/types"
import { AppQuery } from "~/assets/queries"

export default defineStore('AppStore', () => {

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
		logo,
		links,
		smedias,
		content,
	}
})
