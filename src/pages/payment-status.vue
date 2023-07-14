<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import useCreateNP_TTN from '../composables/useCreateNP_TTN'
import { UserData } from '../types'
import createCRMtask from '../composables/createCRMtask'

const statusMessage = ref('')
const invoiceId = ref('')
const icon = ref('')
const config = useRuntimeConfig();
const orderNumber = ref('')
// const ttn = ref({})


const error = (text: string) => {
	statusMessage.value = text
	icon.value = 'IconFailure'

}

try {
	// checking if window object is loaded and client side is available
	// needed for localStorage and crypto 
	if (process.client) {
		
		invoiceId.value = localStorage.getItem('invoice') as string
		const userData: UserData = JSON.parse(localStorage.getItem('user_data') as string)

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
			const statusResponce = parsedResponse.status

			switch (statusResponce) {
				case "success":
					
					// status message
					statusMessage.value = `
					Дякуємо! 
					Номер вашого замовлення: 
					`
					// order number 
					orderNumber.value = crypto.randomUUID().slice(0, 6)
					
					// icon status
					icon.value = 'IconSuccess'

					// create ttn
					const { endResponse } = await reactive(useCreateNP_TTN())
					// const data = toRefs(endResponse)
					console.log("responseTTN", await endResponse);
					
					// send data to crm
					// const createCRMtaskResponse = createCRMtask(orderNumber.value);
					// console.log("createCRMtaskResponse", createCRMtaskResponse);
					
					// send form with products sendgrid
					const emailToFireOn = await useEmailTemplate(orderNumber.value)
					console.log("emailToFireOn", emailToFireOn);
					// const { response: emailResponse, error: emailError, data: emailData } = await useFetch(`${config.public.domain}.netlify/functions/chekout`, emailToFireOn)
					

					// clean localStorage or maybe for future we can store everything like 
					// city , warehouse, user data, etc to not fetch it 
					// but for now we cleaning after ourself

					break
					
					case "failure":
						
						 error(parsedResponse.failureReason)
						break

					default:
						break;
			}
		}
	}

} catch (error) {
	console.log(error)
}



</script>

<template>
	<div class="response-page">
		<ClientOnly>
			<h3>{{ statusMessage }}</h3> 
			<h2>{{ orderNumber }}</h2> 
			<Icon class="success" :name="icon" />
			<AppBtn value="Go home" />
		</ClientOnly>
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
		text-align: center;
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