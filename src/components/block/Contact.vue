
<script setup lang="ts">
import type { ContactForm } from "~~/src/types"


defineProps<{
	form: ContactForm,
	image: string,
}>()
</script>

<template>
	<section id="contact">
		<ContactForm :data="form" />
		<AppImg :src="image" :width="560" :height="560" />
		<div class="light"></div>
	</section>
</template>


<style lang="scss" scoped>
#contact {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	padding-top: 4rem;
	overflow: hidden;

	.light {
		position: absolute;
		width: 550px;
		height: 520px;
		right: -10%;
		top: -10%;

		background: #D6AE21;
		opacity: 0.07;
		filter: blur(222px);
		transform: rotate(7.06deg);
	}

	.image {
		width: 50%;
	}
}

@media (max-width: 1200px) {
	#contact {
		// flex-direction: column;

		form {
			align-items: center;
		}

		.image {

			// margin-top: 4rem;
			.light {
				right: -13%;
				top: -8.65%;
			}
		}
	}
}

@media (max-width: 1000px) {
	#contact {
		flex-direction: column;

		.image {
			margin-top: 2rem;
			width: 100%;
		}
	}
}
</style>