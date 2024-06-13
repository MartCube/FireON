<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import type { CheckoutForm, City, UserData, Warehouse, ttnDataType } from "~~/src/types";
import { storeToRefs } from 'pinia'
import { promiseTimeout, useFetch, useTimeout } from '@vueuse/core'
// import useCreateNP_TTN from '../composables/useCreateNP_TTN'
// 4441 1144 3585 8681
const config = useRuntimeConfig()
const { t } = useI18n()

const { orderFormData: data, pending } = storeToRefs(useBasketStore())

const promoCodes = [
	{
		code: 'fireOn-20',
		discount: 20,
	},
	{
		code: 'fireOn-10',
		discount: 10,
	}
]
const validationSchema = toFormValidator(
	z.object({
		// city: z.object({
    //   Ref: z.string().min(1, "City Ref is required"),
    //   // Add other validations for other properties of the City type if needed
    // }) as unknown as z.ZodType<City>,
		// 	place: z.any().refine(async (val: any) => {
		// 	const data = await val;
		// 	console.log(data);
			
			
		// 	return val
		// }),

		// city: z.any().refine(async (val: any) => {
		// 	console.log(await val.value);
			
		// 	return val
		// }),
		// warehouse: z.any().refine(async (val: any) => {
		// 	console.log(await val);
			
		// 	return val
		// }),
		email: z.string().min(1, { message: "Required" }).email("This is not a valid email."),
		place: z.string().min(1, 'Required'),
		warehouse: z.string().min(1, 'Required'),
		firstname: z.string().min(1, 'Required'),
		middlename: z.string().optional(),
		lastname: z.string().min(1, 'Required'),
		phone: z.string().min(10, 'Required')
      .refine((val) => {
				return /^\d{1,12}$/.test(String(val))
			}, {
        message: "Only numbers please",
      }),
		
		// phone: z.number().refine((val) => val.toString().length === 12, {
		// 	message: "Must have 12 digits"
		// }),
		comment: z.string().optional(),
		callme: z.boolean().optional(),
		iban: z.boolean().optional(),
		payment: z.boolean().optional(),
		// promoCode: z.union([z.string().refine((val) => {
    //   return promoCodes.some(el => el.code === val)
    // }, { message: "Invalid promotion code" }).optional(), z.literal("")]),
	})
)

// const city = ref<City>()
// const warehouse = ref<Warehouse>()
const statusMessage = ref('')
const externalURL = ref('')

const { handleSubmit, isSubmitting } = useForm<CheckoutForm>({ validationSchema })

// send form
const onSubmit = handleSubmit(async (values, { resetForm }) => {

	console.log(values.callme);
	
	// const { resetStore, toggleResponse, toggleModal } = useBasketStore()
	const { products } = storeToRefs(useBasketStore())
	// toggleModal()	// close basket modal

		// order number 
		// const errorMessage = async (text: string) => {
		// 	statusMessage.value = text
		// 	await promiseTimeout(4000)
		// 	statusMessage.value = ''
		// 	resetForm() 
		// }
		
		// create data for localStore
		const UserData: UserData = {
			firstname: values.firstname.toString(),
			lastname: values.lastname.toString(),
			email: values.email.toString(),
			place: values.place.toString(),
			// place: city.value as City,
			warehouse: values.warehouse.toString(),
			phone: values.phone.toString(),
			products: products.value,
			middlename:  values.middlename ? values.middlename.toString() : '',
			comment: values.comment ? values.comment.toString() : '',
			callme: values.callme as unknown as boolean,
			iban: values.iban as unknown as boolean,
			payment: values.payment as unknown as boolean
		}
		
	// save email data to localStorage
	localStorage.setItem('user_data', JSON.stringify(UserData))
	// create ttn
	// const {endResponse, error} = await useCreateNP_TTN()
	
	// 	if(endResponse instanceof Error || endResponse instanceof TypeError) {
		// 		errorMessage(String("Щось пішло не так будь ласка спробуйте ще раз"))
		// 		return
		// 	} else {
			// 		const parsedResponce: ttnDataType  = JSON.parse(endResponse as string)
			// 		console.log('parsedResponce.success', parsedResponce.success , 'parsedResponce.success === false', parsedResponce.success === false, '!!parsedResponce.success',!!parsedResponce.success);
			
			// 		if(parsedResponce.success === false) {
				// 			errorMessage(parsedResponce.errors.join(","))
				// 			return
				// 		} 
				// 	}
				
				
				try {
					// const paymentRequestOptions = usePaymentOptions(products.value);
					// const { data, isFinished, error } = await useFetch(`${config.public.monoEnpoint}create`, paymentRequestOptions as object)
					// if (isFinished.value) {
					// 	const parsedValue: {
					// 		invoiceId: string,
					// 		pageUrl: string
					// 	} = JSON.parse(data.value as string)
						// console.log(parsedValue)
						
						// store invoice data
						// localStorage.setItem('invoice', parsedValue.invoiceId)
						
						const orderNumber = crypto.randomUUID().slice(0, 6);
						localStorage.setItem('orderNumber', orderNumber);

						// redirect user to monobank payment page
						
						// window.location.href = parsedValue.pageUrl;
						// UserData.orderNumber = orderNumber;
						// UserData.invoiceId = parsedValue.invoiceId;
						// UserData.type = 'user';

						// const { data: serverData, error } = await useFetch('/api/payment', {
						// 	method: 'POST',
						// 	body: JSON.stringify(UserData),
						// 	headers: {
						// 		'Content-Type': 'application/json'
						// 	}
						// });

						// const anchor = document.createElement('a');
						// anchor.href = parsedValue.pageUrl;
						// anchor.target = "_blank";
						// document.body.appendChild(anchor);
						// anchor.click();
		// }

		// show result modal 
		// there is no result modal anymore we redierect user to payment-status page
		// toggleResponse(response.value?.status)
	} catch (error) {
		console.log(error)
	}

	// show response msg
	// resetStore()	// clear all products
	// resetForm() // clear form data
})
</script>

<template>
	<form id="form" @submit="onSubmit" autocomplete="off">
		<!-- <button @click="externalURL">Redirect to External Link</button> -->
		<div v-if="statusMessage !== ''" class="error-message">{{ statusMessage }}</div>
		<template v-if="data && !pending">
			<h3>{{ data.title }}</h3>
			<VeeInput :data="data.firstname" />
			<VeeInput :data="data.lastname" />
			<VeeInput :data="data.middlename" />
			<VeeInput :data="data.email" />
			<VeeInput :data="data.phone" />
			<VeeInput :data="data.place" />
			<VeeInput :data="data.warehouse" />
			<!-- <NPCityInput @selected-city="(e) => city = e" :data="data.place" /> -->
			<!-- <NPWarehouseInput v-if="city" :city="city" @selected-warehouse="(e) => warehouse = e"  :data="data.warehouse"  /> -->
			<VeeInput :data="data.comment" />
			<!-- <VeeInput :data="data.promoCode" /> -->
			<VeeCheckbox :data="{name:'callme', label:t('callme') , value: false}" />
			<VeeCheckbox :data="{name:'iban', label:t('iban') , value: false}" />
			<VeeCheckbox :data="{name:'payment', label:t('payment') , value: false}" />
			<button type="submit" :disabled="isSubmitting">
				<span>{{ data.button }}</span>
			</button>
		</template>
	</form>
</template>

<style lang="scss" scoped>
form {
	width: 100%;
	@media (min-width: 800px) {
		max-width: 460px;
	}
	display: flex;
	flex-direction: column;
	position: relative;
	.link {
		display: none;
	}
	.error-message {
		position: absolute;
		background-color: $dark;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $error;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

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