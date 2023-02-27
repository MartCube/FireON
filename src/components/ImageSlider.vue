<script setup lang="ts">
import type { ColorGallery, Color } from "~/types"

const props = defineProps<{
	gallery: ColorGallery[]
}>()

const activeGallery = ref(props.gallery[0])
const activeImage = ref(activeGallery.value.images[0])

function setActiveGallery(color: Color) {
	props.gallery.forEach(gallery => {
		if (gallery.color.name == color.name) {
			activeGallery.value = gallery
			activeImage.value = activeGallery.value.images[0]
		}
	})
}
function reset() {
	activeGallery.value = props.gallery[0]
	activeImage.value = activeGallery.value.images[0]
}

defineExpose({ setActiveGallery, reset })
</script>

<template>
	<div class="image_slider">
		<AppImg class="active_image" :src="activeImage" :width="250" :height="500" />
		<div class="slider">
			<AppImg v-for="image in activeGallery.images" :class="{ active: image == activeImage }" :src="image" @click="activeImage = image" :width="100" :height="100" />
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
}

@media (max-width: 1080px) {
	.image_slider {
		height: auto;
	}
}
</style>