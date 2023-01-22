<script setup lang="ts">
import { ColorWord } from "~/assets/types"

defineProps<{
	title: string,
	image: string,
	content: any[],
}>()
</script>

<template>
	<section class="about">
		<MyTitle :src="title" :mode="ColorWord.last" />
		<div class="image">
			<nuxt-img :src="image" provider="sanity" loading="lazy" />
		</div>
		<div class="content">
			<SanityContent :blocks="content" />
		</div>
	</section>
</template>

<style lang="scss" >
.about {

	// flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	.title {
		text-transform: uppercase;
		text-align: center;
		font-size: 29px;
		line-height: 49px;
	}

	.image {
		width: 40%;


		img {
			width: 15rem;
		}
	}

	.content {
		width: 40%;

		p {
			width: 32rem;
			margin-bottom: 2rem;
			color: $white50;

			font-size: .875rem;
			line-height: 1.8125rem;
		}
	}




}
</style>