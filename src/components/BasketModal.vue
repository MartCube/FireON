<script setup lang="ts">
import { storeToRefs } from 'pinia'


const { products, totalPrice } = storeToRefs(useBasketStore())



</script>

<template>
	<div id="basket">
		<h2>кошик</h2>
		<div class="products">
			<div class="product" v-for="product in products" :key="product.name">
				<SanityImage :src="product.image" :width="200" />
				<span>{{ product.name }}</span>
				<span>{{ product.color }}</span>
				<CounterBtn :data="product.count" />
				<span>{{ product.price * product.count }}</span>
			</div>
		</div>
		<div class="total_price">
			Сума: {{ totalPrice }} ГРН
		</div>
	</div>
</template>


<style lang="scss" scoped>
#basket {
	width: 34.5rem;
	min-height: 20rem;

	padding: 2.6rem;
	border: 1px solid $primary;
	background: $dark;

	z-index: 5;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;

	.product {
		display: flex;

		.image {
			width: 4.5rem;
		}
	}
}
</style>
