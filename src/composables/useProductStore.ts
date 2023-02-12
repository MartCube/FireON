import { defineStore } from 'pinia'
import { MagazineQuery } from "~~/src/queries"
import type { Magazine, Product, Color } from "~~/src/types"

export default defineStore('ProductStore', () => {



	const { locale } = useI18n()
	const { params } = useRoute()
	const { fetch } = useSanity()

	const { data, pending, refresh } = useAsyncData(
		`Product-Magazine-${params.product}`,
		(): Promise<Magazine> => fetch(MagazineQuery, { uid: params.product, lang: locale.value })
	)

	// getters
	const pageData = computed(() => {
		return {
			svg: data.value!.svg,
			info: data.value!.info,
			price: data.value!.button,
			description: data.value!.description,
			button: data.value!.button,
		}
	})
	const gallery = computed(() => data.value?.gallery || null)
	const colors = computed(() => data.value?.colors || null)

	const productCount = ref(1)
	const productColor = ref(data.value!.colors.list[0])

	// const newProduct: Product = {
	// 	name: data.value!.name,
	// 	image: data.value!.gallery[0],
	// 	price: data.value!.price,
	// 	color: data.value!.colors.list[0],
	// 	count: 1,
	// }

	function refreshProduct() {
		refresh()
	}
	function updateCount(value: number) {
		productCount.value = value
	}
	function updateColor(value: Color) {
		productColor.value = value
	}


	return {
		// data fetching
		data,
		pending,
		refresh,
		// data getters
		pageData,
		gallery,
		colors,
		// actions
		updateCount,
		updateColor,
	}
})
