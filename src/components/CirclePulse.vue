<template>
	<div class="pulse">
		<div class="circle1"></div>
		<div class="circle2"></div>
		<div class="circle3"></div>
		<div class="circle4"></div>
		<div class="circle5"></div>
		<div class="circle6"></div>
		<div class="circle7"></div>
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
		border: 3px solid;
		border-color: $primary;
		transform: scale(0);
		animation: pulse 9.8s ease-in infinite;
		// animation: name duration timing-function delay iteration-count direction fill-mode;
		position: absolute;
		left: 0;
		top: 0;

		&.circle2 {
			animation-delay: 1.4s;
		}

		&.circle3 {
			animation-delay: 2.8s;
		}
		&.circle4 {
			animation-delay: 4.2s;
		}
		&.circle5 {
			animation-delay: 5.6s;
		}
		&.circle6 {
			animation-delay: 7s;
		}
		&.circle7 {
			animation-delay: 8.4s;
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