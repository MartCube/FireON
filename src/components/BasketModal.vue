<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'

const { showModal, products, totalPrice } = storeToRefs(useBasketStore())
const { toggleModal, removeProduct } = useBasketStore()

const basketRef = ref()
onClickOutside(basketRef, () => toggleModal())
</script>

<template>
	<div class="overlay" v-if="showModal">
		<div id="basket" ref="basketRef">
			<IconClose class="close" @click="toggleModal()" />
			<h2>кошик</h2> <!-- i18n  -->

			<template v-if="products.length">
				<div class="products">
					<div class="product" v-for="product in products" :key="product.name">
						<AppImg :src="product.image" :width="150" :height="150" />
						<div class="info">
							<span>{{ product.name }}</span>
							<div class="color" :style="{ background: `#${product.color.hexcode}` }" />
						</div>
						<CounterBtn :data="product.count" @dec="product.count--" @inc="product.count++" />
						<span class="price">{{ product.price * product.count }}</span>
						<Icon class="removeProduct" @click="removeProduct(product)" name="IconClose" />
					</div>
				</div>
				<p class="total_price">
					Сума: <span>{{ totalPrice }} ГРН</span><!-- i18n  -->
				</p>
				<CheckoutForm />
			</template>

			<template v-else>
				<p>There are no items in your basket.</p> <!-- i18n  -->
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.overlay {
	z-index: 9;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: $dark80;

	#basket {
		width: 35rem;
		max-height: calc(100vh - 8rem);
		padding: 2.6rem;
		border: 1px solid $white10;
		background: $dark;
		overflow: auto;

		position: fixed;
		z-index: 9;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);

		display: flex;
		flex-direction: column;

		h2 {
			margin-bottom: 1rem;
		}

		.products {
			width: 100%;
			display: flex;
			flex-direction: column;

			.product {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.5rem 0;
				border-bottom: 1px solid $white10;
				position: relative;

				.image {
					width: 4.5rem;
				}

				.info {
					display: flex;
					// flex-direction: column;
					align-items: center;

					span {
						font-size: 14px;
						font-weight: 400;
						line-height: 1.5rem;
					}

					.color {
						margin-left: 1rem;
						width: 1rem;
						height: 1rem;
						border: 1px solid $white20;
						transform: skew(-10deg);

					}
				}

				.counter_btn {
					width: 120px;
				}

				.price {
					text-align: right;
					min-width: 3rem;
					height: min-content;
				}

				.removeProduct {
					position: absolute;
					top: 0;
					right: 0;
					width: 2rem;
					height: 2rem;
					padding: 0.5rem;
					stroke: $white50;
					opacity: 0;
					transition: all 0.2s linear;

					&:hover {
						cursor: pointer;
						stroke: $primary;
					}

					&:active {
						stroke: $primary;
					}
				}

				&:hover {
					.removeProduct {
						opacity: 1;
					}
				}

				&:last-of-type {
					border: none;
				}
			}
		}

		.total_price {
			margin: 2rem 0;
			align-self: flex-end;

			color: $white50;
			text-transform: uppercase;
			font-size: .75rem;
			line-height: 1.25rem;

			span {
				color: $primary;
				font-size: 1rem;
				line-height: 1.7rem;
			}
		}

		.close {
			position: absolute;
			top: 1rem;
			right: 1rem;
			stroke: $white30;

			&:hover {
				cursor: pointer;
				stroke: $primary;
			}
		}
	}
}

@media (max-width: 800px) {
	.overlay {
		#basket {
			width: 100%;

			.products {
				.product {
					.removeProduct {
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>
