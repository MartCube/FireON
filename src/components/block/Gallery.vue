<script setup lang="ts">
import { useCycleList, onKeyStroke, onClickOutside, useSwipe } from '@vueuse/core'
import { ColorWord } from '~~/src/types'

const props = defineProps<{
	title: string,
	list: string[],
	button: string,
}>()

const img = ref(null)	// image ref
const isOpen = ref(false) // toggle lightbox
const { state, next, prev, index } = useCycleList(props.list)

// open lightbox
function Open(value: number) {
	isOpen.value = true
	index.value = value
}

// close lightbox
onClickOutside(img, (event) => {
	isOpen.value = false
})

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

// TODO
// add swipe
// const { isSwiping, direction } = useSwipe(img)


// TODO
// add loading animation

</script>

<template>
	<section id="gallery">
		<TitleBlock :src="title" :mode="ColorWord.first" />
		<div class="grid">
			<div v-for="(image, index) in list" :key="index" @click="Open(index)" class="placeholder">
				<AppImg :src="image" :width="740" :height="526" />
			</div>
		</div>
		<div v-if="isOpen" class="lightbox">
			<div class="image" ref="img">
				<AppImg :src="state" :width="1280" :height="720" />
				<Icon class="prev" @click="prev()" name="IconArrow" />
				<Icon class="next" @click="next()" name="IconArrow" />
				<Icon class="close" @click="isOpen = false" name="IconClose" />
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
#gallery {
	display: flex;
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
		background-color: $dark80;

		display: flex;
		justify-content: center;
		align-items: center;

		.image {
			height: 90%;
			user-select: none;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		.icon {
			position: absolute;
			width: 3rem;
			height: 3rem;
			stroke: $white50;
			fill: none;
			transition: all 0.2s ease;

			&:hover {
				cursor: pointer;
				stroke: $primary;
			}
		}

		.prev {
			top: 50%;
			left: 1rem;
			transform: rotate(180deg);
		}

		.next {
			top: 50%;
			right: 1rem;
		}

		.close {
			top: 1rem;
			right: 1rem;
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
			margin-bottom: 4rem;



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