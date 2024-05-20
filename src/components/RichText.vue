<template>
	<div class="rich_text">
		<SanityContent :blocks="blocks" :serializers="serializers"/>
	</div>
</template>

<script setup lang="ts">
defineProps<{ blocks: any[] }>()

const serializers = {
	types: {
		youtube: resolveComponent('Youtube'),
	},
}
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
		margin-bottom: 1rem;
		color: $white30;

		font-size: 12px;
		line-height: 1.25rem;


		&:last-of-type {
			margin-bottom: 0;
		}
	}
}

@media (max-width: 800px) {
	.rich_text {
		p {
			font-size: 11px;
			line-height: 19px;
		}
	}
}
</style>