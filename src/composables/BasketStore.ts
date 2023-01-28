import { defineStore } from 'pinia'
import { Ref } from 'vue'
import type { Magazine } from "~~/src/types"

export default defineStore('AppStore', () => {

	// state
	const products: Ref<Magazine[] | null> = ref(null)
	const productNumber = products.value?.length


	// actions
	function addProduct(product: Magazine) {
		products.value?.push(product)
	}
	function deleteProduct(product: Magazine) {
		// find product by name and color
		// delete product from array
	}


	return {
		products,
		productNumber,

		addProduct,
		deleteProduct,
	}
})
