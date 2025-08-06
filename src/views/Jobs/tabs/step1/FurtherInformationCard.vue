<template>
  <v-card elevation="2" class="mt-6 pa-4 rounded-lg">
    <div class="text-h6 font-weight-bold">Further information</div>
    <v-divider class="my-2"></v-divider>
    <v-container>
      <v-row>
        <v-col cols="8">
          <CdDropdown
            label="Department"
            :options="departmentOptions"
            v-model="formData.department"
          />
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-2 my-5">
            Offer properties about what each job ads and which links your ads.
          </div>
          <CdButton text="Manage properties" variant="outlined" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CdButton, CdDropdown } from '@/components/atoms'

const formData = ref({
  department: ''
})

const departmentOptions = [
  { value: '', displayValue: 'Choose...' },
  { value: 'engineering', displayValue: 'Engineering' },
  { value: 'marketing', displayValue: 'Marketing' },
  { value: 'sales', displayValue: 'Sales' },
  { value: 'hr', displayValue: 'Human Resources' },
  { value: 'finance', displayValue: 'Finance' },
  { value: 'operations', displayValue: 'Operations' }
]
</script>
