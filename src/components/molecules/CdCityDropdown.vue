<template>
  <CdDropdown
    :label="label"
    :required="required"
    v-model="localValue"
    :options="cityData"
    :disabled="props.disabled"
  />
</template>

<script setup lang="ts">
import { City, type ICity } from 'country-state-city'
import { computed } from 'vue'
import { CdDropdown } from '../atoms';

// Props
const props = defineProps<{
  selectedCountryCode: string
  label?: string
  required?: boolean
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

// Generate city data dynamically based on country
const cityData = computed(() => {
  const cities = City.getCitiesOfCountry(props.selectedCountryCode) || []
  return cities.map((city: ICity) => ({
    value: city.name,
    displayValue: city.name,
  }))
})
</script>
