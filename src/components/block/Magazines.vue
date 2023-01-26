<script setup lang="ts">
import { ColorWord } from "~~/src/types"
import type { MagazineCard } from "~~/src/types"

defineProps<{
	title: string,
	list: MagazineCard[],
	button: string,
}>()
</script>

<template>
	<section id="magazines">
		<TitleBlock :src="title" :mode="ColorWord.last" />
		<div class="grid">
			<MagazineCard v-for="item in list" :key="item.uid" :data="item" :button="button" />
		</div>
	</section>
</template>


<style lang="scss" >
#magazines {

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;


	.grid {
		width: 100%;
		display: flex;
		justify-content: space-between;

	}
}
</style>