<template>
	<div class="youtube">
		<div
			v-if="!showFrame"	
			class="image" 
			@click="showFrame=true"
		>
			<img :src="img"  lazyloadloading="lazy" />
			<Icon name="IconYoutube" />	
		</div>
		<iframe 
			v-if="showFrame" 
			:src="src" 
			frameborder="0" 
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string;
}>()
// http://www.get-youtube-thumbnail.com/
const src = `https://www.youtube.com/embed/${props.id}?autoplay=1`
const img = `https://i3.ytimg.com/vi/${props.id}/maxresdefault.jpg`
const showFrame = ref(false)
</script>

<style lang="scss" scoped>
.youtube {
	margin-top: 2rem;
	width: 100%;
	max-width: 31.25rem;
	height: 280px;

	.image{
		position: relative;
		img{
			width: 100%;
			height: 100%;
			filter: brightness(50%);
			cursor: pointer;
		}
		.icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 3.5rem;
			height: 3.5rem;
			stroke: $primary;
			fill: none;
		}
	}
	iframe {
		width: 100%;
		height: 100%;
	}
}
</style>