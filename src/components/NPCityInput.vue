<script setup lang="ts">
import { onClickOutside, watchDebounced } from '@vueuse/core'
import type { TextField, City } from "~~/src/types";
import { useFetch } from '@vueuse/core'
import { useField } from 'vee-validate';


const props = defineProps<{ data: TextField }>()
const nameRef = toRef(props.data, 'name')
const { errorMessage, value } = useField(nameRef)

const config = useRuntimeConfig()
const field = ref<HTMLElement>() 

onClickOutside(field, (event) => {
	isCitiesListActive.value = false
})

// novaposhta api
const npEndpoint = config.public.npEndpoint;
const npBodyParams = {
	apiKey: config.public.novaposhta,
	modelName: 'AddressGeneral',
	calledMethod: 'getCities',
	methodProperties: {
		Language: 'ua',
		Page: "1",
		Limit : "9000"
	}
};
const npRequestParams = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(npBodyParams)
}

let citiesArray = shallowRef<City[]>([])

async function getCities() {
	const { data: cities, isFinished, error: npError } = await useFetch(npEndpoint, npRequestParams as object)
	console.log(cities);
	
	if(isFinished.value) {
		citiesArray.value = JSON.parse(cities.value as string).data
	} else if (npError) {
		console.error(npError)
	}
}
// novaposhta api

const isCitiesListActive = ref(false)
const inputValue = ref('')

const toggleCitiesList = () => {
	isCitiesListActive.value = !isCitiesListActive.value
}

let filteredCities = ref<City[]>([])
watchDebounced(
  inputValue,
  () => { filteredCities.value = citiesArray.value.filter( (el: { Description: string }) => el.Description.includes(inputValue.value as string)) },
  { debounce: 500, maxWait: 1000 },
)

const emit = defineEmits<{
  (e: 'selectedCity', city: City): void
}>()

</script>

<template>
	<div class="field" ref="field" >
		<label :for="data.name">{{ data.label }}</label>
		<div class="error">
			<span v-show="errorMessage"> {{ errorMessage }} </span>
		</div>
		<!-- <div class="error" v-if="isErrorActive">{{ errorMessage }}</div> -->
		<input v-model="inputValue" @click.once="getCities" v-on:focus="toggleCitiesList" type="text" :id="data.name" :name="data.name" :placeholder="data.placeholder" required  :autocomplete="data.name"/>
		<ul v-if="isCitiesListActive" class="city_list">
			<li v-for="city in filteredCities" @click="emit('selectedCity', city), isCitiesListActive = false, inputValue = city.Description, value = city" :key="city.CityID" >
				{{ city.Description }}
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
		font-size: 0.75rem;
		line-height: 1.125rem;
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
		padding: 0.625rem 1rem;

		color: $white;
		font-size: 1rem;
		font-weight: 100;
		line-height: 1rem;
		letter-spacing: 1px;
		z-index: 10;
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
			background-color: hsl(0deg 0% 13.33%);
			color: $white;
			&:hover {
				cursor: pointer;
				color: $primary;
			}
		}
	}

}
</style>