<script setup lang="ts">
const props = defineProps<{ list: string[] }>()

const activeImg = ref(props.list[0])
</script>

<template>
	<div class="image_slider">
		<AppImg class="active_image" :src="activeImg" :width="500" :height="500" />
		<div class="slider">
			<AppImg v-for="image in list" :class="{ active: image == activeImg }" :src="image" @click="activeImg=image" :width="100" :height="100" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.image_slider {
	width: 100%;
	max-width: 500px;

	.active_image {
		width: 100%;
		height: 100%;
		margin: 2rem 0;
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
</style>