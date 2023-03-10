<script setup lang="ts">
import { string } from "zod"
import { useCycleList, onKeyStroke, onClickOutside, useSwipe } from '@vueuse/core'

const props = defineProps<{ gallery: string[] }>()

const galleryRef = toRef(props, 'gallery')
const activeImage = ref(props.gallery[0])
watch(galleryRef, (a, b) => activeImage.value = props.gallery[0])
const { state, next, prev, index } = useCycleList(props.gallery)

// lightbox
const isOpen = ref(false) // toggle lightbox
const lightboxImage = ref('')
const lightbox = ref(null)	// lightbox ref

// open lightbox
function Open(image: string) {
	isOpen.value = true
	lightboxImage.value = image
}
function Close() {
	isOpen.value = false
	lightboxImage.value = ''
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
// close lightbox
onClickOutside(lightbox, (event) => {
	isOpen.value = false
	lightboxImage.value = ''
})

</script>

<template>
	<div class="image_slider">
		<div v-show="isOpen" class="lightbox" >
			<div class="wrapper" ref="lightbox">
				<AppImg class="active_image" :src="lightboxImage = activeImage" :key="lightboxImage" :width="3000" :height="6000"/>
				<Icon class="prev" @click="prev()" name="IconArrow" />
				<Icon class="next" @click="next()" name="IconArrow" />
				<Icon class="close" @click="Close" name="IconClose" />
				<div class="lds-ripple"><div></div><div></div></div>
			</div>
		</div>
		<AppImg class="active_image" :src="activeImage" @click="Open(activeImage)" :width="250" :height="500" />
		<div class="icon_full_screen" @click="isOpen = true">
			<Icon name="IconOpenFullScreen" />
		</div>
		<div class="slider">
			<AppImg v-for="(image, i) in gallery" :key="image+i" :class="{ active: image == activeImage }" :src="image" @click="activeImage = image" :width="100" :height="100" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.image_slider {
	width: 100%;
	max-width: 500px;
	height: 600px;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	.active_image {
		width: 100%;
		max-width: 250px;
		&:hover {
			cursor: pointer;
		}
	}

	.icon_full_screen {
		position: absolute;
		top: 2rem;
		right: 2rem;
		opacity: 0;
		transition: opacity 0.4s linear;
		svg {
			fill: $primary;
			opacity: 0.4;
			width: 2.5rem;
			height: 2.5rem;
		}
		&:hover {
			cursor: pointer;
		}
	}
	.active_image:hover ~ .icon_full_screen {
		opacity: 1;
		cursor: pointer;
	}
	.slider {
		width: 100%;
		height: 100%;
		max-height: 100px;
		display: flex;
		justify-content: space-around;


		.image {
			opacity: 0.4;

			&.active {
				opacity: 1;
			}

			&:hover {
				cursor: pointer;
				opacity: 1;
			}
		}
	}
	.lightbox {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: $dark80;

		display: flex;
		justify-content: center;
		align-items: center;

		.wrapper {
			width: auto;
			height: 100%;
			.image {
				width: 100%;
				max-width: 1280px;
				height: 100%;
				user-select: none;
				position: relative;
				z-index: 3;
				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
			.lds-ripple {
				display: inline-block;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 1;
				width: 80px;
				height: 80px;
			}
			.lds-ripple div {
				position: absolute;
				border: 4px solid #fff;
				opacity: 1;
				border-radius: 50%;
				animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
			}
			.lds-ripple div:nth-child(2) {
				animation-delay: -0.5s;
			}
			@keyframes lds-ripple {
				0% {
					top: 36px;
					left: 36px;
					width: 0;
					height: 0;
					opacity: 0;
				}
				4.9% {
					top: 36px;
					left: 36px;
					width: 0;
					height: 0;
					opacity: 0;
				}
				5% {
					top: 36px;
					left: 36px;
					width: 0;
					height: 0;
					opacity: 1;
				}
				100% {
					top: 0px;
					left: 0px;
					width: 72px;
					height: 72px;
					opacity: 0;
				}
			}

			.icon {
				position: absolute;
				width: 3rem;
				height: 3rem;
				stroke: $white50;
				fill: none;
				transition: all 0.2s ease;
				z-index: 4;

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
				right: 2rem;
			}
		}
	}
}

@media (max-width: 1080px) {
	.image_slider {
		height: auto;
		.icon_full_screen {
			right: 1rem;
			opacity: 1;
		}
	}
}

@media (max-width: 700px) {
	.image_slider {
		.icon_full_screen {
			right: -1rem;
			svg {
				width: 2rem;
				height: 2rem;
			}
		}
	}
}
</style>