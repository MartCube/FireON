<template>
	<div class="rich_text">
		<SanityContent :blocks="blocks" />
	</div>
</template>

<script setup lang="ts">
defineProps<{ blocks: any[] }>()
</script>

<style lang="scss">
.rich_text {
	ul li {
		font-size: 12px;
		font-weight: 1.25rem;
		color: $white30;
		margin-bottom: 0.35rem;
	}
}
</style>