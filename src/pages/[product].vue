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
// Get selected color from Color Panel
function GetColor(value: Color) {
	product.color = value
}
// add to Basket Store
function AddToBasket() {
	const { addProduct, toggleModal } = useBasketStore()
	addProduct(product)
	toggleModal()	//show

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

			<ImageSlider :list="data.gallery" />
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
						{{ data.price }} ГРН <!-- i18n -->
					</span>
				</div>
				<ColorPanel :data="data.colors" @color="GetColor" ref="ColorPanelRef" />
				<div class="description">
					<h4>Характеристики</h4> <!-- i18n -->
					<RichText :blocks="data.description" />
				</div>
				<div class="to_basket">
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
		top: 5%;
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

	.image_slider {
		width: 31.25rem;
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
			// justify-content: space-between;
			align-items: center;

			.name {
				width: 330px;
				height: 109px;
				position: relative;

				margin-right: 4rem;

				&::after {
					content: '';
					position: absolute;
					top: 0;
					right: -2rem;

					width: 2px;
					height: 100%;
					opacity: 0.8;
					background: linear-gradient(0, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
				}
			}

			.info {
				list-style: none;

				li {
					text-transform: uppercase;
					font-size: 16px;
					line-height: 27px;
					color: $white50;


				}
			}

			.price {
				flex: 1;

				color: $primary;
				text-align: end;
				line-height: 2rem;

				.icon {
					width: 1.5rem;
					height: 1.5rem;
				}
			}
		}

		.description {
			width: 100%;
		}

		.to_basket {
			width: 25rem;
			margin-top: 2rem;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
