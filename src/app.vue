<template>
	<div id="app">
		<Navbar />
		<NuxtPage />
		<Footer />
		<!-- <BasketModal /> -->
		<!-- <ResponseModal /> -->
	</div>
</template>

<script setup lang="ts">
useAppStore()
useBasketStore()
</script>


<style lang="scss" scoped>
#app {
	width: 100%;
	height: 100%;
	min-height: 100vh;
	position: relative;

	display: flex;
	flex-direction: column;
}
</style>
