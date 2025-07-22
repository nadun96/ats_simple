<template>
  <cd-stepper :steps="stepData" :onNext="handleNext" :onPrev="handlePrev"></cd-stepper>
</template>

<script lang="ts">
import CdStepper from '@/components/molecules/CdStepper.vue'
import JobDescription from './tabs/step1/JobDescription.vue'
import Workflow from './tabs/step3/WorkFlow.vue'

export default {
  components: {
    'cd-stepper': CdStepper,
  },
  data() {
    return {
      stepData: [
        {
          title: 'Job Description',
          content: JobDescription,
        },
        {
          title: 'Form',
          content: '<div>Content for Form</div>',
        },
        {
          title: 'Workflow',
          content: Workflow,
        },
        {
          title: 'Job Team',
          content: '<div>Content for Job Team</div>',
        },
        {
          title: 'Promote',
          content: '<div>Content for Promote</div>',
        },
      ],
    }
  },
  methods: {
    handleNext(currentStep: number) {
      console.log('Next clicked on step:', currentStep)
      // Example: Validate something at step 2
      if (currentStep === 2) {
        const isFormValid = true // Replace with actual logic
        if (!isFormValid) {
          alert('Please complete the form before continuing.')
          return false
        }
      }
      return true // allow step transition
    },
    handlePrev(currentStep: number) {
      console.log('Previous clicked on step:', currentStep)
      return true // allow going back
    },
  },
}
</script>
