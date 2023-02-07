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
	<section id="cta">
		<div class="image-wrapper">
			<AppImg class="magazine" :src="image" :width="460" :height="420" />
			<CirclePulse />
		</div>

		<div class="wrap">
			<TitleBlock1 :src="title" :mode="ColorWord.last" noline />
			<LinkBtn link="/#magazines">{{ button }}</LinkBtn>
		</div>
		<AppImg class="bg" :src="bg" :width="1440" :height="420" />
		<AppImg class="bg_mobile" :src="bgMobile" :width="500" :height="665" />

	</section>
</template>

<style lang="scss">
#cta {
	width: 100%;
	margin: 4rem 0;
	padding: 0 10%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;

	.bg,
	.bg_mobile {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.bg_mobile {
		display: none;
	}

	.wrap {
		width: 50%;
		z-index: 2;
		position: relative;
		z-index: 3;

		.title {
			margin: 0;
			max-width: 30rem;

			h1 {
				text-align: left;
				line-height: 1.5;
			}
		}

		.btn {
			margin-top: 2rem;
		}
	}


	.image-wrapper {
		position: relative;
		overflow: hidden;

		.magazine {
			width: auto;
			height: 100%;
			z-index: 3;
			position: relative;
		}

		.pulse {
			position: absolute;
			z-index: 0;
			width: 120%;
			height: 120%;
			left: -10%;
			top: -10%;
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

@media (max-width: 900px) {
	#cta {

		// display: none;
		.wrap .title h1 {
			font-size: 1.2rem;
			line-height: 1.5;
			text-align: left;
		}
	}
}

@media (max-width: 700px) {
	#cta {

		flex-wrap: wrap;
		justify-content: center;

		.wrap {
			width: 80%;
			order: 1;
			padding: 3rem 0;
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				h1 {
					text-align: center;
					font-size: 1.8rem;
				}
			}

			.btn {
				padding: 0 3rem;
			}

		}

		.image-wrapper {
			order: 2;

			.pulse {
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
			}
		}

		.bg_mobile {
			display: block;
		}

		.bg {
			display: none;
		}

	}
}

@media (max-width: 550px) {
	#cta {
		.wrap {
			width: 100%;

			.title {

				h1 {
					font-size: 1.4rem;
				}
			}
		}
	}
}
</style>