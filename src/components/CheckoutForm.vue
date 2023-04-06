<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { object, z } from 'zod';
import type { CheckoutForm, City, Warehouse } from "~~/src/types";
import { storeToRefs } from 'pinia'
import { useFetch } from '@vueuse/core'


const config = useRuntimeConfig()

const { orderFormData: data, pending } = storeToRefs(useBasketStore())

const validationSchema = toFormValidator(
	z.object({
		// place: z.string().min(1, 'Required'),
		name: z.string().min(1, 'Required'),
		phone: z.number().int().min(1, 'Required'),
		comment: z.string(),
	})
)

const city = ref<City>()
const warehouse = ref<Warehouse>()

const { handleSubmit, isSubmitting, } = useForm<CheckoutForm>({ validationSchema })
const onSubmit = handleSubmit(async (values, { resetForm }) => {
	const { resetStore, toggleResponse, toggleModal } = useBasketStore()
	const { products } = storeToRefs(useBasketStore())

	toggleModal()	// close basket modal


	// store data in localhost
	const emailData = {
		name: values.name,
		// place: values.place,
		phone: values.phone,
		comment: values.comment,
		products: products.value
	}
	if(window.process) {
		localStorage.setItem('user_checkout', JSON.stringify(emailData))
	}


	
	//paymnet monobank
	let paymentBillBasketTotalPrice = 0;
	products.value.map(el => paymentBillBasketTotalPrice += el.price)

	let paymentBillBasketData = products.value.map( el => {
		return {
					"name": el.name,
					"qty": 1,
					"sum": el.price,
					"icon": `https://cdn.sanity.io/images/okruw9dl/production/${el.image.slice(6, el.image.length - 4)}.png?h=100&w=250`,
					"unit": "шт.",
					"code": crypto.randomUUID(),
					"header": el.name,
					"footer": "Футер",
					"tax": [
						0
					],
				}
	})

	const paymentData = {
		"amount": paymentBillBasketTotalPrice,
		"ccy": 980,
		"merchantPaymInfo": {
			"reference": crypto.randomUUID(),
			"destination": "Магазин FireOn",
			"basketOrder": paymentBillBasketData
		},
		"redirectUrl": "http://localhost:8888/payment-status",
		// "webHookUrl": "https://f1de-213-135-161-93.eu.ngrok.io/server/api/payment-response",
		"validity": 3600,
		"paymentType": "debit",
	}

	const paymentRequestOptions = {
		method: 'POST',
		headers: {
			'X-Token': config.public.mono
		},
		body: JSON.stringify(paymentData),
	};

	// monobank create invoice
	// async function createInvoice() {}
	//paymnet monobank
	
	
	try {
		
		const { data, isFinished, error } = await useFetch('https://api.monobank.ua/api/merchant/invoice/create', paymentRequestOptions as object)
		if(isFinished.value) {
			const parsedValue: {
				invoiceId: string,
				pageUrl: string
			} = JSON.parse(data.value as string)
			console.log(parsedValue)
			localStorage.setItem('invoice', parsedValue.invoiceId)
			window.open(parsedValue.pageUrl)
		}
		// show result modal
		// toggleResponse(response.value?.status)
	} catch (error) {
		console.log(error)
	}

		// show response msg
	resetStore()	// clear all products
	resetForm()		// clear form data
})
</script>

<template>
	<form id="form" @submit="onSubmit" autocomplete="off">
		<template v-if="data && !pending">
			<h3>{{ data.title }}</h3>
			<NPCityInput @selected-city="(e) => city = e" :name="data.place"/>
			<NPWarehouseInput v-if="city" :city="city" @selected-warehouse="(e) => warehouse = e"/>
			<VeeInput :data="data.name" />
			<VeeInput :data="data.phone" />
			<VeeInput :data="data.comment" />
			<button type="submit" :disabled="isSubmitting">
				<span>{{ data.button }}</span>
			</button>
		</template>
	</form>
</template>

<style lang="scss" scoped>
form {
	width: 100%;
	max-width: 460px;

	display: flex;
	flex-direction: column;
	position: relative;

	h3 {
		margin-bottom: 2rem;
	}

	button {
		align-self: center;
		width: 70%;
		height: 50px;
		margin: 2rem 0;
		transform: skew(-10deg);
		border: none;
		background: $primary;
		user-select: none;
		cursor: pointer;

		display: flex;
		justify-content: center;
		align-items: center;

		span {
			z-index: 2;
			transform: skew(10deg);

			text-transform: uppercase;
			color: $dark;
			font-weight: 400;
			font-size: 1rem;
			line-height: 27px;
		}

		&:hover {
			background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #D6AE21;
		}

		&:active {
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #D6AE21;
		}
	}
}
</style>