import { defineStore } from 'pinia'
import { Ref } from 'vue'
import type { Product, Basket } from "~~/src/types"
import { BasketQuery } from "~~/src/queries"
export default defineStore('BasketStore', () => {

	// i18n
	const { locale } = useI18n()

	// data fetching
	const { fetch } = useSanity()
	const { data, pending, refresh } = useAsyncData(
		`Basket - ${locale.value}`,
		(): Promise<Basket> => fetch(BasketQuery, { lang: locale.value })
	)


	// state
	const showModal: Ref<boolean> = ref(false)	// show basket modal
	const showResponse: Ref<boolean> = ref(false) // show response msg from checkout form
	const products: Ref<Product[]> = ref([])

	// computed
	const totalPrice = computed(() => {
		let total = 0
		products.value.map(product => total += product.price * product.count)
		return total
	})
	const basketModalData = computed(() => data.value?.basket || null)
	const orderFormData = computed(() => data.value?.form || null)


	// actions
	function toggleModal() {
		showModal.value = !showModal.value
	}
	function toggleResponse() {
		showResponse.value = !showResponse.value
	}
	function addProduct(product: Product) {
		// check if product is in basket with same color
		if (products.value.some(p => p.name === product.name && p.color === product.color)) {
			// update counter
			products.value.forEach(p => {
				if (p.name === product.name && p.color === product.color)
					p.count += product.count
			})
		}
		else
			products.value.push(product)

		showModal.value = true
	}
	function removeProduct(product: Product) {
		const index = products.value.indexOf(product);
		if (index > -1) {
			products.value.splice(index, 1);
		}
	}
	function resetStore() {
		products.value = []
	}
	function refreshBasket() {
		refresh()
	}

	return {
		//data
		pending,
		refreshBasket,
		basketModalData,
		orderFormData,
		// state
		showModal,
		showResponse,
		products,
		//computed
		totalPrice,
		// actions
		toggleModal,
		toggleResponse,
		addProduct,
		removeProduct,
		resetStore,
	}
})
