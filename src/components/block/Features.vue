<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import type { Feature } from "~~/src/types"

const props = defineProps<{
	title: string,
	list: Feature[],
}>()

const activeTab = ref(props.list[0])
async function SetActiveTab(value: Feature) {
	//animation to hide and show
	activeTab.value = value
}
</script>

<template>
	<section id="features">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="tabs">
			<h3 v-for="item in list" :class="['tab', { active: item == activeTab }]" @click="SetActiveTab(item)">
				{{ item.title }}
			</h3>
		</div>
		<div class="list">
			<div class="tab" v-for="item in list" :class="{ active: item == activeTab }">
				<div class="magazine">
					<AppImg :src="activeTab.image" :width="640" :height="640" />
					<CirclePulse />
				</div>
				<div class="content">
					<h3>{{ activeTab.title }}</h3>
					<p>{{ activeTab.description }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
#features {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	.tabs {
		width: 100%;
		border-bottom: 1px solid $white5;
		user-select: none;

		display: flex;
		justify-content: space-around;

		.tab {
			display: inline-block;
			width: 100%;
			padding-bottom: 1rem;

			text-align: center;
			text-transform: uppercase;
			font-size: 12px;
			font-weight: 400;
			color: $white30;

			transition: all 0.2s ease;

			&:hover {
				cursor: pointer;
				color: $primary;
			}

			&.active {
				color: $primary;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					margin-top: 1.25rem;
					width: 100%;
					height: 0.5px;
					opacity: 0.8;
					background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
				}
			}
		}
	}


	.list {
		position: relative;
		width: 100%;
		height: 25rem;

		.tab {
			z-index: 1;
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 25rem;
			margin-top: 4rem;

			display: flex;
			align-items: center;
			justify-content: space-evenly;

			transition: all 1s ease;


			&.active {
				animation: fadeIn 1s ease-in forwards;
			}

			@keyframes fadeIn {
				0% {
					opacity: 0;
				}

				100% {
					opacity: 1;
					z-index: 4;
				}
			}

			.magazine {
				width: 20rem;
				height: 20rem;
				position: relative;

				.image {
					width: inherit;
					height: inherit;
					z-index: 3;
					position: absolute;
					top: 0;
					left: 0;
					object-fit: contain;

				}

				.pulse {
					width: 100%;
					height: 100%;
					z-index: 1;
					position: absolute;
					top: 0;
					left: 0;
				}
			}

			.content {
				width: 49%;

				h3 {
					text-transform: uppercase;
					font-size: 20px;
					line-height: 34px;
					font-weight: 400;
					color: $white70;
					margin-bottom: 14px;
				}

				p {
					font-size: 14px;
					line-height: 29px;
					font-weight: 400;
					color: $white50;
				}
			}
		}
	}


}

.tab-enter-active,
.tab-leave-active {
	transition: all .35s ease-in-out;
	transition-delay: 0.35s;
}

.tab-enter-from,
.tab-leave-to {
	opacity: 0
}

@media (max-width: 1200px) {
	#features {
		display: flex;
	}
}

@media (max-width: 950px) {
	#features .list {
		height: 37rem;

		.tab {
			height: 30rem;
		}
	}
}

@media (max-width: 800px) {
	#features {
		padding: 0;

		.tabs {
			display: inline-block;
			white-space: nowrap;
			overflow-x: auto;
			text-align: center;
			padding-bottom: 1rem;

			.tab {
				display: inline-block;
				width: fit-content;
				margin: 0 2rem;

				&.active {
					&::after {
						height: 1px;
					}
				}
			}
		}

		.list {
			height: 55rem;

			.tab {
				height: auto;
				flex-direction: column;

				.content {
					margin-top: 4rem;
					width: 100%;
					padding: 0 2rem;
				}
			}
		}
	}
}

@media (max-width: 500px) {
	#features {
		.list {
			height: 65rem;
		}
	}
}

@media (max-width: 380px) {
	#features {
		.list {
			height: 70rem;
		}
	}
}
</style>