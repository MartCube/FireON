<template>
	<div class="image">
		<!-- format="auto" -->
		<SanityImage :asset-id="src" :w="width" :h="height">
			<template #default="{ src }">
				<img v-lazy="src" :width="width" :height="height" />
			</template>
		</SanityImage>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	src: string,
	width: number,
	height: number,
}>()
</script>

<style lang="scss" scoped>
.image {

	// width: v-bind(width);
	// height: v-bind(height);
	display: flex;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;

		outline: none;
		border: none;
		opacity: 0;

		// image transition 
		&[lazy=loading] {
			opacity: 0;
		}

		&[lazy=error] {
			opacity: 0;
		}

		&[lazy=loaded] {
			opacity: 1;
			transition: all 1s cubic-bezier(0.215, 0.61, 0.355, 1);
		}
	}
}
</style>