<template>
  <SocietyCard ref="societyRef" :jobData="jobData" :isEditing="isEditing" />
  <JobDescriptionCard :jobData="jobData" :isEditing="isEditing" />
  <JobSettingsCard :jobData="jobData" :isEditing="isEditing" />
  <FurtherInformationCard :jobData="jobData" :isEditing="isEditing" />
  <div class="wizard-actions d-flex justify-space-between">
    <v-btn @click="handlePrev" variant="outlined" color="primary">Previous</v-btn>
    <div class="d-flex ga-2">
      <v-btn variant="outlined" color="primary" @click="previewAd">Preview ad</v-btn>
      <v-btn @click="handleNext" color="primary">Next</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Job } from '@/services/jobService'
import JobDescriptionCard from './JobDescriptionCard.vue'
import SocietyCard from './SocietyCard.vue'
import JobSettingsCard from './JobSettingsCard.vue'
import FurtherInformationCard from './FurtherInformationCard.vue'

const props = defineProps<{
  jobData?: Job
  isEditing?: boolean
}>()

const societyRef = ref()

// TODO: Implement form data collection when needed
// const getFormData = () => {
//   return societyRef.value?.formData
// }

const handleNext = async () => {
  // Skip validation for now; we'll add later
  emit('next')
}

const previewAd = () => {
  // Route to ad preview page
  window.open('/job/preview', '_blank')
}

const handlePrev = () => {
  emit('prev')
}

const emit = defineEmits(['next', 'prev'])
</script>
