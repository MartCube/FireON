<template>
	<NuxtLink class="btn" :to="link">
		<span>
			<slot></slot>

		</span>
	</NuxtLink>
</template>


<script setup lang="ts">
defineProps<{
	link?: string | "/",
}>()
</script>

<style lang="scss" scoped>
.btn {
	width: fit-content;
	padding: 12px 56px;
	border: 1px solid $primary;
	background: transparent;
	transform: skew(-15deg);
	cursor: pointer;
	user-select: none;

	display: flex;

	span {
		z-index: 2;
		transform: skew(15deg);

		text-transform: uppercase;
		color: $primary;
		font-weight: 400;
		font-size: .875rem;
		line-height: 1.5rem;
	}

	&:hover {
		background: $primary30;
	}

	&:active {
		background: $primary50;
	}


}
</style>