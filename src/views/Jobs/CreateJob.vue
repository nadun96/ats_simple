<template>
  <v-container>
    <CdStepper :steps="stepData" :onNext="handleNext" :onPrev="handlePrev" />
  </v-container>
</template>

<script setup lang="ts">
import CdStepper from '@/components/molecules/CdStepper.vue'
import { h, type Component } from 'vue'
import JobDescription from './tabs/step1/JobDescription.vue'
import WorkFlow from './tabs/step3/WorkFlow.vue'

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
    content: {
      render: () => h('div', 'Content for Form'),
    },
  },
  {
    title: 'Workflow',
    content: WorkFlow,
  },
  {
    title: 'Job Team',
    content: {
      render: () => h('div', 'Content for Job Team'),
    },
  },
  {
    title: 'Promote',
    content: {
      render: () => h('div', 'Content for Promote'),
    },
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
