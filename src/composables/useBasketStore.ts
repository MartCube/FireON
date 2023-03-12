import { defineStore } from 'pinia'
import type { Product, Basket } from "~~/src/types"
import { BasketQuery } from "~~/src/queries"

export default defineStore('BasketStore', () => {

	// data fetching
	const { locale } = useI18n()
	const { fetch } = useSanity()
	const { data, pending, refresh } = useAsyncData<Basket>(
		`Basket - ${locale}`,
		() => fetch(BasketQuery, { lang: locale.value })
	)

	// state
	const showModal = ref(false)	// show basket modal
	const showResponse = ref(false) // show response msg from checkout form
	const responsePayload = ref(null)
	const products = ref<Product[]>([])

	// computed
	const totalPrice = computed(() => {
		let total = 0
		products.value.map(product => total += product.price * product.count)
		return total
	})
	const basketModalData = computed(() => data.value?.basket || null)
	const orderFormData = computed(() => data.value?.form || null)
	const modalResponseData = computed(() => data.value?.response || null)


	// actions
	function toggleModal() {
		showModal.value = !showModal.value
	}
	function toggleResponse(payload: any) {
		responsePayload.value = payload
		console.log('payload', payload);
		
		showResponse.value = !showResponse.value
	}
	function addProduct(newProduct: Product) {
		// check if product exist
		const productIndex = products.value.findIndex(p => p.name == newProduct.name && p.color == newProduct.color)
		// update counter or push to products
		if (productIndex != -1) products.value[productIndex].count += newProduct.count
		else products.value.push(newProduct)
		// show updates
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
		responsePayload,
		modalResponseData,
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
