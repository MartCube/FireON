<template>
	<div id="app">
		<Navbar />
		<Content />
		<Footer />
	</div>
</template>

<script setup lang="ts">
useAppStore()
</script>


<style lang="scss" scoped>
#app {
	width: 100vw;
	height: 100%;
	min-height: 100vh;

	display: flex;
	flex-direction: column;
}
</style>
