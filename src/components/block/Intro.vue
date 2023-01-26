<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	button: string,
	image: string,
}>()
</script>

<template>
	<section class="intro">
		<div class="wrap">
			<TitleBlock :src="title" :mode="ColorWord.first" noline />
			<LinkBtn>{{ button }}</LinkBtn>
		</div>
		<nuxt-img class="image" :src="image" provider="sanity" loading="lazy" />
	</section>
</template>

<style lang="scss" >
.intro {
	height: 26rem;
	justify-content: space-between;
	align-items: center;
	background: url('/bg.png');

	.wrap {
		width: 50%;

		.title h2 {
			font-size: 46px;
			line-height: 69px;
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