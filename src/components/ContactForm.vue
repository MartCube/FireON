<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import type { ContactForm } from "~~/src/types";
import { ColorWord } from "~~/src/types";

defineProps<{ data: ContactForm }>()

const showMsg = ref(false) // toggle msg
// const ContactFormRef = ref<HTMLFormElement | null>(null) // form ref
const validationSchema = toFormValidator(
	z.object({
		name: z.string().min(1, 'Required'),
		phone: z.string().min(1, 'Required'),
		message: z.string().min(1, 'Required').max(50),
	})
)

const { handleSubmit, isSubmitting, } = useForm<ContactForm>({ validationSchema })
const onSubmit = handleSubmit(async (values, { resetForm }) => {
	console.log('sending data', values)

	await $fetch('/', {
		method: 'POST',
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: values,
	})

	// emailjs or something else
	showMsg.value = true
	resetForm()
})
</script>

<template>
	<form id="form" @submit="onSubmit" autocomplete="off" method="POST" data-netlify="true">
		<TitleBlock :src="data.title" :mode="ColorWord.first" noline />
		<VeeInput :data="data.name" />
		<VeeInput :data="data.phone" />
		<VeeInput :data="data.message" />
		<button type="submit" :disabled="isSubmitting">
			<span>{{ data.button }}</span>
		</button>
		<!-- i18n -->
		<div v-if="showMsg" class="msg">
			<h4>message send</h4>
			<AppBtn @click="showMsg = false" value="write new message" />
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

	.title {
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	button {
		width: fit-content;
		margin-top: 2rem;
		margin-left: 0.5rem;
		padding: 12px 56px;
		border: 1px solid $primary;
		background: transparent;
		transform: skew(-10deg);
		cursor: pointer;
		user-select: none;

		display: flex;

		span {
			z-index: 2;
			transform: skew(10deg);

			text-transform: uppercase;
			color: $primary;
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

		.title {
			text-align: center;
			margin-bottom: 1rem;
		}

		a {
			width: 100%;
			max-width: 15rem;
		}

		.AppBtn {
			width: 100%;
			max-width: 300px;
		}

	}

}
</style>