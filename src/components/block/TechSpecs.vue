<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import type { TechSpec } from "~~/src/types"

defineProps<{
	title: string,
	list: TechSpec[],
}>()
</script>

<template>
	<section id="techSpecs">
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
#techSpecs {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding-bottom: calc(4rem - 2%);

	.grid {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.spec {
			width: 32%;
			margin-right: 2%;
			margin-bottom: 2%;

			&:nth-child(n+3) {
				margin-right: 0;
			}


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

@media (max-width: 1116px) {
	#techSpecs {
		padding-bottom: 2rem;

		.grid {
			.spec {
				width: 48%;
				margin-right: 0;
				margin-bottom: 2rem;


			}
		}
	}
}

@media (max-width: 800px) {
	#techSpecs {
		.grid {
			.spec {
				width: 100%;

				p {
					font-size: 11px;
					line-height: 19px;
				}
			}
		}
	}
}
</style>