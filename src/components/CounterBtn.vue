<script setup lang="ts">
import { useCounter } from '@vueuse/core'

const props = defineProps<{ data: number }>()
const { count, inc, dec, reset } = useCounter(props.data, { min: 1, max: 100 })

defineEmits<{ (e: 'count', count: number): void }>()
defineExpose({ reset })
</script>

<template>
	<button class="btn">
		<span class="dec" @click="$emit('count', dec())">-</span>
		<span class="count">{{ count }}</span>
		<span class="inc" @click="$emit('count', inc())">+</span>
	</button>
</template>

<style lang="scss" scoped>
.btn {
	width: 100%;
	max-width: 120px;
	height: 50px;
	border: 1px solid $white30;
	background: transparent;
	transform: skew(-15deg);
	cursor: pointer;
	user-select: none;

	display: flex;
	justify-content: space-around;
	align-items: center;

	span {
		z-index: 2;
		transform: skew(15deg);

		text-transform: uppercase;
		color: $white30;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.7rem;

		&.count {
			color: $white;
		}

		&.dec,
		&.inc {
			padding: 0.5rem 1.5rem;
			font-size: 1rem;

		}

		&:hover {
			color: $primary;
		}


	}





}
</style>