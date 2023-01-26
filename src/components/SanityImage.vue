<template>
	<div class="image">
		<nuxt-img :src="src" :width="width" provider="sanity" loading="lazy" />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	src: string,
	width: number,
	// height: number,
}>()
</script>

<style lang="scss" scoped>
.image {
	width: v-bind(width);

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}
}
</style>