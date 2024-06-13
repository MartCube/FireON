<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'
interface CheckboxField {
	name: string,
	label: string,
}

const props = defineProps<{ data: CheckboxField }>()
const nameRef = toRef(props.data, 'name')
const { value } = useField(nameRef)
</script>

<template>
  <div class="field">
		<label :for="data.name">{{ data.label }}</label>
		<input v-model="value" type="checkbox" :id="data.name" :name="data.name" />
  </div>
</template>
