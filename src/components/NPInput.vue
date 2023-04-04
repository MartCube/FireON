<script setup lang="ts">
import { is } from '@babel/types';
import { useField } from 'vee-validate'
import { toRef } from 'vue'
import type { TextField } from "~~/src/types";

const props = defineProps<{ data: any, name: TextField }>()
const nameRef = toRef(props.name, 'name')
const citiesRef = ref(JSON.parse(props.data).data)
const { errorMessage, value } = useField(nameRef)
const isCitiesListActive = ref(false)

const filterCities = () => {

}

const showCitiesList = () => {
	isCitiesListActive.value = true
}
</script>

<template>
	<div class="field">
		<!-- <div class="error">
			<span v-show="errorMessage"> {{ errorMessage }} </span>
		</div> -->
		<label :for="name.name">{{ name.label }}</label>
		<input v-model="value" v-on:focus="showCitiesList" v-on:blur="filterCities" type="text" :id="name.name" :name="name.name" :placeholder="name.placeholder" />
		<ul v-if="isCitiesListActive" class="city_list">
			<li v-for="city in citiesRef">
				{{ city.AreaDescription }}
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.field {
	width: 100%;
	margin-bottom: 2rem;
	position: relative;

	display: flex;
	flex-direction: column;

	label {
		text-transform: uppercase;
		font-size: 12px;
		line-height: 18px;
		font-weight: 400;
		color: $white30;
	}

	.error {
		display: flex;
		align-self: flex-end;
		overflow: hidden;
		height: 0.75rem;

		span {
			color: $error;
			font-weight: 300;
			font-size: .75rem;
			line-height: .75rem;
		}
	}

	input {
		width: 100%;
		border: none;
		border-bottom: 1px solid $white30;
		background: transparent;
		padding: 10px 16px;

		color: $white;
		font-size: 1rem;
		font-weight: 100;
		line-height: 1rem;
		letter-spacing: 1px;

		&::placeholder {
			color: $white50;
			text-transform: capitalize;
		}

		transition: all 0.2s ease;

		&:focus {
			border-color: $primary;

			&::placeholder {
				color: $white;
				opacity: 1;
			}

		}
	}


	.city_list {
		position: absolute;
		z-index: 10;
    top: 3.6rem;
    max-height: 40vh;
    overflow-x: auto;
		li {
			padding: 0.5rem 1rem;
			background-color: $white;
			color: $dark95;
			&:hover {
				cursor: pointer;
				color: $white70;
			}
		}
	}

}
</style>