<script setup lang="ts">
import { ColorWord } from "~/assets/types"

defineProps<{
	title: string,
	button: string,
	image: string,
}>()
</script>

<template>
	<section class="cta">
		<nuxt-img class="image" :src="image" provider="sanity" loading="lazy" />
		<div class="wrap">
			<TitleBlock :src="title" :mode="ColorWord.last" noline />
			<Btn>{{ button }}</Btn>
		</div>
	</section>
</template>

<style lang="scss">
.cta {
	height: 25rem;
	justify-content: space-between;
	align-items: center;

	.wrap {
		width: 50%;

		.title h2 {
			font-size: 38px;
			line-height: 57px;
			text-align: left;
		}

		.btn {
			margin-top: 2rem;
		}
	}

	.image {
		width: 20rem;

		img {
			width: 100%;
		}
	}
}
</style>