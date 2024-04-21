<template>
	<div class="youtube">
		<iframe :src="src"  frameborder="0" allowfullscreen></iframe>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string;
}>()
// http://www.get-youtube-thumbnail.com/
const src = `https://www.youtube.com/embed/${props.id}`
</script>

<style lang="scss" scoped>
.youtube {
	width: 100%;
	height: 300px;
	position: relative;
	iframe {
		width: 100%;
		height: 100%;
	}
}
</style>