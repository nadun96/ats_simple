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
import FormStep from './tabs/step2/FormStep.vue'

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
const formStepRef = ref(null)

const stepData = [
  {
    title: 'Job Description',
    content: {
      render: () => h(JobDescription, { ref: jobDescriptionRef }),
    },
  },
  {
    title: 'Form',
    content: ApplicationForm,
    content: {
      render: () => h(FormStep, { ref: formStepRef }),
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
  if (activeStep.value === 1) {
    // const isValid = jobDescriptionRef.value?.isValid?.()
    // if (!isValid) {
    //   alert('Fill out required fields.')
    //   return
    // }
    // console.log('✅ Data:', jobDescriptionRef.value.getFormData())
  }

  activeStep.value++
}

const handlePrev = () => {
  if (activeStep.value > 1) activeStep.value--
}
</script>