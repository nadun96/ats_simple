<!-- FieldStep.vue -->
<template>
  <div>
    <h1 class="text-h6 font-weight-bold pt-6">Creating the application form</h1>
    <h3>
      Choose which fields you want to display on the application form and make them mandatory or not depending on your needs and preferences
    </h3>

    <v-container>
      <v-row class="align-center mb-4">
        <v-col cols="auto">
          <v-img :src="rocketIcon" width="30" />
        </v-col>
        <v-col>
          <div class="text-subtitle-1 font-weight-medium">Simplified application</div>
          <div class="text-caption">
            Candidates simply submit their CV and we collect the contact info
          </div>
        </v-col>
        <v-col cols="auto">
          <v-switch v-model="isSimplified" hide-details />
        </v-col>
      </v-row>

      <v-select
        v-model="selectedTemplate"
        :items="templates"
        label="Form Template"
        variant="outlined"
        class="mb-6"
      />

      <!-- 👇 Add ref here -->
      <FieldList ref="fieldListRef" />
    </v-container>

    <div class="mt-4 d-flex justify-space-between">
      <v-btn @click="$emit('prev')" variant="outlined" color="primary">Previous</v-btn>
      <v-btn @click="handleNext" color="primary">Next</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldList from './FieldList.vue'
import { ref } from 'vue'

const isSimplified = ref(false)
const selectedTemplate = ref('Classic Form Template')
const templates = ['Classic Form Template', 'Minimal Form Template']
const rocketIcon = new URL('@/assets/icons/rocket.png', import.meta.url).href

// 👇 Reference to access fields from FieldList
const fieldListRef = ref()

function handleNext() {
  const fields = fieldListRef.value?.fields || []

  if (fields.length === 0) {
    alert('Please add at least one question before proceeding.')
    return
  }

  const formattedFields = fields.map(field => ({
    label: field.label,
    type: field.type,
    required: field.required
  }))

  console.log('✅ Form Data:', JSON.stringify(formattedFields, null, 2))

  // You can emit next or navigate programmatically here
  // $emit('next') if part of multi-step form
}
</script>
