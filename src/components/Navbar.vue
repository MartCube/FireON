<script setup>
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'

const { logo, links } = storeToRefs(useAppStore())
const { toggleModal } = useBasketStore()

const [menuValue, menuToggle] = useToggle()
</script>

<template>
	<header>
		<div class="links">
			<div v-for="link in links" :key="link.title" class="link">
				<NuxtLink :to="`/#${link.hashtag}`">{{ link.title }}</NuxtLink>
			</div>
		</div>
		<div class="menu">
			<Icon name="IconMenu" />
		</div>
		<Logo :src="logo" />

		<div class="basket" @click="toggleModal()">
			<Icon name="IconBasket" />
		</div>
	</header>
</template>

<style lang="scss" scoped>
header {
	width: 100%;
	height: 4rem;
	padding: 0 10%;
	background: $dark;

	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	position: relative;

	.links {
		width: fit-content;
		display: flex;
		justify-content: space-around;
		align-items: center;

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

	.menu {
		display: none;
		justify-content: center;
		align-items: center;

		transform: skew(-10deg);
		cursor: pointer;
		transition: all 0.15s ease;

		.icon {
			transform: skew(10deg);

			width: 2.8rem;
			height: 2.7rem;
			stroke: $white10;

			&:hover {
				stroke: $white70;
			}
		}


	}

	.logo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.basket {
		width: 2.8rem;
		height: 2.7rem;

		display: flex;
		justify-content: center;
		align-items: center;

		border: 1px solid $white10;
		transform: skew(-10deg);
		cursor: pointer;
		transition: all 0.15s ease;

		.icon {
			transform: skew(10deg);

			width: 1.5rem;
			height: 1.5rem;
			stroke: $white;
		}

		&:hover {
			border-color: $white;
		}
	}
}

@media (max-width: 1000px) {
	header {
		.links {
			display: none;
		}

		.menu {
			display: flex;
		}
	}
}
</style>
