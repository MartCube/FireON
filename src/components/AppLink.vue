<script setup lang="ts">
defineProps<{
	name?: string,
	to?: string,
	hash?: string,
	query?: string,
}>()
const localePath = useLocalePath()
</script>

<template>
	<NuxtLink :to="localePath({ name, path: to, hash, query: { product: query } })">
		<span>
			<slot></slot>
		</span>
	</NuxtLink>
</template>

<style lang="scss" scoped>
.btn {
	max-width: 200px;
	height: 50px;

	border: 1px solid $primary;
	background: transparent;
	transform: skew(-10deg);
	cursor: pointer;
	user-select: none;

	display: flex;
	justify-content: center;
	align-items: center;

	span {
		z-index: 2;
		transform: skew(10deg);

		text-transform: uppercase;
		color: $primary;
		font-weight: 400;
		font-size: .875rem;
		line-height: 1.5rem;
	}

	&:hover {
		background: $primary30;
	}

	&:active {
		background: $primary50;
	}

}
</style>