<script setup lang="ts">
import type { MagazineCard } from "~~/src/types"

defineProps<{
	data: MagazineCard,
	button: string,
}>()
</script>

<template>
	<div class="magazine-card">
		<SanityImage :src="data.image" :width="600" />
		<div class="wrap">
			<h3 class="title">{{ data.name }}</h3>
			<ul class="info">
				<li>{{ data.info.size }}</li>
				<li>{{ data.info.rem }}REM</li>
				<li>{{ data.info.blk }}BLK</li>
			</ul>
			<LinkBtn :link="`/${data.uid}/`">{{ button }}</LinkBtn>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.magazine-card {
	width: 47.5%;
	height: 14rem;
	border: 1px solid $primary;
	transform: skew(-15deg);

	display: flex;
	justify-content: flex-end;

	position: relative;

	.image {
		width: 300px;

		position: absolute;
		top: -3rem;
		left: 0;
		transform: skew(15deg);
	}

	.wrap {
		width: 50%;
		height: 100%;
		transform: skew(15deg);

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.title {
			font-family: 'Legend';
			font-size: 2rem;
		}

		.info {
			list-style: none;
		}
	}

}
</style>