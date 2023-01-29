<script setup lang="ts">
import { MagazineQuery } from "~~/src/queries"
import type { Magazine, Product } from "~~/src/types"

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


let product: Product = {
	name: data.value!.name,
	image: data.value!.gallery[0],
	price: data.value!.price,
	color: data.value!.colors[0].name,
	count: 1,
}
function GetColor(value: string) {
	product.color = value
}
function GetCount(value: number) {
	product.count = value
}
// component refs to call exposed reset()
const colors = ref()
const counter = ref()
function AddToBasket() {
	// add to BasketStore
	const { addProduct } = useBasketStore()
	addProduct(product)


	// reset values
	product = {
		name: data.value!.name,
		image: data.value!.gallery[0],
		price: data.value!.price,
		color: data.value!.colors[0].name,
		count: 1,
	}
	colors.value.reset()
	counter.value.reset()
}


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
						ГРН <!-- i18n -->
					</span>
				</div>
				<BoxColors ref="colors" :data="data.colors" @color="GetColor" />
				<div class="description">
					<h4>Характеристики</h4> <!-- i18n const -->
					<RichText :blocks="data.description" />
				</div>
				<div class="btn_group">
					<CounterBtn ref="counter" :data="1" @count="GetCount" />
					<AppBtn value="у кошик" @click="AddToBasket()" /><!--  i18n const -->
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

		.btn_group {
			width: 25rem;
			margin-top: 2rem;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
