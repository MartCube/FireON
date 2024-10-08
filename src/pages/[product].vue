<script setup lang="ts">
import { MagazineQuery } from "~~/src/queries"
import type { Magazine, Product } from "~~/src/types"
import {storeToRefs} from "pinia";

// fetch data
const { productGalleryBg } = storeToRefs(useAppStore())

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
const count = ref(1)
const priceInHtml = ref(data.value.colorMagazines[0].price)

// first colorMagazine is active
const activeColorMagazine = ref(data.value.colorMagazines[0])
const color = ref(data.value.colorMagazines[0].color)


// Get selected color from Color Panel
function GetColor(value: string) {
	if (!data.value) return
	color.value = value
	// update gallery and price
	for (let magazine of data.value.colorMagazines) {
		if (magazine.color == value) {
			activeColorMagazine.value = magazine
			break
		}
	}
}
// add to Basket Store
function AddToBasket() {
	if (!data.value) return
	const newProduct: Product = {
		name: data.value.name,
		image: activeColorMagazine.value.gallery[0],
		price: activeColorMagazine.value.price,
		color: color.value,
		count: count.value,
		sku: activeColorMagazine.value.sku
	}
	const { addProduct } = useBasketStore()
	addProduct(newProduct)
	// reset counter
	count.value = 1
  priceInHtml.value = activeColorMagazine.value.price
}
// write metatags

function handleIncrement() {
  count.value++
  priceInHtml.value = (activeColorMagazine.value.price * count.value)
}

function handleDecrement() {
  count.value--
  priceInHtml.value = (activeColorMagazine.value.price * count.value)
}
</script>

<template>
	<div id="product">
    <AppImg v-if="productGalleryBg" class="product-gallery-bg" :src="productGalleryBg" />
		<template v-if="data && !pending">

			<div class="desktop">
				<ImageSlider :gallery="activeColorMagazine.gallery" />
				<div class="wrap">
					<div class="details">
						<AppImg class="name_img" :src="data.svg" :width="420" :height="140" />
						<ul class="info">
							<li>{{ data.info.size }}</li>
							<li v-if="data.info.rem">{{ data.info.rem }}</li>
							<li v-if="data.info.blk">{{ data.info.blk }}</li>
						</ul>
					</div>
					<ColorPanel :title="data.colorTitle" :colors="colors" @color="GetColor" />

					<div v-if="activeColorMagazine.isProductActive && color" class="to_basket">
            	<span class="price">
							<Icon name="IconMoney" />
							{{ priceInHtml }} {{ locale === 'ua' ? 'грн' : 'uah' }}
						</span>
						<CounterBtn :data="count" @dec="handleDecrement" @inc="handleIncrement" />
						<AppBtn :value="data.button" @click="AddToBasket()" />
					</div>
					<div v-else class="not_available">
						<AppBtn :value="locale === 'ua' ? 'Незабаром': 'Unvailable'"/>
					</div>

					<RichText class="description" :blocks="data.description" />
				</div>
			</div>

			<div class="mobile">
				
				<div class="details">
					<AppImg class="name_img" :src="data.svg" :width="420" :height="140" />
					<ul class="info">
						<li>{{ data.info.size }}</li>
						<li>{{ data.info.rem }}</li>
						<li>{{ data.info.blk }}</li>
					</ul>
				</div>
				<ImageSlider :gallery="activeColorMagazine.gallery" />
				<ColorPanel :title="data.colorTitle" :colors="colors" @color="GetColor" />
				
				<div v-if="activeColorMagazine.isProductActive && color" class="to_basket">
          <div class="price">
            <span>
              <Icon name="IconMoney" />{{ priceInHtml }} {{ locale === 'ua' ? 'грн' : 'uah' }}
            </span>
          </div>
					<CounterBtn :data="count" @dec="handleDecrement" @inc="handleIncrement" />
					<AppBtn :value="data.button" @click="AddToBasket()" />
				</div>
				<div v-else class="not_available">
					<AppBtn :value="locale === 'ua' ? 'Незабаром' : 'Unvailable'"/>
				</div>

				<RichText class="description" :blocks="data.description" />
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
  position: relative;

  .product-gallery-bg {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    max-height: 100%;
  }

	.desktop {
		width: inherit;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;

		

		.wrap {
			width: 50%;
			height: max-content;

			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 2rem;

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
						font-size: 1rem;
						line-height: 1.6875rem;
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
				display: flex;
        align-items: center;

        .price {
          margin-right: 2rem;
          min-width: fit-content;
          color: $primary;
        }

				.counter_btn {
					margin-right: 2rem;
				}
			}
		}

		.not_available {
			padding: 2rem 0 1rem 0;
		}
	}

	.mobile {
		width: inherit;
		display: none;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		
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
      width: fit-content;
			position: relative;

			span {
				//position: absolute;
				//top: 2rem;
				//right: 0;
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

		.not_available {
			padding: 2rem 0 1rem 0;
		}
	}
}

@media (max-width: 1080px) {
	#product {
		.mobile {
			display: flex;
      position: relative;
		}

		.desktop {
			display: none;
		}
	}
}

@media screen and (max-width: 768px) {
  #product {

    .product-gallery-bg {
      height: 100%;
      object-fit: cover;
    }
  }
}

</style>
