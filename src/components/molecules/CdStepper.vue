<template>
  <div>
    <!-- Stepper Header -->
    <div class="custom-stepper">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-item"
        :class="{
          active: activeStep === index + 1,
          completed: activeStep > index + 1,
        }"
      >
        <div class="step-circle">
          <span v-if="activeStep > index + 1">✔</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="step-title">{{ step.title }}</div>
        <div v-if="index !== steps.length - 1" class="step-line" />
      </div>
    </div>

    <!-- Step Content -->
    <div
      v-if="typeof steps[activeStep - 1].content === 'string'"
      v-html="steps[activeStep - 1].content"
    ></div>
    <component v-else :is="steps[activeStep - 1].content" />

    <!-- Navigation -->
    <div class="mt-4 d-flex justify-space-between">
      <v-btn :disabled="activeStep === 1" @click="prevStep" variant="outlined" color="primary"
        >Previous</v-btn
      >
      <v-btn :disabled="activeStep === steps.length" @click="nextStep" color="primary">Next</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  steps: {
    title: string
    content: string | object
  }[]
  onNext?: (currentStep: number) => boolean | Promise<boolean> | void
  onPrev?: (currentStep: number) => boolean | Promise<boolean> | void
}>()

const steps = props.steps
const activeStep = ref(1)

const nextStep = async () => {
  if (activeStep.value < steps.length) {
    const proceed = props.onNext ? await props.onNext(activeStep.value) : true
    if (proceed !== false) {
      activeStep.value++
    }
  }
}

const prevStep = async () => {
  if (activeStep.value > 1) {
    const proceed = props.onPrev ? await props.onPrev(activeStep.value) : true
    if (proceed !== false) {
      activeStep.value--
    }
  }
}
</script>

<style scoped>
.custom-stepper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
}

.step-item {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 0;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  z-index: 1;
}

.step-title {
  margin-left: 8px;
  font-size: 14px;
  color: #444;
  white-space: nowrap;
}

.step-line {
  height: 2px;
  background-color: #ccc;
  flex: 1;
  margin-left: 12px;
  margin-right: 12px;
  z-index: 0;
}

.step-item.active .step-circle {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.step-item.completed .step-circle {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}
</style>
