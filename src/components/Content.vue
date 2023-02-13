<template>
	<div class="content">
		<template v-if="content && !pending">
			<SanityContent :blocks="content" :serializers="serializers" />
		</template>
	</div>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'
import { storeToRefs } from 'pinia'

const { content, pending } = storeToRefs(useAppStore())

const serializers = {
	types: {
		// page content ###  Lazy load ?
		intro: resolveComponent('LazyBlockIntro'),
		features: resolveComponent('LazyBlockFeatures'),
		magazines: resolveComponent('LazyBlockMagazines'),
		cta: resolveComponent('LazyBlockCta'),
		techSpecs: resolveComponent('LazyBlockTechSpecs'),
		about: resolveComponent('LazyBlockAbout'),
		gallery: resolveComponent('LazyBlockGallery'),
		partners: resolveComponent('LazyBlockPartners'),
		contact: resolveComponent('LazyBlockContact'),

	},
	// marks: {
	// 	link: Link,
	// },
}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	min-height: 100vh;
	// .v-enter-active,
	// .v-leave-active {
	// 	transition: all .35s ease;
	// }

	// .v-enter-from,
	// .v-leave-to {
	// 	opacity: 0
	// }
}
</style>