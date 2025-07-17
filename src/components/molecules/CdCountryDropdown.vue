<template>
    <CdDropdown
        label="Country"
        :required="true"
        v-model="localValue"
        :options="countryData"
    />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Country, type ICountry } from 'country-state-city';

const countries = Country.getAllCountries()
const countryData = computed(() =>
  countries.map((country: ICountry) => ({
    displayValue: country.name,
    value: country.isoCode
  }))
);

const props = defineProps<{
  modelValue: string
  label?: string
  required?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

import { watch } from 'vue';
import { CdDropdown } from '../atoms';

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

watch(localValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>