<!-- File: src/views/JobDetail.vue -->
<template>
  <v-container fluid class="pa-0 d-flex">
    <!-- Left Sidebar with job list -->
    <JobDetailSidebar
      :jobs="jobs"
      :model-value="selectedJobId"
      :collapsed="sidebarCollapsed"
      @update:selectedJobId="selectedJobId = $event"
      @toggle-collapse="sidebarCollapsed = !sidebarCollapsed"
    />

    <!-- Main Content -->
    <v-main>
      <div v-if="!selectedJob" class="d-flex justify-center align-center" style="height: 400px;">
        <v-alert type="info" title="No job selected">
          Please select a job from the sidebar or the job was not found.
        </v-alert>
      </div>

      <template v-else>
        <JobDetailHeader :job="selectedJob" />

        <!-- Tabs -->
        <JobTabs :selectedTab="selectedTab" @update-tab="selectedTab = $event" />

        <!-- Dynamic Tab Content -->
        <div class="px-4">
          <component :is="currentTabComponent" />
        </div>
      </template>
    </v-main>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { jobService, type Job } from '@/services/jobService'

// Components
import JobDetailSidebar from '@/components/job-detail/JobDetailSidebar.vue'
import JobDetailHeader from '@/components/job-detail/JobDetailHeader.vue'
import JobTabs from '@/components/job-detail/JobTabs.vue'

// Tab Components
import ApplicationsTab from '@/components/job-detail/ApplicationsTab.vue'
import ActivitiesTab from '@/components/job-detail/ActivitiesTab.vue'
import PromoteTab from '@/components/job-detail/PromoteTab.vue'
import ReportingTab from '@/components/job-detail/ReportingTab.vue'

// Props and Route
interface Props {
  id: string
}

const props = defineProps<Props>()

// State
const jobs = ref<Job[]>([])
const selectedJobId = ref<number>(1)
const sidebarCollapsed = ref(false)
const selectedTab = ref('applications')

// Load jobs and set selected job based on props
onMounted(() => {
  console.log('JobDetail mounted, props:', props)
  jobs.value = jobService.getAllJobs()
  console.log('Loaded jobs:', jobs.value)

  // Set selected job based on props
  const jobId = parseInt(props.id)
  console.log('Props job ID:', jobId)
  if (!isNaN(jobId) && jobs.value.some(job => job.id === jobId)) {
    selectedJobId.value = jobId
    console.log('Set selected job ID to:', selectedJobId.value)
  } else {
    console.log('Invalid job ID or job not found')
  }
})

// Computed job
const selectedJob = computed(() => {
  console.log('Computing selectedJob, selectedJobId:', selectedJobId.value, 'jobs:', jobs.value)
  const job = jobs.value.find(job => job.id === selectedJobId.value)
  console.log('Found job:', job)
  if (!job) return null

  // Map the job data to be compatible with JobDetail components
  const mappedJob = {
    ...job,
    company: job.company.name, // Convert company object to string for header
    type: job.jobSettings.contractType, // Use contract type from settings
    location: `${job.jobSettings.location.city}, ${job.jobSettings.location.country}` // Use location from settings
  }
  console.log('Mapped job:', mappedJob)
  return mappedJob
})

// Component mapping based on selectedTab
const currentTabComponent = computed(() => {
  // Get the original job data from the jobs array
  const originalJob = jobs.value.find(job => job.id === selectedJobId.value)
  switch (selectedTab.value) {
    case 'applications':
      return h(ApplicationsTab, { jobData: originalJob })
    case 'activities':
      return h(ActivitiesTab, { jobData: originalJob })
    case 'promote':
      return h(PromoteTab, { jobData: originalJob })
    case 'reporting':
      return h(ReportingTab, { jobData: originalJob })
    default:
      return h(ApplicationsTab, { jobData: originalJob })
  }
})
</script>
