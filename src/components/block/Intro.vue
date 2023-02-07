<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	button: string,
	image: string,
	bg: string,
	bgMobile: string,
}>()
</script>

<template>
	<section id="intro">

		<div class="desktop">
			<div class="wrap">
				<TitleBlock1 :src="title" :mode="ColorWord.first" noline />
				<LinkBtn link="/#magazines">{{ button }}</LinkBtn>
			</div>
			<AppImg class="magazine" :src="image" :width="640" :height="640" />
			<AppImg class="bg" :src="bg" :width="1440" :height="420" />
		</div>

		<div class="mobile">
			<TitleBlock1 :src="title" :mode="ColorWord.first" noline />
			<AppImg class="magazine" :src="image" :width="640" :height="640" />
			<LinkBtn link="/#magazines">{{ button }}</LinkBtn>
			<AppImg class="bg" :src="bgMobile" :width="500" :height="665" />
		</div>

	</section>
</template>

<style lang="scss" >
#intro {
	width: 100%;
	height: 26rem;
	padding: 0;
	margin-bottom: 4rem;
	overflow: hidden;

	.desktop {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding: 0 10%;

		.wrap {
			width: 50%;
			z-index: 2;

			.title {
				margin: 0;

				h1 {
					font-size: 3vw;
					line-height: 4vw;
					text-align: left;
				}

				@media (min-width: 1370px) {
					h1 {
						font-size: 49px;
						line-height: 69px;
					}
				}
			}

			.btn {
				margin-top: 2rem;
			}
		}

		.magazine {
			z-index: 2;
			width: 50%;

			img {
				transform: scale(1.2);
			}
		}

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
	}

	.mobile {
		display: none;
	}
}

@media (max-width: 1200px) {
	#intro {
		padding-bottom: 0;
	}
}

@media (max-width: 800px) {
	#intro {
		height: 90vh;

		.desktop {
			display: none;
		}

		.mobile {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			height: 100%;

			position: relative;
			padding: 0 2rem;

			.title {
				margin: 3rem 0;
				position: relative;
				z-index: 3;

				h1 {
					font-size: 27px;
					line-height: 1.4;
				}
			}

			.image {
				height: auto;
				width: 360px;
				position: relative;
				z-index: 3;

				img {
					transform: scale(1.8);
				}
			}

			.btn {
				margin: 3rem 0;
				min-width: 200px;
				position: relative;
				z-index: 3;
				padding: 1rem;
			}

			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 0;

				img {
					width: inherit;
					height: inherit;
					object-fit: cover;
				}
			}
		}
	}
}

@media (max-width: 400px) {
	#intro {
		.mobile {
			.image {
				width: 100%;
			}

			.title {
				margin: 2rem 0;

				h1 {
					font-size: 1rem;
				}
			}
		}
	}
}

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