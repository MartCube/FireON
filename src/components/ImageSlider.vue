<script setup lang="ts">
import { string } from "zod"

const props = defineProps<{ gallery: string[], openLightbox: boolean }>()

const propOpenLightbox = toRef(props, 'openLightbox')
const galleryRef = toRef(props, 'gallery')
const activeImage = ref(props.gallery[0])
watch(galleryRef, (a, b) => activeImage.value = props.gallery[0])


const isOpen = ref(false) // toggle lightbox
const lightbox = ref('')
// open lightbox
function Open(image: string) {
	isOpen.value = true
	lightbox.value = image
}
function Close() {
	isOpen.value = false
	lightbox.value = ''
	closelightbox("closelightbox", false)
}

const closelightbox = defineEmits(['closelightbox']) 
</script>

<template>
	<div class="image_slider">
		<div v-show="isOpen || propOpenLightbox" class="lightbox" >
			<div class="wrapper">
				<AppImg class="active_image" :src="lightbox = activeImage" :key="lightbox" :width="3000" :height="6000"/>
				<Icon class="close" @click="Close" name="IconClose" />
				<div class="lds-ripple"><div></div><div></div></div>
			</div>
		</div>
		<AppImg class="active_image" :src="activeImage" @click="Open(activeImage)" :width="250" :height="500" />
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
	}
}
</style>