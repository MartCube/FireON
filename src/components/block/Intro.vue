<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	button: string,
	image: string,
	bg: string
}>()
</script>

<template>
	<section id="intro">
		<div class="wrap">
			<TitleBlock :src="title" :mode="ColorWord.first" noline />
			<LinkBtn link="/#magazines">{{ button }}</LinkBtn>
		</div>

		<AppImg class="magazine" :src="image" :width="640" :height="640" />
		<AppImg class="bg" :src="bg" :width="1440" :height="420" />
	</section>
</template>

<style lang="scss" >
#intro {
	width: 100%;
	height: 26rem;
	margin-bottom: 4rem;

	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	overflow: hidden;

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
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

	.magazine {
		z-index: 2;
	}
}
</style>