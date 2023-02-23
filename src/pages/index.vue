<template>
	<Content />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { metaTags } = storeToRefs(useAppStore())

if (metaTags.value) useMetaTags(metaTags.value)
</script>