<script setup lang="ts">
const { locale, localeCodes } = useI18n()
const switchLocalePath = useSwitchLocalePath()

</script>

<template>
	<div class="switchLocale">
		<NuxtLink v-for="code in localeCodes" :to="switchLocalePath(code)" :class="['locale', { active: code == locale }]" :key="code">
			{{ code }}
		</NuxtLink>
	</div>
</template>

<style lang="scss">
.switchLocale {
	position: absolute;
	right: calc(10% + 3.8rem);
	top: 2rem;
	transform: translateY(-50%);

	.locale {
		margin-right: 1rem;

		text-transform: uppercase;
		font-size: .75rem;
		line-height: 1.5rem;
		color: $white50;

		&:last-of-type {
			margin-right: 0;
		}

		&.active {
			color: $white;
		}

		&:hover {
			cursor: pointer;
			color: $primary;

			&.active {
				cursor: default;
				color: $white;
			}
		}
	}
}

@media (max-width: 1000px) {
	.switchLocale {
		z-index: 8;
		width: min-content;
		position: fixed;
		top: 80%;
		left: 50%;
		transform: translateX(-50%);
		display: none;

		.locale {
			font-size: 20px;
			line-height: 34px;
			margin-right: 2rem;
		}

		&.show {
			display: flex;
		}

	}
}
</style>