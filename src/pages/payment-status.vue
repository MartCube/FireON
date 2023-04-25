<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import useCreateNP_TTN from '../composables/useCreateNP_TTN'
import { EmailData } from '../types'
import { Ref } from 'vue'

const statusMessage = ref('')
const statusResponce = ref('')
const invoiceId = ref('')
const userData = ref<EmailData>({
	firstname: '',
	lastname: '',
	middlename: '',
	email: '',
	place: '',
	warehouse: '',
	phone: '',
	comment: '',
	products: []
})
const icon = ref('')
const config = useRuntimeConfig();
const orderNumber = ref('')
try {
	
	
	if (process.client) {
		
		orderNumber.value = crypto.randomUUID().slice(0, 6)
		invoiceId.value = localStorage.getItem('invoice') as string
		userData.value = JSON.parse(localStorage.getItem('user_checkout') as string) as EmailData

		console.log(userData.value, invoiceId.value);

		const headers = {
			method: 'GET',
			headers: {
				'X-Token': config.mono
			},
		};
		// monobank create invoice
		const { data, isFinished } = await useFetch(`${config.public.monoEnpoint}status?invoiceId=${invoiceId.value}`, headers)
		if(isFinished.value) {
			const parsedValue = JSON.parse(data.value as string)
			statusResponce.value = parsedValue.status
			// console.log(parsedValue, )
			switch (statusResponce.value) {
				case "success":
					
					statusMessage.value = `
					Дякуємо! 
					Номер вашого замовлення: 
					`

					icon.value = 'IconSuccess'

						// send form with products sendgrid
					const email = useEmailTemplate(orderNumber.value)
					const {  response, } = await useFetch('http://localhost:8888/.netlify/functions/chekout', email)

					const createTTN = useCreateNP_TTN();
					console.log(response, createTTN);
					
					break
			
				case "failure":

				statusMessage.value = parsedValue.failureReason
				icon.value = 'IconFailure'

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

		<h3>{{ statusMessage }}</h3> <!-- i18n -->
		<h2 v-if="statusResponce === 'success'">{{ orderNumber }}</h2> 
		<Icon class="success" :name="icon" />
		<AppBtn value="Go home" />
	</div>
</template>

<style lang="scss" scoped>
.response-page {
	width: 100%;
	height: calc(100vh - 128px);
	padding: 2.6rem;
	border: 1px solid $white10;
	background: $dark;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h3 {
		margin-bottom: 1rem;
	}
	h2 {
		width: 60%;
		// margin-bottom: 1rem;

		text-align: center;
		text-transform: uppercase;
		font-size: 32px;
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