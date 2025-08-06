<template>
  <SocietyCard ref="societyRef" />
  <JobDescriptionCard />
  <JobSettingsCard />
  <FurtherInformationCard />
</template>

<script setup lang="ts">
import JobDescriptionCard from './JobDescriptionCard.vue';
import SocietyCard from './SocietyCard.vue';
import JobSettingsCard from './JobSettingsCard.vue';
import FurtherInformationCard from './FurtherInformationCard.vue';
  <div class="mt-4 d-flex justify-space-between">
    <v-btn @click="handlePrev" variant="outlined" color="primary">Previous</v-btn>
    <v-btn @click="handleNext" color="primary" >Next</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JobDescriptionCard from './JobDescriptionCard.vue'
import SocietyCard from './SocietyCard.vue'

const societyRef = ref()

const getFormData = () => {
  return societyRef.value?.formData
}

const handleNext = async () => {
  if (!await societyRef.value?.isValid?.()) {
    alert('Please fill in all required fields.')
    return
  }

  const data = getFormData()
  console.log('🚀 Form Data:', data)

  // Emit event to parent to move to next step
  emit('next')
}

const handlePrev = () => {
  emit('prev')
}

const emit = defineEmits(['next', 'prev'])
</script>
