<script setup lang="ts">
import { ColorWord } from "~/assets/types"

interface partner {
	name: string,
	link: string,
	image: string,

}

defineProps<{
	title: string,
	list: partner[],
}>()
</script>

<template>
	<section>features</section>
</template>