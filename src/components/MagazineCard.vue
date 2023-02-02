<script setup lang="ts">
import type { MagazineCard } from "~~/src/types"
defineProps<{ data: MagazineCard }>()
</script>

<template>
	<div class="magazine_card">
		<AppImg class="magazine" :src="data.image" :width="320" :height="320" />
		<div class="wrap">
			<AppImg class="name" :src="data.svg" :width="220" :height="72" />
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
	transform: skew(-10deg);

	display: flex;
	justify-content: flex-end;

	position: relative;

	.magazine {
		position: absolute;
		top: -3.5rem;
		left: -2rem;
		transform: skew(10deg);
	}

	.wrap {
		width: 55%;
		height: 100%;
		transform: skew(10deg);

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.name {
			width: 10rem;
			height: 3rem;
		}


		.info {
			list-style: none;

			li {
				text-transform: uppercase;
				font-size: 12px;
				line-height: 18px;
				letter-spacing: 0.225em;
				color: $white70;

				&:first-of-type {
					color: $primary;
				}
			}
		}
	}

}
</style>