<template>
	<div class="rich_text">
		<SanityContent :blocks="blocks" />
	</div>
</template>

<script setup lang="ts">
defineProps<{ blocks: any[] }>()
</script>
