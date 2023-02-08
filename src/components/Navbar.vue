<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'

// data
const { logo, links } = storeToRefs(useAppStore())
// i18n
const { locale, localeCodes } = useI18n()
const switchLocalePath = useSwitchLocalePath()
// menu
const [menuValue, menuToggle] = useToggle()
// store
const { toggleModal } = useBasketStore()
</script>

<template>
	<header>
		<div class="links" :class="{ show: menuValue }">
			<Icon class="close" @click="menuToggle()" name="IconClose" />
			<div v-for="link in links" :key="link.title" class="link" @click="menuValue = false">
				<AppLink to="/" :hash="`#${link.hashtag}`">
					{{ link.title }}
				</AppLink>
			</div>
		</div>
		<div class="menu" @click="menuToggle()">
			<Icon name="IconMenu" />
		</div>

		<Logo :src="logo!" />

		<div class="langSwitcher" :class="{ show: menuValue }">
			<NuxtLink v-for="code in localeCodes" :to="switchLocalePath(code)" :class="['locale', { active: code == locale }]" @click="menuValue = false" :key="code">
				{{ code }}
			</NuxtLink>
		</div>
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

	.langSwitcher {
		position: absolute;
		right: calc(10% + 3.8rem);
		top: 2rem;
		transform: translateY(-50%);

		.locale {
			margin-right: 1rem;

			text-transform: uppercase;
			font-size: .75rem;
			line-height: 1.5rem;
			color: $white50;

			&:last-of-type {
				margin-right: 0;
			}

			&.active {
				color: $white;
			}

			&:hover {
				cursor: pointer;
				color: $primary;

				&.active {
					cursor: default;
					color: $white;
				}
			}
		}
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

		.langSwitcher {
			z-index: 8;
			width: min-content;
			position: fixed;
			top: 80%;
			left: 50%;
			transform: translateX(-50%);
			display: none;

			.locale {
				font-size: 20px;
				line-height: 34px;
				margin-right: 2rem;
			}

			&.show {
				display: flex;
			}

		}
	}
}
</style>
