<script setup lang="ts">
import type { Color } from "~~/src/types"

const props = defineProps<{ data: Color[] }>()
const activeColor = ref(props.data[0].name) // first color as default

defineEmits<{ (e: 'color', color: string): void }>()

function reset() {
	activeColor.value = props.data[0].name
}

defineExpose({ reset })
</script>

<template>
	<div class="colors">
		<h4>Виберіть колір</h4> <!-- i18n const -->
		<label v-for="(color, i) in data" :key="color.name" @click="$emit('color', color.name)" class="color">
			<input v-model="activeColor" :value="color.name" :style="{ background: `#${color.hexcode}` }" name="color" type="radio" />
			{{ color.name }}
		</label>
	</div>
</template>

<style lang="scss" scoped>
.colors {
	.color {
		width: fit-content;
		height: 1.25rem;
		margin-bottom: 7px;

		text-transform: uppercase;
		font-size: 12px;
		line-height: 20px;
		color: $white50;


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

		&:hover {
			cursor: pointer;
			color: $white;
		}
	}
}
</style>