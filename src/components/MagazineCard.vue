<script setup lang="ts">
import type { MagazineCard } from "~~/src/types"
defineProps<{ data: MagazineCard }>()
</script>

<template>
	<div class="magazine_card">
		<AppImg class="magazine" :src="data.image" :width="320" :height="320" />
		<div class="wrap">
			<AppImg class="name" :src="data.svg" :width="207" :height="72" />
			<ul class="info">
				<li>{{ data.info.size }}</li>
				<li>{{ data.info.rem }}REM</li>
				<li>{{ data.info.blk }}BLK</li>
			</ul>
			<LinkBtn :link="`/${data.uid}/#product`">Детальнiше</LinkBtn><!-- i18n -->
		</div>
	</div>
</template>


<style lang="scss" scoped>
.magazine_card {
	width: 45%;

	height: 14rem;
	border: 1px solid $primary;
	transform: skew(-15deg);

	display: flex;
	justify-content: flex-end;

	position: relative;

	// .magazine {
	// 	position: absolute;
	// 	top: -3.5rem;
	// 	left: -2rem;
	// 	transform: skew(15deg);
	// }

	.wrap {
		width: 50%;
		height: 100%;
		// transform: skew(15deg);

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.name {
			height: 4.5rem;
		}


		.info {
			list-style: none;
		}
	}

}
</style>