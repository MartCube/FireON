<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'

const { showResponse } = storeToRefs(useBasketStore())
const { toggleResponse } = useBasketStore()

const responseRef = ref()
onClickOutside(responseRef, () => toggleResponse())


function toHome() {
	toggleResponse()
	const router = useRouter()
	router.push({ path: "/" })
}
</script>

<template>
	<div class="overlay" v-if="showResponse">
		<div id="response" ref="responseRef">
			<h2>замовлення оформлене!</h2> <!-- i18n -->
			<Icon class="success" name="IconSuccess" />
			<AppBtn @click="toHome()" value="у головну" />
		</div>
	</div>

</template>

<style lang="scss" scoped>
.overlay {
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: $dark80;


	#response {
		width: 35rem;
		max-height: calc(100vh - 8rem);
		padding: 2.6rem;
		border: 1px solid $white10;
		background: $dark;
		overflow: auto;

		position: fixed;
		z-index: 10;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;

		h2 {
			width: 60%;
			margin-bottom: 1rem;

			text-align: center;
			text-transform: uppercase;
			font-size: 28px;
			line-height: 34px;
		}

		.success {
			margin: 2rem 0;
			width: 250px;
			height: 250px;

		}
	}
}

@media (max-width: 800px) {
	.overlay {
		#response {
			width: 100%;
		}
	}
}
</style>