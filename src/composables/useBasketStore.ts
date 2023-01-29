import { defineStore } from 'pinia'
import { Ref } from 'vue'
import type { Product } from "~~/src/types"

export default defineStore('BasketStore', () => {

	// state
	const showModal: Ref<boolean> = ref(false)
	const products: Ref<Product[]> = ref([])

	// computed
	const totalPrice = computed(() => {
		let total = 0
		products.value.map(product => total += product.price * product.count)
		return total
	})

	// actions
	function toggleModal() {
		showModal.value = !showModal.value
	}
	function addProduct(product: Product) {

		// check if product is in basket
		if (products.value.some(p => p.name === product.name)) {
			// update counter
			products.value.forEach(p => {
				if (p.name === product.name)
					p.count += product.count
			})
		}
		else
			products.value.push(product)
	}
	function deleteProduct(product: Product) {
		// find product by name and color
		// delete product from array
	}


	return {
		showModal,
		products,
		totalPrice,

		toggleModal,
		addProduct,
		deleteProduct,
	}
})
