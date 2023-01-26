
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
		<div class="image">
			<nuxt-img :src="image" provider="sanity" loading="lazy" />
		</div>
	</section>
</template>


<style lang="scss" scoped>
#contact {
	justify-content: space-between;
	align-items: center;


	.image {
		width: 500px;

		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>