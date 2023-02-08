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


<style lang="scss" >
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
		padding-left: 1rem;

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

		.btn {
			max-width: 180px;
		}
	}
}

@media (max-width: 1200px) {
	.magazine_card {
		.wrap .btn {
			max-width: initial;
			padding: 0 2rem;
			width: fit-content;
		}


	}
}

@media (max-width: 1050px) {
	.magazine_card {
		width: 70%;
	}
}

@media (max-width: 850px) {
	.magazine_card {
		width: 85%;
	}
}



@media (max-width: 750px) {
	.magazine_card {
		width: 100%;

		.wrap {
			.btn {
				padding: 0 1rem;
			}
		}
	}
}


@media (max-width: 440px) {
	.magazine_card {
		width: 90%;

		.magazine {
			width: 45%;
		}

		.wrap {
			width: 55%;

			.name {
				width: 7rem;
			}

			.btn {
				padding: 0;
				width: 120px;

				span {
					font-size: 12px;
				}
			}
		}
	}
}

@media (max-width: 360px) {
	.magazine_card {

		.magazine {
			width: 40%;
		}

		.wrap {
			width: 60%;

			.btn {
				width: 100px;
			}
		}
	}
}
</style>