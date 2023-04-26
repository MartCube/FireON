<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { object, z } from 'zod';
import type { CheckoutForm, City, UserData, Warehouse } from "~~/src/types";
import { storeToRefs } from 'pinia'
import { useFetch } from '@vueuse/core'

// 4441 1144 3585 8681
const config = useRuntimeConfig()

const { orderFormData: data, pending } = storeToRefs(useBasketStore())

const validationSchema = toFormValidator(
	z.object({
		// place: z.string(),
		email: z.string().min(1, { message: "Required" }).email("This is not a valid email."),
		firstname: z.string().min(1, 'Required'),
		middlename: z.string().min(1, 'Required'),
		lastname: z.string().min(1, 'Required'),
		phone: z.number().int().min(1, 'Required'),
		comment: z.string(),
	})
)

const city = ref<City>()
const warehouse = ref<Warehouse>()


const { handleSubmit, isSubmitting, } = useForm<CheckoutForm>({ validationSchema })

// send form
const onSubmit = handleSubmit(async (values, { resetForm }) => {

	// const { resetStore, toggleResponse, toggleModal } = useBasketStore()
	const { products } = storeToRefs(useBasketStore())
	// toggleModal()	// close basket modal

	// create data for localStore
	const UserData: UserData = {
		firstname: values.firstname.toString(),
		lastname: values.lastname.toString(),
		middlename:  values.middlename.toString(),
		email: values.email.toString(),
		place: city.value as City,
		warehouse: warehouse.value as Warehouse,
		phone: values.phone.toString(),
		comment: values.comment.toString(),
		products: products.value
	}

	try {
		// save email data to localStorage
		localStorage.setItem('user_data', JSON.stringify(UserData))

		const paymentRequestOptions = usePaymentOptions(products.value);
		const { data, isFinished, error } = await useFetch(`${config.public.monoEnpoint}create`, paymentRequestOptions as object)
		if (isFinished.value) {
			const parsedValue: {
				invoiceId: string,
				pageUrl: string
			} = JSON.parse(data.value as string)
			// console.log(parsedValue)

			// store invoice data
			localStorage.setItem('invoice', parsedValue.invoiceId)

			// redirect user to monobank payment page
			window.open(parsedValue.pageUrl)
		}

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
		<template v-if="data && !pending">
			<h3>{{ data.title }}</h3>
			<NPCityInput @selected-city="(e) => city = e" :data="data.place" />
			<NPWarehouseInput v-if="city" :city="city" @selected-warehouse="(e) => warehouse = e"  :data="data.warehouse"  />
			<VeeInput :data="data.firstname" />
			<VeeInput :data="data.lastname" />
			<VeeInput :data="data.middlename" />
			<VeeInput :data="data.email" />
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
	@media (min-width: 800px) {
		max-width: 460px;
	}
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