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
		<div class="content" v-for="item in list">
			<Transition name="tab">
				<div v-if="item == activeTab" class="activeTab">
					<AppImg :src="activeTab.image" :width="640" :height="640" />
					<div class="content">
						<h3>{{ activeTab.title }}</h3>
						<p>{{ activeTab.description }}</p>
					</div>
				</div>
			</Transition>
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

	.activeTab {
		width: 100%;
		height: 100%;
		min-height: 25rem;
		margin-top: 4rem;

		display: flex;
		align-items: center;
		justify-content: space-between;


		.image {
			width: 20rem;
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

.tab-enter-active,
.tab-leave-active {
	transition: all .35s ease-in-out;
}

.tab-enter-from,
.tab-leave-to {
	opacity: 0
}
</style>