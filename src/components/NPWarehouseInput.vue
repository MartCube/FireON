<script setup lang="ts">
import { onClickOutside, watchDebounced } from '@vueuse/core'

import { useFetch } from '@vueuse/core'
import { useField } from 'vee-validate'
import { City, TextField, Warehouse } from "~~/src/types"


const props = defineProps<{ city: City , data: TextField}>()
const nameRef = toRef(props.data, 'name')
const { errorMessage, value } = useField(nameRef)

const config = useRuntimeConfig()
const field = ref<HTMLElement>() 
onClickOutside(field, (event) => {
	isWarehousesListActive.value = false
})
// novaposhta api
const npEndpoint = config.public.npEndpoint;
const npBodyParams = {
	apiKey: config.public.novaposhta,
  modelName: 'Address',
  calledMethod: 'getWarehouses',
  methodProperties: {
    CityRef: props.city.Ref
  }
};
const npRequestParams = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(npBodyParams)
}

let warehousesArray = shallowRef<Warehouse[]>([])
async function getWarehouses() {
	const { data: warehouses, isFinished, error: npError } = await useFetch(npEndpoint, npRequestParams as object)
	if(isFinished.value) {
		warehousesArray.value = JSON.parse(warehouses.value as string).data
	} else if (npError) {
		console.error(npError)
	}
}
// novaposhta api

const isWarehousesListActive = ref(false)
const inputValue = ref('')

const togggleWarehousesList = () => {
	isWarehousesListActive.value = !isWarehousesListActive.value
}

let filteredWarehouses = ref<Warehouse[]>([])
watchDebounced(
  inputValue,
  () => { filteredWarehouses.value = warehousesArray.value.filter( (el: { Description: string }) => el.Description.includes(inputValue.value as string)) },
  { debounce: 500, maxWait: 1000 },
)

const emit = defineEmits<{
  (e: 'selectedWarehouse', warehouse: Warehouse): void
}>()

</script>

<template>
	<div ref="field" class="field">
		<label for="warehouse">{{ data.label }}</label>
		<div class="error">
			<span v-show="errorMessage"> {{ errorMessage }} </span>
		</div>
		<input v-model="inputValue" @click.once="getWarehouses" v-on:focus="togggleWarehousesList" type="text" :id="data.name" :name="data.name" :placeholder="data.placeholder" required  :autocomplete="data.name"/>
		<ul v-if="isWarehousesListActive" class="city_list">
			<li v-for="wh in filteredWarehouses" @click="emit('selectedWarehouse', wh), isWarehousesListActive = false, inputValue = wh.Description, value = wh" :key="wh.Ref">
				{{ wh.Description }}
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