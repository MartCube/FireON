<script setup lang="ts">
import { storeToRefs } from 'pinia';

const basketStore = useBasketStore();
const { products } = storeToRefs(basketStore);

const totalProducts = computed(() => {
  return products.value.reduce((acc, product) => acc + product.count, 0);
});
</script>

<template>
	<div class="basket-qty">
    {{ totalProducts }}
	</div>
</template>

<style lang="scss" scoped>
  .basket-qty {
    background: #D6AE21;
    color: #060606;
    font-size: 0.75rem;
    border-radius: 50%;
    max-width: 1rem;
    max-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: unset;
    margin: 0;
    padding: 0;
    line-height: 1;
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
  }
</style>