<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import type { TechSpec } from "~~/src/types"

defineProps<{
	title: string,
	list: TechSpec[],
}>()
</script>

<template>
	<section class="techSpecs">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="grid">
			<div v-for="item in list" class="spec">
				<h3>
					<Icon :name="item.icon" />{{ item.title }}
				</h3>
				<p class="description">{{ item.description }}</p>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.techSpecs {

	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	.grid {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.spec {
			width: 30%;
			margin-bottom: 5%;

			h3 {
				margin-bottom: 0.5rem;
				display: flex;
				align-items: center;

				font-weight: 700;
				font-size: 1.125rem;
				line-height: 1.5rem;

				.icon {
					width: 3rem;
					height: 3rem;
					margin-right: 1rem;
				}
			}

			.description {
				font-size: .75rem;
				line-height: 1.375rem;
				color: $white30;
			}
		}
	}

}
</style>