<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import createCRMtask from '../composables/createCRMtask'
import { CrmResponse, UserData } from '../types'


const statusMessage = ref('')
const invoiceId = ref('')
const icon = ref('')
const config = useRuntimeConfig();
const orderNumber = ref('')
const { locale, t } = useI18n()

const errorMessage = (text: string) => {
	statusMessage.value = text
	icon.value = 'IconFailure'
}

// const {localePath} = useI18n()
// console.log(localePath);


try {
	// checking if window object is loaded and client side is available
	// needed for localStorage and crypto 
	if (process.client) {

		
		
		invoiceId.value = localStorage.getItem('invoice') as string

		const headers = {
			method: 'GET',
			headers: {
				'X-Token': config.public.mono
			},
		};
		// monobank create invoice
		const { data, isFinished } = await useFetch(`${config.public.monoEnpoint}status?invoiceId=${invoiceId.value}`, headers)
		if(isFinished.value) {
			localStorage.setItem("invoiceData", data.value as string)
			const parsedResponse = JSON.parse(data.value as string)
			const statusResponce = parsedResponse.status

			switch (statusResponce) {
				case "success":
					
					// status message
					statusMessage.value = `
					Дякуємо! 
					Номер вашого замовлення: 
					`
					const rawdata = localStorage.getItem('user_data');

					const data: UserData = JSON.parse(rawdata as string);
					data.invoiceId = localStorage.getItem('invoice') as string || '';
					data.orderNumber = localStorage.getItem('orderNumber') as string || '';
					
					// icon status
					icon.value = 'IconSuccess'
					
					// // send form with products sendgrid
					const emailToFireOn = await useEmailTemplate()
					console.log("emailToFireOn", emailToFireOn);
					// const { response: emailResponse, error: emailError, data: emailData } = await useFetch(`${config.public.domain}.netlify/functions/chekout`, emailToFireOn)
					
					// send data to crm
					// const createCRMtaskResponse: CrmResponse = await createCRMtask(orderNumber.value) as CrmResponse;
					// console.log("createCRMtaskResponse", createCRMtaskResponse.data, createCRMtaskResponse.err , createCRMtaskResponse.res);
					// clean localStorage or maybe for future we can store everything like 
					// city , warehouse, user data, etc to not fetch it 
					// but for now we cleaning after ourself

					break
					
					case "failure":
						
						 errorMessage(parsedResponse.failureReason)
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
			<NuxtLink class="btn" :to="`/${locale === 'ua' ? '' : 'en'}`" >
				<span>
					{{ t('toHome') }}
				</span>
		</NuxtLink>
		</ClientOnly>
	</div>
</template>

<style lang="scss" scoped>
.btn {
	max-width: 200px;
	height: 50px;

	background: $primary;
	transform: skew(-10deg);
	cursor: pointer;
	user-select: none;

	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 80%;

	span {
		z-index: 2;
		transform: skew(10deg);

		text-transform: uppercase;
		color: $dark;
		font-weight: 400;
		font-size: .875rem;
		line-height: 1.5rem;
	}

	&:hover {
		background: $primary30;
	}

	&:active {
		background: $primary50;
	}

}
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