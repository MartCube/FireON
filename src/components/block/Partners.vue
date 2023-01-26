<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import type { Partner } from "~~/src/types"



defineProps<{
	title: string,
	list: Partner[],
}>()
</script>

<template>
	<section class="partners">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="grid">
			<nuxt-img v-for="partner in list" class="image" :src="partner.image" provider="sanity" loading="lazy" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
.partners {
	width: 100%;
	padding: 4rem 0;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.grid {
		margin-top: 2rem;
		width: 60%;
		display: flex;
		justify-content: space-around;

		img {
			width: 6rem;
			height: 100%;
			opacity: 0.1;
			transition: opacity 0.15s ease;

			&:hover {
				cursor: pointer;
				opacity: 1;
			}
		}
	}

	position: relative;

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
</style>