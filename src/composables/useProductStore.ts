import { defineStore } from 'pinia'
import { MagazineQuery } from "~~/src/queries"
import type { Magazine, Product, Color } from "~~/src/types"


export default defineStore('ProductStore', () => {

	// fetch data
	const { locale } = useI18n()
	const { params } = useRoute()
	const { data, pending, refresh } = useSanityQuery<Magazine>(
		MagazineQuery, { uid: params.product, lang: locale.value }
	)


	// getters
	const pageData = computed(() => data.value?.pageData || null)
	const gallery = computed(() => data.value?.gallery || null)
	const colors = computed(() => data.value?.colors || null)



	const newProductColor = ref<Color>({
		name: 'Black',
		hexcode: '000000'
	})
	const newProductCount = ref(1)



	function dataRefresh() {
		refresh()
	}
	function addToBasket() {
		if (!data.value) return

		const newProduct: Product = {
			name: data.value.pageData.name,
			image: data.value.gallery[0],
			price: data.value.pageData.price,
			color: {
				name: newProductColor.value.name,
				hexcode: newProductColor.value.hexcode
			},
			count: newProductCount.value,
		}

		const { addProduct } = useBasketStore()
		addProduct(newProduct)

		// reset
		newProductColor.value = {
			name: 'Black',
			hexcode: '000000'
		}
		newProductCount.value = 1
	}



	return {
		// state
		pending,
		newProductColor,
		newProductCount,
		// data getters
		pageData,
		gallery,
		colors,
		// actions
		dataRefresh,
		addToBasket
	}
})
