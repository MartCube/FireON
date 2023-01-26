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
			<div class="image">
				<nuxt-img :src="image" format="png" provider="sanity" loading="lazy" />
			</div>
			<RichText :blocks="content" />
		</div>
	</section>
</template>

<style lang="scss" >
#about {

	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	.wrap {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.image {
			width: 453px;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				display: block;
			}
		}

		.rich_text {
			width: 45%;

			p {
				max-width: 32rem;
				margin-bottom: 2rem;
				color: $white50;

				font-size: .875rem;
				line-height: 1.8125rem;
			}
		}
	}
}
</style>