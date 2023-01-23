<script setup lang="ts">
import { ColorWord } from "~/assets/types"

interface partner {
	name: string,
	link: string,
	image: string,

}

defineProps<{
	title: string,
	list: partner[],
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
	height: 25rem;

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
}
</style>