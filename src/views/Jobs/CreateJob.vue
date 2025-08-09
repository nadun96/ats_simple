<template>
  <v-container>
    <CdStepper :steps="stepData" :activeStep="activeStep" @next="handleNext" @prev="handlePrev" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import CdStepper from '@/components/molecules/CdStepper.vue'
import JobDescription from './tabs/step1/JobDescription.vue'
import ApplicationForm from './tabs/step2/ApplicationForm.vue'
import WorkFlow from './tabs/step3/WorkFlow.vue'
import JobTeam from './tabs/step4/JobTeam.vue'
import Promote from './tabs/step5/Promote.vue'

const activeStep = ref(1)

interface JobDescriptionExpose {
  isValid: () => boolean
  getFormData: () => {
    companyName: string
    url: string
    description: string
  }
}

const jobDescriptionRef = ref<JobDescriptionExpose | null>(null)
// No special ref for form step for now

const stepData = [
  {
    title: 'Job Description',
    content: {
      render: () => h(JobDescription, { ref: jobDescriptionRef }),
    },
  },
  {
    title: 'Form',
    content: {
      render: () => h(ApplicationForm),
    },
  },
  {
    title: 'Workflow',
    content: {
      render: () => h(WorkFlow),
    },
  },
  {
    title: 'Job Team',
    content: JobTeam,
  },
  {
    title: 'Promote',
    content: Promote,
  },
]

const handleNext = () => {
  // Allow free navigation; we'll add validation later
  activeStep.value++
}

const handlePrev = () => {
  if (activeStep.value > 1) activeStep.value--
}
</script>
