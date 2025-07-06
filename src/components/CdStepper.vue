<template>
  <v-stepper v-model="activeStep" :items="steps.map(s => s.title)" prev-text="Previous" next-text="Next">
    <v-card flat :title="steps[activeStep - 1].title">
      <div style="padding-inline: 16px;" v-if="typeof steps[activeStep - 1].content === 'string'" v-html="steps[activeStep - 1].content" />
      <component v-else :is="steps[activeStep - 1].content" />
    </v-card>
  </v-stepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  steps: {
    title: string
    content: string | object
  }[]
}>()

const activeStep = ref(1) // Vuetify stepper is 1-based
</script>