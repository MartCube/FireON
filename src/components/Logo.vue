<script setup lang="ts">
defineProps<{ src: string }>()
const { locale } = useI18n()

</script>

<template>
	<AppLink class="logo" to="/">
		<AppImg class="magazine" :src="src" :width="280" :height="48" />
	</AppLink>
</template>

<style lang="scss" scoped>
.logo {
	width: 8.75rem;
	height: 1.5rem;
	display: flex;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>