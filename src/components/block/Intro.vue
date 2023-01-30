<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	button: string,
	image: string,
}>()
</script>

<template>
	<section id="intro">
		<div class="wrap">
			<TitleBlock :src="title" :mode="ColorWord.first" noline />
			<LinkBtn>{{ button }}</LinkBtn>
		</div>
		<SanityImage :src="image" :width="640" />
		<nuxt-img class="bg" src="/bg.png" loading="lazy" />
	</section>
</template>

<style lang="scss" >
#intro {
	height: 26rem;
	margin-bottom: 4rem;

	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.wrap {
		width: 50%;
		z-index: 2;

		.title {
			margin: 0;

			h2 {

				font-size: 46px;
				line-height: 69px;
				text-align: left;
			}
		}

		.btn {
			margin-top: 2rem;
		}
	}

	.image {
		width: 20rem;
		z-index: 2;
	}
}
</style>