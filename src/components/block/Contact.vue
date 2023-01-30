
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
		<SanityImage :src="image" :width="640" />
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
</style>