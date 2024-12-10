<script setup lang="ts">
import type { MagazineCard } from "~~/src/types"
defineProps<{
	data: MagazineCard,
	button: string,
}>()
</script>

<template>
	<div class="magazine_card">
		<div class="magazine">
			<AppImg :src="data.home_image ? data.home_image : data.image" :width="1000" :height="1000" />
		</div>
		<div class="wrap">
			<AppImg class="name" :src="data.svg" :width="220" :height="72" />
			<ul class="info">
				<li>{{ data.info.size }}</li>
				<li v-if="data.info.rem">{{ data.info.rem }}</li>
				<li v-if="data.info.blk">{{ data.info.blk }}</li>
			</ul>
			<!-- i18n -->
			<AppLink class="btn" :to="data.name" hash="#product">{{ button }}</AppLink>
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
			filter: drop-shadow(0px 0px 40px rgba(214, 174, 33, 50%))
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
				font-size: 0.75rem;
				line-height: 1.125rem;
				letter-spacing: 0.225em;
				color: $white70;

				&:first-of-type {
					color: $primary;
				}
			}
		}

		.btn {
			max-width: 11.25rem;
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
				width: 7.5rem;

				span {
					font-size: 0.75rem;
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