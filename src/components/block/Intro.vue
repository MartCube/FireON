<script setup lang="ts">
import { ColorWord } from "~/assets/types"

defineProps<{
	title: string,
	button: string,
	image: string,
}>()
</script>

<template>
	<section class="intro">
		<div class="wrap">
			<MyTitle :src="title" :mode="ColorWord.first" />
			<Btn>{{ button }}</Btn>
		</div>
		<nuxt-img class="image" :src="image" provider="sanity" loading="lazy" />
	</section>
</template>

<style lang="scss" scoped>
.intro {
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