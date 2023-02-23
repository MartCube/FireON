<script setup lang="ts">
import { storeToRefs } from 'pinia'

useProductStore()
const { pageData: data, pending, newProductCount } = storeToRefs(useProductStore())
const { addToBasket } = useProductStore()


// write metatags
</script>

<template>
	<div id="product">
		<template v-if="data && !pending">
			<div class="desktop">
				<AppLink class="go_back" to="/" hash="#magazines">
					<Icon name="IconArrow" />
				</AppLink>
				<ImageSlider />

				<div class="wrap">
					<div class="details">
						<AppImg class="name_img" :src="data.svg" :width="420" :height="140" />
						<ul class="info">
							<li>{{ data.info.size }}</li>
							<li>{{ data.info.rem }}REM</li>
							<li>{{ data.info.blk }}BLK</li>
						</ul>
						<span class="price">
							<Icon name="IconMoney" />
							{{ data.price }} ГРН
						</span>
					</div>
					<ColorPanel />
					<RichText class="description" :blocks="data.description" />
					<div class="to_basket">
						<CounterBtn :data="newProductCount" @dec="newProductCount--" @inc="newProductCount++" />
						<AppBtn :value="data.button" @click="addToBasket()" />
					</div>
				</div>
			</div>

			<div class="mobile">
				<div class="details">
					<AppImg class="name_img" :src="data.svg" :width="420" :height="140" />
					<ul class="info">
						<li>{{ data.info.size }}</li>
						<li>{{ data.info.rem }}REM</li>
						<li>{{ data.info.blk }}BLK</li>
					</ul>
				</div>
				<ImageSlider />
				<div class="price">
					<span>
						<Icon name="IconMoney" />{{ data.price }} ГРН
					</span>
				</div>
				<ColorPanel />
				<RichText class="description" :blocks="data.description" />
				<div class="to_basket">
					<CounterBtn :data="newProductCount" @dec="newProductCount--" @inc="newProductCount++" />
					<AppBtn :value="data.button" @click="addToBasket()" />
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
#product {
	width: 100%;
	height: 100%;
	min-height: 100vh;
	padding: 2rem 10%;

	.desktop {
		width: inherit;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;

		.go_back {
			z-index: 2;
			position: absolute;
			top: 2rem;
			left: 0;

			.icon {
				width: 3rem;
				height: 3rem;
				stroke: $primary30;
				fill: none;
				transform: rotate(180deg);


			}

			&:hover .icon {
				stroke: $primary;
			}

		}

		.wrap {
			width: 50%;
			height: max-content;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.details {
				width: 100%;
				display: flex;
				// justify-content: space-between;
				align-items: center;

				.name_img {
					width: 40%;
					margin-right: 4rem;
					position: relative;

					&::after {
						content: '';
						position: absolute;
						top: 0;
						right: -2rem;

						width: 1px;
						height: 100%;
						opacity: 0.35;
						background: linear-gradient(0, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
					}
				}

				.info {
					list-style: none;

					li {
						text-transform: uppercase;
						font-size: 16px;
						line-height: 27px;
						color: $white50;


					}
				}

				.price {
					flex: 1;
					color: $primary;
					text-align: end;
					line-height: 2rem;

					.icon {
						width: 1.5rem;
						height: 1.5rem;
					}
				}
			}

			.description {
				width: 100%;
			}

			.to_basket {
				width: 100%;
				margin-top: 2rem;
				display: flex;

				.counter_btn {
					margin-right: 2rem;
				}
			}
		}
	}

	.mobile {
		width: inherit;
		display: none;
		flex-direction: column;
		align-items: center;

		.go_back {
			display: none;
		}

		.details {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.name_img {
				width: 50%;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					top: 0;
					right: -20%;

					width: 1px;
					height: 100%;
					opacity: 0.35;
					background: linear-gradient(0, rgba(0, 0, 0, 1) 0%, rgba(255, 213, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
				}
			}

			.info {
				list-style: none;

				li {
					text-transform: uppercase;
					font-size: 14px;
					line-height: 24px;
					color: $white50;
				}
			}
		}

		.price {
			width: 100%;
			position: relative;

			span {
				position: absolute;
				top: 2rem;
				right: 0;
				color: $primary;
				font-size: 1rem;

				.icon {
					width: 1.5rem;
					height: 1.5rem;
					margin-right: 1rem;
				}
			}

		}

		.to_basket {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.counter_btn {
				margin: 2rem 0;
			}
		}
	}
}

@media (max-width: 1080px) {
	#product {
		.mobile {
			display: flex;
		}

		.desktop {
			display: none;
		}
	}
}
</style>
