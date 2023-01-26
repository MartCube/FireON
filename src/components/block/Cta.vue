<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	button: string,
	image: string,
}>()
</script>

<template>
	<section class="cta">
		<div class="image">
			<nuxt-img class="image" :src="image" provider="sanity" loading="lazy" />
		</div>
		<div class="wrap">
			<TitleBlock :src="title" :mode="ColorWord.last" noline />
			<LinkBtn>{{ button }}</LinkBtn>
		</div>
	</section>
</template>

<style lang="scss">
.cta {
	width: 100%;
	height: 23rem;
	justify-content: space-between;
	align-items: flex-end;
	background: url('/bg.png');

	position: relative;



	.wrap {
		width: 50%;
		margin-bottom: 4rem;

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
		width: 25rem;
		height: 18.75rem;
		display: flex;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

	}

	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0%;
		width: 50%;
		height: 1px;
		opacity: 0.25;
		background: linear-gradient(90deg, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0%;
		width: 50%;
		height: 1px;
		opacity: 0.25;
		background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, );
	}
}
</style>