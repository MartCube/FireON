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
</script>

<template>
	<div class="product">
		<template v-if="data && !pending">
			<div class="gallery">
				<SanityImage :src="data.gallery[0]" :width="300" />
			</div>
			<div class="wrap">
				<div class="details">
					<h1 class="name">{{ data.name }}</h1>
					<ul class="info">
						<li>{{ data.info.size }}</li>
						<li>{{ data.info.rem }}REM</li>
						<li>{{ data.info.blk }}BLK</li>
					</ul>
					<span class="price">
						<Icon name="IconMoney" />
						{{ data.price }}
						ГРН <!-- get currency from store -->
					</span>
				</div>

				<BoxColors :data="data.colors" />

				<div class="description">
					<h3>Характеристики</h3>
					<RichText :blocks="data.description" />
				</div>
			</div>
		</template>
	</div>
</template>


<style lang="scss" scoped>
.product {
	width: 100%;
	height: 100%;
	min-height: 100vh;
	// height: calc(100vh - 8rem); // minus Navbar and Footer
	padding: 2rem 10%;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.gallery {
		width: 45%;
		max-width: 600px;

		.image {
			height: 300px;
		}
	}

	.wrap {
		width: 50%;
		height: 100%;
		max-width: 600px;

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.details {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.name {
				font-size: 100px;
				line-height: 7rem;
			}

			.info {
				list-style: none;

			}
		}

		.colors {
			display: flex;
			flex-direction: column;

		}

		.description {
			width: 100%;
		}
	}
}
</style>
