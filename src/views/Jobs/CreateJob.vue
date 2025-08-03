<template>
  <v-container>
    <CdStepper :steps="stepData" :onNext="handleNext" :onPrev="handlePrev" />
  </v-container>
</template>

<script setup lang="ts">
import CdStepper from '@/components/molecules/CdStepper.vue'
import { h, type Component } from 'vue'
import JobDescription from './tabs/step1/JobDescription.vue'
import ApplicationForm from './tabs/step2/ApplicationForm.vue'
import WorkFlow from './tabs/step3/WorkFlow.vue'
import JobTeam from './tabs/step4/JobTeam.vue'
import Promote from './tabs/step5/Promote.vue'

// Define a union type for Vue component or renderable object
type StepContent = Component | { render: () => ReturnType<typeof h> }

interface Step {
  title: string
  content: StepContent
}

const stepData: Step[] = [
  {
    title: 'Job Description',
    content: JobDescription,
  },
  {
    title: 'Form',
    content: ApplicationForm,
  },
  {
    title: 'Workflow',
    content: WorkFlow,
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

const handleNext = (currentStep: number): boolean => {
  if (currentStep === 2) {
    const isFormValid = true // Replace with actual validation
    if (!isFormValid) {
      alert('Please complete the form before continuing.')
      return false
    }
  }
  return true
}

const handlePrev = (currentStep: number): boolean => {
  console.log('Previous clicked on step:', currentStep)
  return true
}
</script>
