<script setup lang="ts">
import { useFetch } from '@vueuse/core'

const statusMessage = ref('')
const invoiceId = ref('')
const config = useRuntimeConfig();
const orderNumber = crypto.randomUUID()
try {


	if (process.client) {

		invoiceId.value = localStorage.getItem('invoice') as string
		console.log(invoiceId.value);

		const headers = {
			method: 'GET',
			headers: {
				'X-Token': config.mono
			},
		};
		// monobank create invoice
		const { data, isFinished } = await useFetch(`https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId.value}`, headers)
		if(isFinished.value) {
			const parsedValue = JSON.parse(data.value as string)
			console.log(parsedValue, )
			switch (parsedValue.status) {
				case "success":
					
					statusMessage.value = `
					Слава Україні!
					Дякуємо за замовлення!
					Номер вашого замовлення ${crypto.randomUUID()}
					`

						// send form with products sendgrid
					const email = useEmailTemplate(orderNumber)
					const {  response, } = await useFetch('http://localhost:8888/.netlify/functions/chekout', email)
					console.log(response);
					
					break;
			
				default:
					break;
			}
		}
	}

		// show result modal
		// toggleResponse(response.value?.status)
	} catch (error) {
		console.log(error)
	}
</script>

<template>
	<div class="response-page">

		<h2>{{ statusMessage }}</h2> <!-- i18n -->
		<Icon class="success" name="IconSuccess" />
		<AppBtn value="Go home" />
	</div>
</template>

<style lang="scss" scoped>
.response-page {
	width: 100%;
	height: calc(100vh - 272px);
	padding: 2.6rem;
	border: 1px solid $white10;
	background: $dark;

	display: flex;
	flex-direction: column;
	// justify-content: center;
	align-items: center;

	h2 {
		width: 60%;
		margin-bottom: 1rem;

		text-align: center;
		text-transform: uppercase;
		font-size: 28px;
		line-height: 34px;
	}

	.success {
		margin: 2rem 0;
		width: 250px;
		height: 250px;
	}

	.AppBtn {
		width: 100%;
		max-width: 300px;
	}
}

@media (max-width: 800px) {
	.response-page {
		width: 100%;
	}
}
</style>