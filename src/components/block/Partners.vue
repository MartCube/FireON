<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import type { Partner } from "~~/src/types"



defineProps<{
	title: string,
	list: Partner[],
}>()
</script>

<template>
	<section id="partners">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="grid">
			<AppImg v-for="partner in list" class="image" :src="partner.image" :width="96" :height="81" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
#partners {
	width: 100%;
	padding: 4rem 10%;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.grid {
		width: inherit;
		display: flex;
		justify-content: space-around;

		.image {
			opacity: 0.1;
			transition: opacity 0.35s ease;

			&:hover {
				// cursor: pointer;
				opacity: 1;
			}
		}
	}


	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0%;
		width: 40%;
		height: 1px;
		opacity: 0.25;
		background: linear-gradient(90deg, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0%;
		width: 40%;
		height: 1px;
		opacity: 0.25;
		background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, );
	}
}

@media (max-width: 600px) {
	#partners {
		.grid {
			width: 100%;
			justify-content: space-around;
			flex-wrap: wrap;

			.image {
				width: 34%;
				opacity: 0.8;

				&:nth-last-child(-n + 2) {
					margin-top: 3rem;
				}
			}
		}
	}
}
</style>