<script setup lang="ts">
import { ColorWord } from "~~/src/types"

const props = defineProps<{
	src: string,
	mode: ColorWord,
	noline?: boolean,
}>()

const word = props.mode == 'first' ? props.src.split(" ")[0] : props.src.split(" ").reverse()[0]
const rest = props.src.replace(word, '')

</script>

<template>
	<div :class="['title', { line: !noline }]">
		<template v-if="mode == 'first'">
			<h1><span>{{ word }}</span>{{ rest }}</h1>
		</template>
		<template v-else>
			<h1>{{ rest }}<span>{{ word }}</span></h1>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.title {
	width: 100%;
	margin-bottom: 8rem;

	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	text-align: center;

	h1 {
		text-transform: uppercase;
		font-size: 29px;
		font-weight: 400;
		line-height: 49px;
		color: $white;

		span {
			color: $primary;
		}
	}


	&.line {
		&::after {
			content: '';
			margin-top: 1.25rem;
			width: 100%;
			max-width: 15rem;
			height: 1px;
			opacity: 0.8;
			background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
		}
	}
}
</style>