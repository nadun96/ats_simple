<template>
  <v-container>
    <div v-if="loading" class="d-flex justify-center align-center" style="height: 200px;">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>

    <div v-else-if="!job" class="d-flex justify-center align-center" style="height: 200px;">
      <v-alert type="error" title="Job not found">
        The requested job could not be found.
      </v-alert>
    </div>

    <div v-else>
      <!-- Header with job title and actions -->
      <v-card class="mb-4 pa-4" variant="outlined">
        <v-row align="center" justify="space-between">
          <v-col>
            <h1 class="text-h4 font-weight-bold">{{ job.title }}</h1>
            <p class="text-subtitle-1 text-grey-darken-1">{{ job.location }}</p>
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="primary"
              variant="outlined"
              @click="saveJob"
              :loading="saving"
              class="mr-2"
            >
              Save Changes
            </v-btn>
            <v-btn
              color="secondary"
              variant="outlined"
              @click="goBack"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <!-- Job Workflow Stepper -->
      <CdStepper
        :steps="stepData"
        :activeStep="activeStep"
        @next="handleNext"
        @prev="handlePrev"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, h, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { useSnackbar } from 'vuetify'
import CdStepper from '@/components/molecules/CdStepper.vue'
import JobDescription from './tabs/step1/JobDescription.vue'
import ApplicationForm from './tabs/step2/ApplicationForm.vue'
import WorkFlow from './tabs/step3/WorkFlow.vue'
import JobTeam from './tabs/step4/JobTeam.vue'
import Promote from './tabs/step5/Promote.vue'
import { jobService, type Job } from '@/services/jobService'

const route = useRoute()
const router = useRouter()
// const { show } = useSnackbar()

const activeStep = ref(1)
const loading = ref(true)
const saving = ref(false)
const job = ref<Job | null>(null)

// Refs for form components to access their data
const jobDescriptionRef = ref()
const applicationFormRef = ref()
const workflowRef = ref()
const teamRef = ref()
const promotionRef = ref()

// Load job data on component mount
onMounted(async () => {
  const jobId = parseInt(route.params.id as string)
  if (isNaN(jobId)) {
    console.error('Invalid job ID')
    goBack()
    return
  }

  const jobData = jobService.getJobById(jobId)
  if (!jobData) {
    console.error('Job not found')
    goBack()
    return
  }

  job.value = jobData
  loading.value = false
})

// Step data with components that will receive the job data
const stepData = computed(() => [
  {
    title: 'Job Description',
    content: {
      render: () => h(JobDescription, {
        ref: jobDescriptionRef,
        jobData: job.value || undefined,
        isEditing: true
      }),
    },
  },
  {
    title: 'Form',
    content: {
      render: () => h(ApplicationForm, {
        ref: applicationFormRef,
        jobData: job.value || undefined,
        isEditing: true
      }),
    },
  },
  {
    title: 'Workflow',
    content: {
      render: () => h(WorkFlow, {
        ref: workflowRef,
        jobData: job.value || undefined,
        isEditing: true
      }),
    },
  },
  {
    title: 'Job Team',
    content: h(JobTeam, {
      ref: teamRef,
      jobData: job.value || undefined,
      isEditing: true
    }),
  },
  {
    title: 'Promote',
    content: h(Promote, {
      ref: promotionRef,
      jobData: job.value || undefined,
      isEditing: true
    }),
  },
])

const handleNext = () => {
  if (activeStep.value < stepData.value.length) {
    activeStep.value++
  }
}

const handlePrev = () => {
  if (activeStep.value > 1) {
    activeStep.value--
  }
}

const saveJob = async () => {
  if (!job.value) return

  saving.value = true

  try {
    // Collect data from all form components
    const updatedJobData = {
      ...job.value,
      // Add any form-specific updates here if needed
    }

    const updatedJob = jobService.updateJob(job.value.id, updatedJobData)

    if (updatedJob) {
      job.value = updatedJob
      console.log('Job updated successfully!')
      goBack()
    } else {
      console.error('Failed to update job')
    }
  } catch (error) {
    console.error('Error saving job:', error)
  } finally {
    saving.value = false
  }
}

const goBack = () => {
  router.push('/recruitment')
}
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
