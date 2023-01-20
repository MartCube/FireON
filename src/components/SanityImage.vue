<template>
	<div>
		<nuxt-img provider="sanity" :src="src" width="640" height="360" loading="lazy" />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	src: string,
}>()
</script>

<style scoped>

</style>