<template>
	<div id="app">
		<Navbar />
		<NuxtPage />
		<Footer />
		<BasketModal />
	</div>
</template>

<script setup lang="ts">
useAppStore()
useBasketStore()
</script>


<style lang="scss" scoped>
#app {
	width: 100vw;
	height: 100%;
	min-height: 100vh;
	position: relative;

	display: flex;
	flex-direction: column;
}
</style>
