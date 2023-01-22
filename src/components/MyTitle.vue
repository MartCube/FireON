<script setup lang="ts">
enum ColorWord {
	first = 'first',
	last = 'last',
}

const props = defineProps<{
	src: string,
	mode: ColorWord,	// first or last
}>()

const word = props.mode == 'first' ? props.src.split(" ")[0] : props.src.split(" ").reverse()[0]
const rest = props.src.replace(word, '')

// write render function with option of h1 and h2 and if logic from template

</script>

<template>
	<h2 class="title">
		<template v-if="mode == 'first'">
			<span>{{ word }}</span>{{ rest }}
		</template>
		<template v-else-if="mode == 'last'">
			{{ rest }}<span>{{ word }}</span>
		</template>
	</h2>
</template>
<style lang="scss" scoped>
.title {
	width: 100%;
	margin-bottom: 4rem;
	font-weight: 400;
	color: $white;

	span {
		color: $primary;
	}


}
</style>