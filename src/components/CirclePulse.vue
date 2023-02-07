<template>
	<div class="pulse">
		<svg width="514" height="514" viewBox="0 0 514 514" fill="none">
			<path class="circle1" d="M403.5 257C403.5 337.908 337.687 403.5 256.5 403.5C175.313 403.5 109.5 337.908 109.5 257C109.5 176.092 175.313 110.5 256.5 110.5C337.687 110.5 403.5 176.092 403.5 257Z" />
			<circle class="circle2" cx="257" cy="257" r="196.5" />
			<circle class="circle3" cx="257" cy="257" r="256.5" />
		</svg>
	</div>
</template>

<style lang="scss" scoped>
.pulse {
	width: inherit;
	height: inherit;

	overflow: hidden;
	position: relative;

	svg {
		stroke: $primary;
		width: inherit;
		height: inherit;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.circle1 {
			opacity: 0;
			animation: pulse 2s linear infinite;
			animation-delay: 3.25s;

		}

		.circle2 {
			opacity: 0;
			animation: pulse 2s linear infinite;
			animation-delay: 3.25s;
		}

		.circle3 {
			opacity: 0;
			animation: pulse 2s linear infinite;
			animation-delay: 3.5s;
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