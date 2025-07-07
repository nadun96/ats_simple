<template>
  <h1>Sample Page</h1>
  <cd-stepper :steps="stepData" :onNext="handleNext" :onPrev="handlePrev"></cd-stepper>
</template>

<script lang="ts">
import CdStepper from '@/components/CdStepper.vue'

export default {
  components: {
    'cd-stepper': CdStepper,
  },
  data() {
    return {
      stepData: [
        {
          title: 'Job Description',
          content: '<div>Content for Job Description</div>',
        },
        {
          title: 'Form',
          content: '<div>Content for Form</div>',
        },
        {
          title: 'Workflow',
          content: '<div>Content for Workflow</div>',
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
