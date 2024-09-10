<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'
interface CheckboxField {
	name: string,
	label: string,
	value: boolean
}

const props = defineProps<{ data: CheckboxField }>()
const nameRef = toRef(props.data, 'name')
const { value } = useField(nameRef)
</script>

<template>
  <div class="checkbox">
		<label :for="data.name" class="checkbox-label">
			<input v-model="value" type="checkbox" :id="data.name" :name="data.name" />
			<span></span>
			{{ data.label }}
		</label>
  </div>
</template>

<style lang="scss" >
.checkbox{
	margin: 0.5rem;
	input{
		display: none;
	}
	.checkbox-label {
		display: flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
	}
	span{
		position: relative;
		width: 20px;
		height: 20px;
		background-color: $white30;
		border: 2px solid $white30;
		border-radius: 3px;
		margin-right: 0.625rem;
		transition: background-color 0.3s, border-color 0.3s;
	}
	input:checked + span{
		background-color: $primary;
		border-color: $primary;
	}

	input:checked + span:after{
		content: '';
		position: absolute;
		top: 0px;
		left: 5px;
		width: 6px;
		height: 12px;
		border: solid $dark;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
	label {
		color: $white30;
	}

}
</style>
