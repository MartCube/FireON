<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'

// data
const { logo, links } = storeToRefs(useAppStore())
// menu
const [menuValue, menuToggle] = useToggle()
// store
const { toggleModal } = useBasketStore()

</script>

<template>
	<header>
		<div class="links" :class="{ show: menuValue }">
			<Icon class="close" @click="menuToggle()" name="IconClose" />
			<a href="tel:+380933503569" class="phone">
				<IconPhone />
				+380 93 350 35 69
			</a>
			<div class="mobile">
				<div v-for="link in links" :key="link.title" class="link" @click="menuValue = false">
					<NuxtLink :to="`/${link.hashtag}`">{{ link.title }}</NuxtLink>
				</div>

			</div>
		</div>
		<div class="menu" @click="menuToggle()">
			<Icon name="IconMenu" />
		</div>
		<Logo v-if="logo" :src="logo" />
		<SwitchLocale @click="menuValue = false" :class="{ show: menuValue }" />
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

	.phone {
		line-height: 1;
		display: flex;
		align-items: center;
		color: $white50;
		svg {
			width: 1rem;
			margin-right: 0.5rem;
			fill: $primary;
		}
		&:hover {
			color: $primary;
		}
	}

	.links {
		width: fit-content;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.link {
			padding-right: 1rem;
			overflow: hidden;
			display: none;

			&:last-of-type {
				padding-right: 0;
			}

			a {
				text-transform: uppercase;
				font-size: .75rem;
				font-weight: 400;
				color: $white50;
				line-height: 1.5rem;

				transition: opacity 0.15s ease;

				&:hover {
					color: $white;
				}
			}
		}

		.close {
			display: none;
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
		.phone {
			// display: none;
			margin-bottom: 4rem;
		} 
		.links {
			z-index: 8;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: $dark95;


			display: none; // toggle to flex
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&.show {
				display: flex;
			}

			.link {
				padding: 0;
				margin-bottom: 4rem;
				user-select: none;
				display: flex;

				&:last-of-type {
					margin-bottom: 0;
				}

				a {
					font-size: 26px;
					line-height: 44px;
				}
			}

			.close {
				display: initial;
				position: absolute;
				top: 1rem;
				left: 10%;
				width: 2rem;
				height: 2rem;
				stroke: $white50;

				&:hover {
					cursor: pointer;
					stroke: $primary;
				}

				&:active {
					stroke: $primary;
				}
			}

		}

		.menu {
			display: flex;
		}
	}
}
</style>
