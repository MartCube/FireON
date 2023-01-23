<script setup lang="ts">
import { useCycleList, onKeyStroke, useSwipe } from '@vueuse/core'
import { ColorWord } from '~~/src/assets/types';

const props = defineProps<{
	title: string,
	list: string[],
	button: string,
}>()


const isOpen = ref(false) // open & close lightbox
const { state, next, prev, index } = useCycleList(props.list)

function Open(value: number) {
	isOpen.value = true
	index.value = value
}

// onKeyStroke
onKeyStroke(['Escape', 'ArrowLeft', 'ArrowRight'], (e: KeyboardEvent) => {
	if (!isOpen.value) return
	switch (e.key) {
		case 'Escape':
			isOpen.value = false
			break
		case 'ArrowLeft':
			prev()
			break
		case 'ArrowRight':
			next()
			break
	}
})


// add swipe
// const img = ref(null)
// const { isSwiping, direction } = useSwipe(img)

// add loading animation

</script>

<template>
	<section class="gallery">
		<TitleBlock :src="title" :mode="ColorWord.first" />
		<div class="grid">
			<div v-for="(image, index) in list" :key="index" @click="Open(index)" class="placeholder">
				<nuxt-img :src="image" width="740" height="526" provider="sanity" loading="lazy" />
			</div>
		</div>
		<div v-if="isOpen" :class="['lightbox']">
			<nuxt-img ref="img" :src="state" width="740" height="526" provider="sanity" loading="lazy" />
			<Icon @click="prev()" class="prev" name="IconArrow" />
			<Icon @click="next()" class="next" name="IconArrow" />
			<Icon @click="isOpen = false" class="close" name="IconClose" />
		</div>
	</section>
</template>
<style lang="scss" scoped>
.gallery {

	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	.lightbox {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: $dark30;


		display: flex;
		justify-content: center;
		align-items: center;

		.prev {
			position: absolute;
			top: 50%;
			left: 1rem;
			border: 1px solid $dark50;
			stroke: $white50;

			&:hover {
				cursor: pointer;
				stroke: $white;
			}

			transform: rotate(180deg);
			width: 3rem;
			height: 3rem;
		}

		.next {
			position: absolute;
			top: 50%;
			right: 1rem;
			border: 1px solid $dark50;

			&:hover {
				cursor: pointer;
				stroke: $white;
			}

			stroke: $white50;

			width: 3em;
			height: 3rem;
		}

		.close {
			position: absolute;
			top: 1rem;
			right: 1rem;
			border: 1px solid $dark50;

			&:hover {
				cursor: pointer;
				stroke: $white;
			}

			stroke: $white50;

			width: 3em;
			height: 3rem;
		}
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