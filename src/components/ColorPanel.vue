<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { colors, newProductColor } = storeToRefs(useProductStore())
</script>

<template>
	<div class="panel">
		<template v-if="colors">
			<h4>{{ colors.title }}</h4>
			<label class="color" v-for="color in colors.list">
				<input @click="newProductColor = color" v-model="newProductColor.name" :value="color.name" :style="{ background: `#${color.hexcode}` }" type="radio" />
				<span class="name">{{ color.name }}</span>
				<Icon name="IconCheck" />
			</label>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.panel {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 2rem 0;

	.color {
		width: fit-content;
		height: 1.25rem;
		margin-bottom: 7px;

		display: flex;
		align-items: center;
		justify-content: center;

		.icon {
			margin-left: 8px;
			width: 1rem;
			height: 1rem;
			stroke: $primary;
			stroke-width: 2;
			opacity: 0;
		}

		.name {
			color: $white50;
			text-transform: uppercase;
			font-size: 12px;
			line-height: 16px;
		}

		input[type="radio"] {
			width: 1rem;
			height: 1rem;
			margin-right: 1rem;

			appearance: none;
			transform: skew(-10deg);

			border: 1px solid $white10;

			&:checked {
				border-color: $primary;

				&~.icon {
					opacity: 1;
				}
			}
		}

		&:hover {
			cursor: pointer;
			color: $white;
		}
	}
}
</style>