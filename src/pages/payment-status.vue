<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import useCreateNP_TTN from '../composables/useCreateNP_TTN'
import { UserData } from '../types'

const statusMessage = ref('')
const statusResponce = ref('')
const invoiceId = ref('')
const userData = ref<UserData>()
const icon = ref('')
const config = useRuntimeConfig();
const orderNumber = ref('')
try {
	
	
	if (process.client) {
		
		orderNumber.value = crypto.randomUUID().slice(0, 6)
		invoiceId.value = localStorage.getItem('invoice') as string
		userData.value = JSON.parse(localStorage.getItem('user_data') as string) as UserData

		// console.log(userData.value, invoiceId.value);

		const headers = {
			method: 'GET',
			headers: {
				'X-Token': config.mono
			},
		};
		// monobank create invoice
		const { data, isFinished } = await useFetch(`${config.public.monoEnpoint}status?invoiceId=${invoiceId.value}`, headers)
		if(isFinished.value) {

			const parsedResponse = JSON.parse(data.value as string)
			statusResponce.value = parsedResponse.status
			// console.log(parsedResponse, )
			switch (statusResponce.value) {
				case "success":
					
					statusMessage.value = `
					Дякуємо! 
					Номер вашого замовлення: 
					`

					icon.value = 'IconSuccess'

						// send form with products sendgrid
					const emailToFireOn = useEmailTemplate(orderNumber.value)
					const { response: emailResponse, error: emailError, data: emailData } = await useFetch('http://localhost:8888/.netlify/functions/chekout', emailToFireOn)

					// console.log(emailData, emailError, emailResponse);

					// create ttn
					useCreateNP_TTN()

					// console.log(emailResponse, createTTN);
					
					break
			
				case "failure":

				statusMessage.value = parsedResponse.failureReason
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