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
			<h2><span>{{ word }}</span>{{ rest }}</h2>
		</template>
		<template v-else>
			<h2>{{ rest }}<span>{{ word }}</span></h2>
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

	h2 {
		text-transform: uppercase;
		font-size: 1.8125rem;
		font-weight: 400;
		line-height: 3.0625rem;
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

@media (max-width: 1200px) {
	.title {
		margin-bottom: 4rem;

		h2 {
			font-size: 22px;
			line-height: 38px;
		}
	}
}
</style>