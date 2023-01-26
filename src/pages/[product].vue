<script setup lang="ts">
import { MagazineQuery } from "~~/src/queries"
import type { Magazine } from "~~/src/types"

// fetch data
const { params } = useRoute()
const { fetch } = useSanity()
const { data, pending } = await useAsyncData(
	`Magazine - ${params.product}`,
	(): Promise<Magazine> => fetch(MagazineQuery, { uid: params.product })
)

// handle error
if (!data.value) throw createError({
	statusCode: 404,
	statusMessage: `Magazine - ${params.product} Not Found`,
	fatal: true
})

// write metatags
// useMetaTags(data.value.metaTags)
</script>

<template>
	<div class="product">
		<template v-if="data && !pending">
			<div class="gallery">
				gallery
			</div>
			<div class="wrap">
				info
			</div>
		</template>
	</div>
</template>


<style lang="scss" scoped>
.product {
	width: 100%;
	height: 100%;
	min-height: 100vh;

	display: flex;
}
</style>
