<script setup lang="ts">
import { MagazineQuery } from "~~/src/queries"
import type { Magazine, Product } from "~~/src/types"

// fetch data
const { locale } = useI18n()
const { params } = useRoute()
const { data, pending } = await useSanityQuery<Magazine>(
	MagazineQuery, { uid: params.product, lang: locale.value }
)
if (!data.value) throw createError({
	statusCode: 404,
	statusMessage: `Magazine - ${params.product} Not Found`,
	fatal: true
})


const colors = data.value.colorMagazines.map((magazine) => magazine.color)
const color = ref(data.value.colorMagazines[0].color)
const gallery = ref(data.value.colorMagazines[0].gallery)
const price = ref(data.value.colorMagazines[0].price)
const count = ref(1)


// Get selected color from Color Panel
function GetColor(value: string) {
	if (!data.value) return
	color.value = value
	// update gallery and price
	for (let magazine of data.value.colorMagazines) {
		if (magazine.color == value) {
			price.value = magazine.price
			gallery.value = magazine.gallery
			break
		}
	}
}
// add to Basket Store
function AddToBasket() {
	if (!data.value) return
	const newProduct: Product = {
		name: data.value.name,
		image: gallery.value[0],
		price: price.value,
		color: color.value,
		count: count.value,
	}
	const { addProduct } = useBasketStore()
	addProduct(newProduct)
	// reset counter
	count.value = 1
}
// write metatags
</script>

<template>
	<div id="product">
		<template v-if="data && !pending">

			<div class="desktop">
				<AppLink class="go_back" to="/" hash="#magazines">
					<Icon name="IconArrow" />
				</AppLink>
				<ImageSlider :gallery="gallery" />

				<div class="wrap">
					<div class="details">
						<AppImg class="name_img" :src="data.svg" :width="420" :height="140" />
						<ul class="info">
							<li>{{ data.info.size }}</li>
							<li>{{ data.info.rem }}REM</li>
							<li>{{ data.info.blk }}BLK</li>
						</ul>
						<span class="price">
							<Icon name="IconMoney" />
							{{ price }} ГРН
						</span>
					</div>
					<ColorPanel :title="data.colorTitle" :colors="colors" @color="GetColor" />
					<RichText class="description" :blocks="data.description" />
					<div class="to_basket">
						<CounterBtn :data="count" @dec="count--" @inc="count++" />
						<AppBtn :value="data.button" @click="AddToBasket()" />
					</div>
				</div>
			</div>

			<div class="mobile">
				<div class="details">
					<AppImg class="name_img" :src="data.svg" :width="420" :height="140" />
					<ul class="info">
						<li>{{ data.info.size }}</li>
						<li>{{ data.info.rem }}REM</li>
						<li>{{ data.info.blk }}BLK</li>
					</ul>
				</div>
				<ImageSlider :gallery="gallery" />
				<div class="price">
					<span>
						<Icon name="IconMoney" />{{ price }} ГРН
					</span>
				</div>
				<ColorPanel :title="data.colorTitle" :colors="colors" @color="GetColor" />
				<RichText class="description" :blocks="data.description" />
				<div class="to_basket">
					<CounterBtn :data="count" @dec="count--" @inc="count++" />
					<AppBtn :value="data.button" @click="AddToBasket()" />
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

	.desktop {
		width: inherit;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;

		.go_back {
			z-index: 2;
			position: absolute;
			top: 2rem;
			left: 0;

			.icon {
				width: 3rem;
				height: 3rem;
				stroke: $primary30;
				fill: none;
				transform: rotate(180deg);


			}

			&:hover .icon {
				stroke: $primary;
			}

		}

		.wrap {
			width: 50%;
			height: max-content;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.details {
				width: 100%;
				display: flex;
				// justify-content: space-between;
				align-items: center;

				.name_img {
					width: 40%;
					margin-right: 4rem;
					position: relative;

					&::after {
						content: '';
						position: absolute;
						top: 0;
						right: -2rem;

						width: 1px;
						height: 100%;
						opacity: 0.35;
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
				width: 100%;
				margin-top: 2rem;
				display: flex;

				.counter_btn {
					margin-right: 2rem;
				}
			}
		}
	}

	.mobile {
		width: inherit;
		display: none;
		flex-direction: column;
		align-items: center;

		.go_back {
			display: none;
		}

		.details {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.name_img {
				width: 50%;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					top: 0;
					right: -20%;

					width: 1px;
					height: 100%;
					opacity: 0.35;
					background: linear-gradient(0, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
				}
			}

			.info {
				list-style: none;

				li {
					text-transform: uppercase;
					font-size: 14px;
					line-height: 24px;
					color: $white50;
				}
			}
		}

		.price {
			width: 100%;
			position: relative;

			span {
				position: absolute;
				top: 2rem;
				right: 0;
				color: $primary;
				font-size: 1rem;

				.icon {
					width: 1.5rem;
					height: 1.5rem;
					margin-right: 1rem;
				}
			}

		}

		.to_basket {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.counter_btn {
				margin: 2rem 0;
			}
		}
	}
}

@media (max-width: 1080px) {
	#product {
		.mobile {
			display: flex;
		}

		.desktop {
			display: none;
		}
	}
}
</style>
