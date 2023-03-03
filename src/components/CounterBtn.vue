<script setup lang="ts">
defineProps<{ data: number }>()

defineEmits<{
	(e: 'dec'): void,
	(e: 'inc'): void,
}>()
</script>

<template>
	<div class="counter_btn">
		<button class="dec" @click="$emit('dec')" :disabled="data <= 1">-</button>
		<span class="count">{{ data }}</span>
		<button class="inc" @click="$emit('inc')" :disabled="data >= 99">+</button>
	</div>
</template>

<style lang="scss" scoped>
.counter_btn {
	width: 200px;
	height: 50px;
	border: 1px solid $white30;
	transform: skew(-10deg);
	user-select: none;

	display: flex;
	justify-content: space-around;
	align-items: center;

	.dec,
	.inc,
	.count {
		padding: 0.5rem 1.5rem;
		transform: skew(10deg);
		border: none;
		background: transparent;

		text-transform: uppercase;
		color: $white30;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.7rem;

		&.count {
			color: $white;
			padding: 0;
		}

		&:hover {
			cursor: pointer;
			color: $primary;

			&.count {
				cursor: initial;
				color: $white;
			}

			&:disabled {
				cursor: initial;
				color: $white30;
			}
		}
	}


}
</style>