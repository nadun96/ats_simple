<template>
  <v-row>
    <v-col cols="5">
      <CdCountryDropdown label="Country" :required="true" v-model="selectedCountryCode" />
    </v-col>
    <v-col cols="5">
      <CdCityDropdown
        label="City"
        :required="true"
        :selected-country-code="selectedCountryCode"
        v-model="selectedCity"
        :disabled="isRemote"
      />
    </v-col>
    <v-col cols="2" class="pt-8 px-0">
      <v-checkbox label="Remote" v-model="isRemote" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { CdCityDropdown, CdCountryDropdown } from '@/components/molecules'
import { ref, watch } from 'vue'

// Country & city model values
const selectedCountryCode = ref('IN') // Default: India
const selectedCity = ref('')
const isRemote = ref(false)

watch([selectedCountryCode, selectedCity], ([newCountry, newCity]) => {
  console.log('Selected Country Code:', newCountry)
  console.log('Selected City:', newCity)
})

watch(isRemote, (newVal) => {
  if (newVal) {
    selectedCity.value = ''
  }
})
</script>
