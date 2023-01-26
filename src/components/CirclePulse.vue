<template>
	<div class="pulse">
		<svg width="514" height="514" viewBox="0 0 514 514" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path class="circle1" d="M403.5 257C403.5 337.908 337.687 403.5 256.5 403.5C175.313 403.5 109.5 337.908 109.5 257C109.5 176.092 175.313 110.5 256.5 110.5C337.687 110.5 403.5 176.092 403.5 257Z" />
			<circle class="circle2" cx="257" cy="257" r="196.5" />
			<circle class="circle3" cx="257" cy="257" r="256.5" />
		</svg>
	</div>
</template>

<style lang="scss" scoped>
.pulse {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	overflow: hidden;
	position: relative;

	svg {
		fill: none;
		stroke: $primary;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.circle1 {
			opacity: 0;
			animation: pulse 3s linear infinite;
		}

		.circle2 {
			opacity: 0;
			animation: pulse 3s linear infinite;
			animation-delay: 0.25s;
		}

		.circle3 {
			opacity: 0;
			animation: pulse 3s linear infinite;
			animation-delay: 0.5s;
		}
	}
}

@keyframes pulse {
	0% {
		transform: scale(0.5, 0.5);
		transform-origin: center center;
		opacity: 0;
	}

	50% {
		opacity: 0.25;
	}

	70% {
		opacity: 0.75;
	}

	100% {
		transform: scale(1, 1);
		transform-origin: center center;
		opacity: 0;
	}
}
</style>