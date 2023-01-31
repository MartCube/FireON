<template>
	<NuxtLink class="logo" to="/">
		<AppImg class="magazine" :src="src" :width="280" :height="48" />
	</NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ src: string }>()
</script>

<style lang="scss" scoped>
.logo {
	width: 140px;
	height: 24px;
	display: flex;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>