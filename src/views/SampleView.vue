<template>
  <h1>Sample Page</h1>
  <cd-stepper :steps="stepData"></cd-stepper>
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
          title: 'Step 1',
          content: '<div>Content for Step 1</div>',
        },
        {
          title: 'Step 2',
          content: '<div>Content for Step 2</div>',
        },
        {
          title: 'Step 3',
          content: '<div>Content for Step 3</div>',
        },
      ],
    }
  },
}
</script>
