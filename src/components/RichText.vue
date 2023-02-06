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
		line-height: 1.25rem;
		color: $white30;
		margin: 0 0 0.35rem 1rem;
	}

	p {
		max-width: 32rem;
		margin-bottom: 2rem;
		color: $white50;

		font-size: .875rem;
		line-height: 1.8125rem;

		&:last-of-type {
			margin-bottom: 0;
		}
	}
}
</style>