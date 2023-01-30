<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	image: string,
	content: any[],
}>()
</script>

<template>
	<section id="about">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="wrap">
			<SanityImage :src="image" :width="640" />
			<RichText :blocks="content" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
#about {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	.wrap {
		width: 100%;
		display: flex;
		justify-content: space-around;


		.image {
			width: 25rem;
		}

		.rich_text {
			width: 45%;
		}
	}
}
</style>