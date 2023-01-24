
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
		<div class="image">
			<nuxt-img :src="image" provider="sanity" loading="lazy" />
		</div>
	</section>
</template>


<style lang="scss" scoped>
.contact {
	justify-content: space-between;
	align-items: center;


	.image {
		width: 540px;
		height: 580px;

		img {
			width: 100%;
			height: 100%;

		}
	}
}
</style>