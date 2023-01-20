<template>
	<div class="logo">
		<nuxt-img v-if="src" :src="src" provider="sanity" width="280" height="48" loading="lazy" />
	</div>
</template>

<script setup lang="ts">
defineProps<{ src: string | null }>()
</script>

<style lang="scss" scoped>
.logo {
	width: 140px;
	height: 24px;
	display: flex;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>