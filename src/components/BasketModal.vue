<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'

const { showModal, products, totalPrice } = storeToRefs(useBasketStore())
const { toggleModal } = useBasketStore()

const basketRef = ref()
onClickOutside(basketRef, () => toggleModal())
</script>

<template>
	<div v-if="showModal" id="basket" ref="basketRef">
		<IconClose class="close" @click="toggleModal()" />
		<h2>кошик</h2> <!-- i18n  -->
		<div class="products">
			<div class="product" v-for="product in products" :key="product.name">
				<SanityImage :src="product.image" :width="200" />
				<div class="info">
					<span>{{ product.name }}</span>
					<div class="color" :style="{ background: `#${product.color.hexcode}` }" />
				</div>
				<CounterBtn :data="product.count" @dec="product.count--" @inc="product.count++" />
				<span class="price">{{ product.price * product.count }}</span>
			</div>
		</div>
		<p class="total_price">
			Сума: <span>{{ totalPrice }} ГРН</span><!-- i18n  -->
		</p>
	</div>
</template>

<style lang="scss" scoped>
#basket {
	width: 34.5rem;
	min-height: 20rem;
	padding: 2.6rem;
	border: 1px solid $white10;
	background: $dark;

	position: fixed;
	z-index: 5;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

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
					transform: skew(-15deg);

				}
			}

			.counter_btn {
				max-width: 7.5rem;
			}

			.price {
				text-align: right;
				min-width: 3rem;
				height: min-content;
			}

			&:last-of-type {
				border: none;
			}
		}
	}

	.total_price {
		margin-top: 1rem;
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
</style>
