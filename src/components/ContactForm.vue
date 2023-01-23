<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import type { ContactForm } from "~/assets/types";
import { ColorWord } from "~/assets/types";

defineProps<{ data: ContactForm }>()
const showMsg = ref(false)
const form = ref<HTMLFormElement | null>(null)
const validationSchema = toFormValidator(
	z.object({
		// email: z.string().min(1, 'Required').email(),
		name: z.string().min(1, 'Required'),
		phone: z.string().min(1, 'Required'),
		message: z.string().min(1, 'Required').max(120),
	})
)

const { handleSubmit, isSubmitting, } = useForm<ContactForm>({ validationSchema })
const onSubmit = handleSubmit(async (values, actions) => {
	console.log('sending data', values)
	showMsg.value = true
	actions.resetForm()
})
</script>

<template>
	<form ref="form" id="form" @submit="onSubmit" autocomplete="off">
		<TitleBlock :src="data.title" :mode="ColorWord.first" />
		<VeeInput :data="data.name" />
		<VeeInput :data="data.phone" />
		<VeeInput :data="data.message" />
		<button type="submit" :disabled="isSubmitting">
			<span>{{ data.button }}</span>
		</button>

		<div v-if="showMsg" class="msg">
			<TitleBlock src="message send" :mode="ColorWord.first" />
			<Btn @click="showMsg = false">write new message</Btn>
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
		text-align: left;
	}

	button {
		width: fit-content;
		margin-left: 0.5rem;
		padding: 12px 56px;
		border: 1px solid $primary;
		background: transparent;
		transform: skew(-15deg);
		cursor: pointer;
		user-select: none;

		display: flex;

		span {
			z-index: 2;
			transform: skew(15deg);

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

	}

}
</style>