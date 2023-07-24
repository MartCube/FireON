<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { smedias, logo, links } = storeToRefs(useAppStore())
</script>

<template>
	<footer>
		<div class="links">
			<div class="link" v-for="link in links" :key="link.title">
				<NuxtLink :to="`/${link.hashtag}`">{{ link.title }}</NuxtLink>
			</div>
		</div>
		<Logo v-if="logo" :src="logo" />
		<div class="smedias">
			<a href="tel:+380977620000" class="media">
				<Icon name="IconPhone" />
			</a>
			<NuxtLink class="media" v-for="media in smedias" :to="media.link" external target="_blank" :key="media.name">
				<Icon :name="media.icon" />
			</NuxtLink>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
footer {
	width: 100%;
	height: 4rem;
	padding: 0 9%;
	background: $dark;

	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	position: relative;

	.links {
		width: fit-content;
		display: flex;


		.link {
			padding-right: 1rem;
			overflow: hidden;

			&:last-of-type {
				padding-right: 0;
			}

			a {
				text-transform: uppercase;
				font-size: .75rem;
				font-weight: 400;
				color: $white;
				line-height: 1.5rem;

				opacity: 0.5;
				transition: opacity 0.15s ease;

				&:hover {
					opacity: 1;
				}
			}
		}
	}

	.logo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 8.75rem;
	}

	.smedias {
		width: fit-content;
		display: flex;

		.media {
			margin-right: 1rem;
			&:first-child {
				svg {
					width: 20px;
				}
			}
			.icon {
				width: 1.5rem;
				height: 1.5rem;
				fill: $white10;
				transition: fill 0.15s ease;

				&:hover {
					fill: $white;
				}
			}


			&:last-of-type {
				margin-right: 0;
			}

		}
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 25%;
		width: 50%;
		height: 1px;
		opacity: 0.8;
		background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
	}
}


@media (max-width: 1000px) {
	footer {
		height: 100%;
		flex-direction: column;
		justify-content: center;
		padding: 2rem 0;

		.logo {
			position: initial;
			transform: initial;
			order: 1;
		}

		.links {
			margin: 2rem 0;
			order: 2;
		}

		.smedias {
			order: 3;

			.media .icon {
				width: 2rem;
				height: 2rem;
			}
		}

	}
}
</style>