<template>
	<footer>
		<div class="links">
			<div class="link" v-for="link in links" :key="link.title">
				<NuxtLink :to="`/#${link.hashtag}`">{{ link.title }}</NuxtLink>

			</div>
		</div>
		<Logo :src="logo" />
		<div class="smedias">
			<NuxtLink class="media" v-for="media in smedias" :to="media.link" external target="_blank">
				<Icon :name="media.icon" />
			</NuxtLink>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { smedias, logo, links } = storeToRefs(useAppStore())
</script>

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

			.icon {
				width: 1.5rem;
				height: 1.5rem;
				fill: $white2;
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
}
</style>