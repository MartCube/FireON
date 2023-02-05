<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import { useMediaQuery } from '@vueuse/core'

const isLargeScreen = useMediaQuery('(min-width: 889px)')

defineProps<{
	title: string,
	button: string,
	image: string,
	bg: string
}>()
</script>

<template>
	<section id="intro">

		<div class="desktop" v-show="isLargeScreen">
			<div class="wrap">
				<TitleBlock :src="title" :mode="ColorWord.first" noline />
				<LinkBtn link="/#magazines">{{ button }}</LinkBtn>
			</div>
			<AppImg class="magazine" :src="image" :width="640" :height="640" />
		</div>

		<div class="mobile" v-show="!isLargeScreen">
			<TitleBlock :src="title" :mode="ColorWord.first" noline />
			<AppImg class="magazine" :src="image" :width="640" :height="640" />
			<LinkBtn link="/#magazines">{{ button }}</LinkBtn>
		</div>

		<AppImg class="bg" :src="bg" :width="1440" :height="420" />
	</section>
</template>

<style lang="scss" >
#intro {
	width: 100%;
	height: 26rem;
	margin-bottom: 4rem;
	position: relative;
	overflow: hidden;


	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		img {
			width: inherit;
			height: inherit;
			object-fit: cover;
		}
	}

	.desktop {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;


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
			width: 50%;
		}
	}
}

// @media (max-width: 1300px) {
// 	#intro {
// 		.wrap {
// 			.title {
// 				h2 {

// 					font-size: 2rem;
// 					line-height: 4rem;
// 				}
// 			}
// 		}
// 	}
// }

// @media (max-width: 889px) {
// 	#intro {
// 		height: 100%;
// 		flex-direction: column-reverse;

// 		.magazine {
// 			width: 100%;
// 		}

// 		.wrap {
// 			width: 100%;

// 			.title h2 {
// 				text-align: center;
// 				font-size: 1.5rem;
// 			}
// 		}
// 	}
// }
</style>