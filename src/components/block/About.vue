<script setup lang="ts">
import { ColorWord } from "~~/src/types"

defineProps<{
	title: string,
	image: string,
	content: any[],
}>()
</script>

<template>
	<section id="about">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="wrap">
			<AppImg :src="image" :width="460" :height="460" />
			<RichText :blocks="content" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
#about {
	display: flex;
	flex-direction: column;

	.wrap {
		width: inherit;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.rich_text {
			width: 45%;
		}
	}
}

@media (max-width: 1200px) {
	#about {
		.image {
			margin-bottom: 2rem;
		}

		.wrap {
			flex-direction: column;
			justify-content: center;

			.rich_text {
				width: 100%;
				max-width: 32rem;
			}
		}
	}
}
</style>