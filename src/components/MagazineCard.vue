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
	width: 100%;
	max-width: 35rem;

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

		width: 20rem;
		height: 20rem;
	}

	.wrap {
		width: 45%;
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



@media (max-width: 700px) {
	.magazine_card {
		.wrap {
			margin-right: 2rem;
		}
	}
}

@media (max-width: 620px) {
	.magazine_card {
		.magazine {
			top: -10%;
			left: -15%;

			width: 16rem;
			height: 16rem;
		}
	}
}

@media (max-width: 430px) {
	.magazine_card {
		.magazine {
			top: 5%;
			left: -15%;

			width: 12rem;
			height: 12rem;
		}

		.wrap {
			width: 50%;
		}
	}
}

@media (max-width: 360px) {
	.magazine_card {
		.magazine {
			top: 10%;
			left: -20%;

			width: 10rem;
			height: 10rem;
		}


	}
}
</style>