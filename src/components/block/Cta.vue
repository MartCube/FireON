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
			<TitleBlock :src="title" :mode="ColorWord.last" />
			<Btn>{{ button }}</Btn>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.cta {
	height: 25rem;
	justify-content: space-between;
	align-items: center;

	.wrap {
		width: 50%;

		.title {
			font-size: 3rem;
			line-height: 150%;
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