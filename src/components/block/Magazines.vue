<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import type { MagazineCard } from "~~/src/types"

defineProps<{
	title: string,
	list: MagazineCard[],
}>()
</script>

<template>
	<section id="magazines">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="grid">
			<MagazineCard v-for="item in list" :key="item.uid" :data="item" />
		</div>
	</section>
</template>


<style lang="scss" scoped>
#magazines {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.grid {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.magazine_card {
			margin-bottom: 8rem;

			&:nth-last-child(-n + 2) {
				margin: 0;
			}
		}
	}
}


@media (max-width: 1400px) {
	#magazines {
		.grid {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-wrap: nowrap;

			.magazine_card {
				margin-bottom: 0;

				&:nth-last-child(-n + 3) {
					margin-top: 8rem;
				}
			}
		}

	}
}
</style>