
<script setup lang="ts">
import type { ContactForm } from "~/assets/types"


defineProps<{
	form: ContactForm,
	image: string,
}>()
</script>

<template>
	<section class="contact">
		<ContactForm :data="form" />
		<nuxt-img :src="image" provider="sanity" loading="lazy" />
	</section>
</template>


<style lang="scss" scoped>
.contact {
	justify-content: space-between;
	align-items: center;


	.image {
		width: 20rem;

		img {
			width: 100%;
		}
	}
}
</style>