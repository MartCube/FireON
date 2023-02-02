<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import type { CheckoutForm } from "~~/src/types";

let data: CheckoutForm = {
	title: "Доставка",
	button: "замовити",
	city: {
		name: "city",
		label: "Мiсто",
		placeholder: "Киiв",
	},
	name: {
		name: "name",
		label: "Одержувач (ПІБ повністю)",
		placeholder: "Iван Iваненко Iванович",
	},
	phone: {
		name: "phone",
		label: "Телефон",
		placeholder: "+380",
	},
	comment: {
		name: "comment",
		label: "Коментар",
		placeholder: "Коментар",
	},
}

const showMsg = ref(false) // toggle msg
const form = ref<HTMLFormElement | null>(null) // form ref
const validationSchema = toFormValidator(
	z.object({
		city: z.string().min(1, 'Required'),
		name: z.string().min(1, 'Required'),
		phone: z.string().min(1, 'Required'),
		message: z.string(),
	})
)

const { handleSubmit, isSubmitting, } = useForm<CheckoutForm>({ validationSchema })
const onSubmit = handleSubmit(async (values, actions) => {
	console.log('sending data', values)
	// emailjs or something else
	showMsg.value = true
	actions.resetForm()
})
</script>

<template>
	<form ref="form" id="form" @submit="onSubmit" autocomplete="off">
		<h3>{{ data.title }}</h3>
		<VeeInput :data="data.city" />
		<VeeInput :data="data.name" />
		<VeeInput :data="data.phone" />
		<VeeInput :data="data.comment" />
		<button type="submit" :disabled="isSubmitting">
			<span>{{ data.button }}</span>
		</button>

		<div v-if="showMsg" class="msg">
			<h2>замовлення оформлене!</h2> <!-- i18n -->
			<Icon class="success" name="SvgSuccess" />
			<AppBtn @click="showMsg = false" value="у головну" />
		</div>
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
		margin-top: 2rem;
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

	.msg {
		z-index: 2;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: $dark;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.success {
			width: 250px;
			height: 250px;

		}

		h2 {
			text-align: center;
			margin-bottom: 1rem;

			font-size: 2rem;
			line-height: 2rem;
		}

	}

}
</style>