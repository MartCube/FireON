<script setup lang="ts">
import type { MagazineCard } from "~~/src/types"
defineProps<{ data: MagazineCard }>()
</script>

<template>
	<div class="magazine_card">
		<div class="magazine">
			<AppImg :src="data.image" :width="320" :height="320" />
		</div>
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
	width: 47%;
	height: 15rem;
	border: 1px solid $primary20;
	transform: skew(-10deg);

	display: flex;
	justify-content: flex-end;
	align-items: center;

	.magazine {
		position: relative;
		width: 50%;
		height: 100%;
		transform: skew(10deg);

		// position: absolute;
		// top: -10%;
		// left: -10%;
		.image {
			transform: scale(1.4);
			object-fit: contain;
			width: 100%;
			height: 100%;
		}
	}

	.wrap {
		width: 50%;
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
				margin-left: 0.5rem;
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

@media (max-width: 700px) {
	.magazine_card {}
}

@media (max-width: 620px) {
	.magazine_card {
		width: 80%;
	}
}

@media (max-width: 450px) {
	.magazine_card {}
}

@media (max-width: 380px) {
	.magazine_card {
		width: 100%;
	}
}

@media (max-width: 350px) {
	.magazine_card {}
}
</style>