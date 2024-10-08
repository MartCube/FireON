<script setup lang="ts">
import { onKeyStroke, onClickOutside } from '@vueuse/core'

const props = defineProps<{ 
	gallery: string[] 
}>()

const galleryRef = toRef(props, 'gallery')
const activeIndex = ref(0)
const activeImage = ref(galleryRef.value[0])

// when gallery change
watch(galleryRef, () => {
	activeIndex.value = 0
	activeImage.value = props.gallery[0]
})


// lightbox
const lightboxToggle = ref(false) // toggle lightbox
const lightbox = ref(null)	// lightbox ref


function UpdateActiveImage(index: number,image: string){
	activeIndex.value = index
	activeImage.value = image
}
function Next(){
	activeIndex.value++
	activeImage.value = galleryRef.value[activeIndex.value]
}
function Prev(){
	activeIndex.value--
	activeImage.value = galleryRef.value[activeIndex.value]
}

// onKeyStroke
onKeyStroke(['Escape', 'ArrowLeft', 'ArrowRight'], (e: KeyboardEvent) => {
	if (!lightboxToggle.value) return
	switch (e.key) {
		case 'Escape':
			lightboxToggle.value = false
			break
		case 'ArrowLeft':
			if( activeIndex.value <= 0 ) break
			Prev()
			break
		case 'ArrowRight':
			if( activeIndex.value >= galleryRef.value.length-1 ) break
			Next()
			break
	}
})
// close lightbox
onClickOutside(lightbox, (event) => {
	lightboxToggle.value = false
})
</script>

<template>
	<div class="image_slider">
		<div class="lightbox" v-if="lightboxToggle">
			<div class="wrapper" ref="lightbox">
				<AppImg class="active_image" 
					:src="activeImage" 
					:width="3000" 
					:height="6000"
				/>
				<Icon 
					:class="['prev', { disabled: activeIndex <= 0 }]"
					name="IconArrow" 
					@click="Prev()" 
				/>
				<Icon 
					:class="['next', { disabled: activeIndex >= galleryRef.length-1 }]" 
					name="IconArrow"  
					@click="Next()"  
				/>
				<Icon class="close" name="IconClose" @click="lightboxToggle = false"  />
				<div class="lds-ripple"><div></div><div></div></div>
			</div>
		</div>
		<AppImg class="active_image active_image_not_lightbox"
			:src="activeImage" 
			:width="500" 
			:height="500"
			@click="lightboxToggle = true" 
		/>
		<div class="icon_full_screen" 
			@click="lightboxToggle = true"
		>
			<Icon name="IconOpenFullScreen" />
		</div>
		<AppLink class="go_back" to="/" hash="#magazines">
			<Icon name="IconArrow" />
		</AppLink>
		<div class="slider">
			<AppImg 
				v-for="(image, index) in gallery" 
				:class="[{ active: image == activeImage }, 'product-image-slider-thumb']"
				:key="image+index"  
				:src="image"
				:width="100" 
				:height="100"
				@click="UpdateActiveImage(index, image)" 
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.image_slider {
	width: 100%;
	max-width: 31.25rem;
	height: 37.5rem;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	align-self: start;

	

	.active_image {
		width: 100%;
		height: auto;
		max-width: 28.125rem;
		max-height: 28.125rem;
		object-fit: contain;
		margin-bottom: 5rem;

		&:hover {
			cursor: pointer;
		}
	}

  .active_image_not_lightbox {
    filter: drop-shadow(0px 0px 40px rgba(214, 174, 33, 75%));
  }

	.icon_full_screen {
		position: absolute;
		top: 2.5rem;
		right: 2.5rem;
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
	.go_back {
		z-index: 2;
		position: absolute;
		top: 2rem;
		left: 0;

		.icon {
			width: 3rem;
			height: 3rem;
			stroke: $primary30;
			fill: none;
			transform: rotate(180deg);
		}

		&:hover .icon {
			stroke: $primary;
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
      //filter: drop-shadow(0px 0px 40px rgba(214, 174, 33, 50%));
      min-width: 4.25rem;
      min-height: 6.25rem;

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
		z-index: 10;
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
				max-height: 100%;
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

			.disabled{
				display: none;
			}
		}
	}
}

@media (max-width: 1080px) {
	.image_slider {
		height: auto;
		.icon_full_screen {
			opacity: 1;
		}
		.active_image {
			margin: 3rem 0 4rem;
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
		.lightbox .wrapper {
			.image {
				max-width: initial;
			}
		} 
	}
}
</style>