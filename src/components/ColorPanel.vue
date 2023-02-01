<script setup lang="ts">
import type { Color } from "~~/src/types"

const props = defineProps<{ data: Color[] }>()
const activeColor = ref(props.data[0].name) // first color as default

defineEmits<{ (e: 'color', color: Color): void }>() // emit selected color

function reset() {
	activeColor.value = props.data[0].name
}
defineExpose({ reset })
</script>

<template>
	<div class="panel">
		<h4>Виберіть колір</h4> <!-- i18n const -->
		<label class="color" v-for="color in data" :key="color.name" @click="$emit('color', color)">
			<input v-model="activeColor" :value="color.name" :style="{ background: `#${color.hexcode}` }" name="color" type="radio" />
			{{ color.name }}
			<Icon name="IconCheck" />

		</label>
	</div>
</template>

<style lang="scss" scoped>
.panel {
	display: flex;
	flex-direction: column;
	margin: 2rem 0;

	.color {
		width: fit-content;
		height: 1.25rem;
		margin-bottom: 7px;

		text-transform: uppercase;
		font-size: 12px;
		line-height: 20px;
		color: $white50;

		display: flex;
		align-items: center;

		.icon {
			margin-left: 8px;
			width: 1rem;
			height: 1rem;
			stroke: $primary;
			stroke-width: 2;
			opacity: 0;
		}

		input[type="radio"] {
			width: 1rem;
			height: 1rem;
			margin-right: 1rem;

			appearance: none;
			transform: translateY(0.2rem)skew(-10deg);

			border: 1px solid $white10;


			&:checked {
				border-color: $primary;
			}
		}

		input[type="radio"]:checked~.icon {
			opacity: 1;
		}

		&:hover {
			cursor: pointer;
			color: $white;
		}
	}
}
</style>