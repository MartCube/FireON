<script setup lang="ts">
import { MagazineQuery } from "~~/src/queries"
import type { Magazine, Product, Color } from "~~/src/types"

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

// initial product
let product: Product = {
	name: data.value!.name,
	image: data.value!.gallery[0],
	price: data.value!.price,
	color: data.value!.colors[0],
	count: 1,
}
// component refs to call exposed reset()
const ColorPanelRef = ref()
const CounterBtnRef = ref()
const { toggleModal } = useBasketStore()
// Get selected color from Color Panel
function GetColor(value: Color) {
	product.color = value
}
// add to Basket Store
function AddToBasket() {
	const { addProduct } = useBasketStore()
	addProduct(product)	// add to Basket Store
	toggleModal()	// open Basket Modal

	// reset values
	product = {
		name: data.value!.name,
		image: data.value!.gallery[0],
		price: data.value!.price,
		color: data.value!.colors[0],
		count: 1,
	}
	ColorPanelRef.value.reset()
	CounterBtnRef.value.reset()
}
// write metatags
</script>

<template>
	<div id="product">
		<template v-if="data && !pending">
			<NuxtLink class="go_back" to="/#magazines">
				<Icon name="IconArrow" />
			</NuxtLink>

			<div class="gallery">
				<AppImg :src="data.gallery[0]" :width="300" :height="300" />
			</div>

			<div class="wrap">

				<div class="details">
					<AppImg class="name" :src="data.svg" :width="420" :height="140" />

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
				<ColorPanel :data="data.colors" @color="GetColor" ref="ColorPanelRef" />
				<div class="description">
					<h4>Характеристики</h4> <!-- i18n const -->
					<RichText :blocks="data.description" />
				</div>
				<div class="btn_group">
					<CounterBtn :data="product.count" @dec="product.count--" @inc="product.count++" ref="CounterBtnRef" />
					<!--  i18n const -->
					<AppBtn value="у кошик" @click="AddToBasket()" />
				</div>
			</div>
		</template>
	</div>
</template>


<style lang="scss" scoped>
#product {
	width: 100%;
	height: 100%;
	min-height: 100vh;
	padding: 2rem 10%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;

	.go_back {
		z-index: 2;
		position: absolute;
		top: 5rem;
		left: 10%;

		.icon {
			width: 3rem;
			height: 3rem;
			stroke: $primary30;
			transform: rotate(180deg);


		}

		&:hover .icon {
			stroke: $primary;
		}

	}

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
				width: 220px;
				height: 72px;
			}

			.info {
				list-style: none;

			}
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
