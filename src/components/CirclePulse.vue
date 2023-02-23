<template>
	<div class="pulse">
		<div class="circle1"></div>
		<div class="circle2"></div>
		<div class="circle3"></div>
	</div>
</template>

<style lang="scss" scoped>
.pulse {
	width: inherit;
	height: inherit;

	overflow: hidden;
	position: relative;

	div {
		// stroke: $primary;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		opacity: 1;
		background-color: $primary;
		transform: scale(0);
		animation: pulse 2s linear 1s infinite;
		// animation: name duration timing-function delay iteration-count direction fill-mode;
		position: absolute;
		left: 0;
		top: 0;

		&.circle2 {
			animation-delay: .3s;
		}

		&.circle3 {
			animation-delay: .6s;
		}
	}
}

@keyframes pulse {
	0% {
		transform: scale(0);
		transform-origin: center center;
		opacity: 1;
	}

	100% {
		transform: scale(1);
		transform-origin: center center;
		opacity: 0;
	}
}
</style>