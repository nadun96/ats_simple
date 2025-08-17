<template>
  <v-container>
    <CdStepper :steps="stepData" :activeStep="activeStep" @next="handleNext" @prev="handlePrev" />

    <!-- Action Buttons -->
    <div class="d-flex justify-space-between mt-6">
      <div class="d-flex gap-3">
        <v-btn
          variant="outlined"
          color="secondary"
          :loading="isLoading"
          @click="saveDraft"
        >
          Save Draft
        </v-btn>
        <v-btn
          variant="outlined"
          color="info"
          @click="previewJob"
        >
          Preview
        </v-btn>
      </div>

      <div class="d-flex gap-3">
        <v-btn
          variant="outlined"
          color="warning"
          @click="resetForm"
        >
          Reset
        </v-btn>
        <v-btn
          color="primary"
          :loading="isLoading"
          :disabled="!canProceedToNext"
          @click="createJob"
        >
          Create Job
        </v-btn>
      </div>
    </div>

    <!-- Error Display -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mt-4"
      closable
      @click:close="clearError"
    >
      {{ error }}
    </v-alert>

    <!-- Success Display -->
    <v-alert
      v-if="successMessage"
      type="success"
      variant="tonal"
      class="mt-4"
      closable
      @click:close="successMessage = ''"
    >
      {{ successMessage }}
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useJobCreationStore } from '@/stores'
import CdStepper from '@/components/molecules/CdStepper.vue'
import JobDescription from './tabs/step1/JobDescription.vue'
import ApplicationForm from './tabs/step2/ApplicationForm.vue'
import WorkFlow from './tabs/step3/WorkFlow.vue'
import JobTeam from './tabs/step4/JobTeam.vue'
import Promote from './tabs/step5/Promote.vue'

const router = useRouter()
const jobCreationStore = useJobCreationStore()

const activeStep = ref(1)
const successMessage = ref('')

// Destructure store values
const {
  jobData,
  isLoading,
  error,
  canProceedToNext,
  updateStepData,
  setCurrentStep,
  createJob: storeCreateJob,
  saveDraft: storeSaveDraft,
  resetForm: storeResetForm,
  clearError
} = jobCreationStore

interface JobDescriptionExpose {
  isValid: () => boolean
  getFormData: () => any
}

interface ApplicationFormExpose {
  getFormData: () => any
}

interface WorkflowExpose {
  getFormData: () => any
}

interface JobTeamExpose {
  getFormData: () => any
}

interface PromoteExpose {
  getFormData: () => any
}

const jobDescriptionRef = ref<JobDescriptionExpose | null>(null)
const applicationFormRef = ref<ApplicationFormExpose | null>(null)
const workflowRef = ref<WorkflowExpose | null>(null)
const jobTeamRef = ref<JobTeamExpose | null>(null)
const promoteRef = ref<PromoteExpose | null>(null)

const stepData = [
  {
    title: 'Job Description',
    content: {
      render: () => h(JobDescription, {
        ref: jobDescriptionRef,
        jobData: jobData,
        isEditing: false
      }),
    },
  },
  {
    title: 'Application Form',
    content: {
      render: () => h(ApplicationForm, { ref: applicationFormRef }),
    },
  },
  {
    title: 'Workflow',
    content: {
      render: () => h(WorkFlow, { ref: workflowRef }),
    },
  },
  {
    title: 'Job Team',
    content: {
      render: () => h(JobTeam, { ref: jobTeamRef }),
    },
  },
  {
    title: 'Promote',
    content: {
      render: () => h(Promote, { ref: promoteRef }),
    },
  },
]

const handleNext = async () => {
  // Collect data from current step before proceeding
  await collectStepData(activeStep.value)

  if (canProceedToNext.value) {
    activeStep.value++
    setCurrentStep(activeStep.value)
  }
}

const handlePrev = () => {
  if (activeStep.value > 1) {
    activeStep.value--
    setCurrentStep(activeStep.value)
  }
}

const collectStepData = async (step: number) => {
  try {
    let stepData: any = {}

    switch (step) {
      case 1:
        if (jobDescriptionRef.value?.getFormData) {
          stepData = jobDescriptionRef.value.getFormData()
        }
        break
      case 2:
        if (applicationFormRef.value?.getFormData) {
          stepData = applicationFormRef.value.getFormData()
        }
        break
      case 3:
        if (workflowRef.value?.getFormData) {
          stepData = workflowRef.value.getFormData()
        }
        break
      case 4:
        if (jobTeamRef.value?.getFormData) {
          stepData = jobTeamRef.value.getFormData()
        }
        break
      case 5:
        if (promoteRef.value?.getFormData) {
          stepData = promoteRef.value.getFormData()
        }
        break
    }

    if (Object.keys(stepData).length > 0) {
      updateStepData(step, stepData)
    }
  } catch (error) {
    console.error('Error collecting step data:', error)
  }
}

const createJob = async () => {
  // Collect data from all steps
  for (let step = 1; step <= 5; step++) {
    await collectStepData(step)
  }

  const createdJob = await storeCreateJob()

  if (createdJob) {
    successMessage.value = `Job "${createdJob.title}" created successfully!`
    // Redirect to job detail page after a short delay
    setTimeout(() => {
      router.push(`/recruitment/${createdJob.id}`)
    }, 2000)
  }
}

const saveDraft = async () => {
  // Collect data from all steps
  for (let step = 1; step <= 5; step++) {
    await collectStepData(step)
  }

  const success = await storeSaveDraft()

  if (success) {
    successMessage.value = 'Draft saved successfully!'
  }
}

const previewJob = () => {
  // Collect current step data
  collectStepData(activeStep.value)

  // Route to preview page with current data
  router.push({
    path: '/job/preview',
    query: { data: JSON.stringify(jobData) }
  })
}

const resetForm = () => {
  storeResetForm()
  activeStep.value = 1
  successMessage.value = ''
}

onMounted(() => {
  setCurrentStep(1)
})
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>
