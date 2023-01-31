<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	button: string,
	image: string,
	bg: string,
}>()
</script>

<template>
	<section id="cta">
		<AppImg class="magazine" :src="image" :width="460" :height="420" />

		<div class="wrap">
			<TitleBlock :src="title" :mode="ColorWord.last" noline />
			<LinkBtn link="/#magazines">{{ button }}</LinkBtn>
		</div>
		<AppImg class="bg" :src="bg" :width="1440" :height="420" />
	</section>
</template>

<style lang="scss">
#cta {
	width: 100%;
	height: 23rem;
	margin: 4rem 0;

	display: flex;
	justify-content: space-between;
	align-items: flex-end;
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
		margin-bottom: 4rem;
		z-index: 2;

		.title {
			margin: 0;


			h2 {
				font-size: 38px;
				line-height: 57px;
				text-align: left;
			}
		}

		.btn {
			margin-top: 2rem;
		}
	}

	.magazine {
		width: 25rem;
		height: 18.75rem;
		z-index: 2;
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