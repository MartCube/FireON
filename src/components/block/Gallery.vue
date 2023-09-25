<script setup lang="ts">
import { useCycleList, onKeyStroke, onClickOutside } from '@vueuse/core'
import { ColorWord } from '~~/src/types'

const props = defineProps<{
	title: string,
	list: string[],
	button: string,
}>()

const lightbox = ref(null)	// lightbox ref
const isOpen = ref(false) // toggle lightbox
const { state, next, prev, index } = useCycleList(props.list)

// open lightbox
function Open(value: number) {
	isOpen.value = true
	index.value = value
}

// close lightbox
onClickOutside(lightbox, (event) => {
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
// add loading spinner animation

</script>

<template>
	<section id="gallery">
		<TitleBlock :src="title" :mode="ColorWord.first" />
		<div class="grid">
			<AppImg v-for="(image, index) in list" :key="index" @click="Open(index)" :src="image" :width="740" :height="526" />
		</div>
		<div v-if="isOpen" class="lightbox">
			<div class="wrapper" ref="lightbox">
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
	padding-bottom: calc(4rem - 2%);

	.lightbox {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: $dark80;

		display: flex;
		justify-content: center;
		align-items: center;

		.wrapper {
			.image {
				width: 100%;
				max-width: 1280px;
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
	}

	.grid {
		width: inherit;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.image {
			width: 32%;
			margin-right: 2%;
			margin-bottom: 2%;

			&:nth-child(n+3) {
				margin-right: 0;
			}

			&:hover {
				cursor: pointer;
			}
		}
	}
}


@media (max-width: 800px) {
	#gallery {
		.grid {
			justify-content: space-between;

			.image {
				width: 48%;
				margin-right: 0;
			}
		}
	}
}

@media (max-width: 600px) {
	#gallery {
		padding-bottom: 2rem;

		.grid {

			.image {
				width: 100%;
				margin-bottom: 2rem;

			}
		}
	}
}
</style>