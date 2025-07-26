<template>
  <h1>Sample Page</h1>
  <v-container class="my-3 px-0">
    <cd-text-input
      :label="'Your landing page'"
      :hint="'www.example.com/page'"
      :persistent-hint="true"
      @update:modelValue="onInputChange"
    ></cd-text-input>
  </v-container>
  <v-container class="my-3 px-0">
    <cd-rich-text-editor />
  </v-container>
  <v-file-upload clearable density="comfortable" variant="comfortable"></v-file-upload>
</template>

<script lang="ts">
import { CdTextInput } from '@/components/atoms'
import { CdRichTextEditor } from '@/components/molecules'

export default {
  components: {
    'cd-text-input': CdTextInput,
    'cd-rich-text-editor': CdRichTextEditor,
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
    onInputChange(value: string) {
      console.log('text field updated:', value)
    },
  },
}
</script>
