<script setup lang="ts">
defineProps<{ value: string | undefined }>()
</script>

<template>
	<button class="AppBtn">
		<span>{{ value }}</span>
	</button>
</template>

<style lang="scss" scoped>
.AppBtn {
	width: 200px;
	height: 50px;

	border: none;
	background: $primary;
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
		color: $dark;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.7rem;
	}

	&:hover {
		background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #D6AE21;
		;
	}

	&:active {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #D6AE21;
	}

}
</style>