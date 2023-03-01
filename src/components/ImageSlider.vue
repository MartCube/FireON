<script setup lang="ts">
const props = defineProps<{ gallery: string[] }>()

const galleryRef = toRef(props, 'gallery')
const activeImage = ref(props.gallery[0])
watch(galleryRef, (a, b) => activeImage.value = props.gallery[0])
</script>

<template>
	<div class="image_slider">
		<AppImg class="active_image" :src="activeImage" :key="activeImage" :width="250" :height="500" />
		<div class="slider">
			<AppImg v-for="image in gallery" :class="{ active: image == activeImage }" :src="image" @click="activeImage = image" :width="100" :height="100" />
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