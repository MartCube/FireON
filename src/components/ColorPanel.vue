<script setup lang="ts">

const props = defineProps<{
	title: string,
	colors: string[],
}>()

const activeColor = ref(props.colors[0]) // first color as default

defineEmits<{ (e: 'color', color: string): void }>() // emit selected color

function reset() {
	activeColor.value = props.colors[0]
}
defineExpose({ reset })
</script>

<template>
	<div class="panel">
		<h4>{{ title }}</h4> <!-- i18n const -->
		<label v-for="(color, i) in colors" :key="color" @click.stop="$emit('color', color)">
			<input v-model="activeColor" :value="color" type="radio" :class="color" />
			<span class="name">{{ color }}</span>
			<Icon name="IconCheck" />
		</label>
	</div>
</template>

<style lang="scss" scoped>
.panel {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 2rem 0;

	label {
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

			&.Black {
				background: $Black;
			}

			&.Coyote {
				background: $Coyote;
			}

			&.Olive {
				background: $Olive;
			}

			&.Tan {
				background: $Tan;
			}

			&.Pink {
				background: $Pink;
			}
		}

		&:hover {
			cursor: pointer;
			color: $white;
		}
	}
}
</style>