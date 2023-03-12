<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import type { CheckoutForm } from "~~/src/types";
import { storeToRefs } from 'pinia'
import { promiseTimeout, useFetch } from '@vueuse/core'
import emailjs from '@emailjs/browser';

const { orderFormData: data, pending } = storeToRefs(useBasketStore())


const validationSchema = toFormValidator(
	z.object({
		place: z.string().min(1, 'Required'),
		name: z.string().min(1, 'Required'),
		phone: z.string().min(1, 'Required'),
		// comment: z.string().min(1, 'Required'),
	})
)

const { handleSubmit, isSubmitting, } = useForm<CheckoutForm>({ validationSchema })
const onSubmit = handleSubmit(async (values, { resetForm }) => {
	const { resetStore, toggleResponse, toggleModal } = useBasketStore()
	const { products } = storeToRefs(useBasketStore())

	toggleModal()	// close basket modal

	// const emailData = {
	// 	name: values.name,
	// 	place: values.place,
	// 	phone: values.phone,
	// 	comment: values.comment,
	// 	products: products.value
	// }

	// prepare product html
	let productsTemplate: any
	if(products.value) {
		productsTemplate = products.value.map( el => 
			`<div class="item">
				<p><strong>Name:</stong> ${el.name}</p>
				<p><strong>Image:</stong> <img src="https://cdn.sanity.io/images/okruw9dl/production/${el.image.slice(6, el.image.length - 4)}.png?h=100&w=250" ></p>
				<p><strong>Count:</stong> ${el.count}</p>
				<p><strong>Color: </stong> ${el.color}</p>
				<p><strong>Price: </stong> ${el.price}</p>
			</div>`
		).join()
	}
console.log(productsTemplate);

	// compose email template
	const emailTemplate = `
		<h4>Name: </h4><p>${values.name}</p>
		<h4>Place: </h4><p>${values.place}</p>
		<h4>Phone: </h4><p>${values.phone}</p>
		<h4>Comment: </h4><p>${values.comment}</p>
		<h4>Products</h4>
		<div class="products">${productsTemplate}</div>
	`
	
	const requestOptions = {
		method: 'POST',
		headers: {},
		body: await emailTemplate,
	};

	// trigger netlify function
	try {
		const { json, response, statusCode, error, text, data } = await useFetch('https://fireon.com.ua/.netlify/functions/chekout', requestOptions)
		// console.log('json: ', json, 'response: ', response.value,'statusCode: ', statusCode.value,'error: ', error.value,'text: ', text, 'data: ', data.value )
		// console.log('submited')
		toggleResponse(response.value?.status)
	} catch (error) {
		console.log(error)
	}

	// emailjs.send('service_s85kwin', 'template_checkoutForm', emailData, 'VQEgDD8AG-LcDAAuS')
	// 	.then(
	// 		(result) => {
	// 			console.log('SUCCESS!', result.text)
	// 		},
	// 		(error) => {
	// 			console.log('ERROR...', error.text)
	// 		},
	// 	)

	// await promiseTimeout(350)	// simulate data sending
		// show response msg
	resetStore()	// clear all products
	resetForm()		// clear form data
})
</script>

<template>
	<form id="form" @submit="onSubmit" autocomplete="off">
		<template v-if="data && !pending">
			<h3>{{ data.title }}</h3>
			<VeeInput :data="data.place" />
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