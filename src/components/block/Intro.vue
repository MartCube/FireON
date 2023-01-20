<template>
	<section class="intro">

		<div class="wrap">
			<p class="title">{{ title }}</p>
			<Btn>{{ button }}</Btn>
		</div>
		<nuxt-img class="image" :src="image" provider="sanity" loading="lazy" />
	</section>
</template>

<script setup lang="ts">
defineProps<{
	title: string,
	button: string,
	image: string,
}>()
</script>

<style lang="scss" scoped>
.intro {
	height: 26rem;

	justify-content: space-between;
	align-items: center;

	.wrap {
		.title {
			font-size: 2.875rem;
			line-height: 68.5px;
			font-weight: 400;

			&::first-letter {
				color: $primary;
			}
		}

		.btn {
			margin-top: 2rem;
		}
	}

	.image {
		width: 20rem;

		img {
			width: 100%;
		}
	}
}
</style>