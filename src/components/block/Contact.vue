
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
	</section>
</template>


<style lang="scss" scoped>
#contact {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.image {
		width: 20rem;
	}
}

@media (max-width: 1200px) {
	#contact {
		flex-direction: column;

		form {
			align-items: center;
		}

		.image {
			margin-top: 4rem;
		}
	}
}
</style>