<script setup lang="ts">
import { useCycleList } from '@vueuse/core'
import { ColorWord } from '~~/src/assets/types';

const props = defineProps<{
	title: string,
	list: string[],
	button: string,
}>()



const { state, next, prev } = useCycleList(props.list)

</script>

<template>
	<section class="gallery">
		<MyTitle :src="title" :mode="ColorWord.first" />
		<div class="grid">
			<div v-for="image in list" class="placeholder">
				<nuxt-img :src="image" width="740" height="526" provider="sanity" loading="lazy" />
			</div>
		</div>
	</section>
</template>
<style lang="scss" scoped>
.gallery {

	flex-wrap: wrap;
	justify-content: center;
	align-items: center;


	.title {
		text-transform: uppercase;
		text-align: center;
		font-size: 29px;
		line-height: 49px;
	}


	.grid {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.placeholder {
			width: 370px;
			height: 263px;
			margin-bottom: 5%;

			img {
				width: 100%;
				height: 100%;
			}

			&:hover {
				cursor: pointer;
			}
		}
	}




}
</style>