<!-- File: src/views/JobDetail.vue -->
<template>
  <v-container fluid class="pa-0 d-flex">
    <!-- Left Sidebar with job list -->
    <JobDetailSidebar
  v-model="selectedJobId"
  :jobs="jobs"
  :collapsed="collapsed"
  @toggle-collapse="handleToggleCollapse"
/>


    <!-- Main Content -->
    <v-main>
      <JobDetailHeader :job="selectedJob" />

      <!-- Tabs -->
      <JobTabs :selectedTab="selectedTab" @update-tab="selectedTab = $event" />

      <!-- Dynamic Tab Content -->
      <div class="px-4">
        <component :is="currentTabComponent" />
      </div>
    </v-main>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Components
import JobDetailSidebar from '@/components/job-detail/JobDetailSidebar.vue'
import JobDetailHeader from '@/components/job-detail/JobDetailHeader.vue'
import JobTabs from '@/components/job-detail/JobTabs.vue'

// Tab Components
import ApplicationsTab from '@/components/job-detail/ApplicationsTab.vue'
import ActivitiesTab from '@/components/job-detail/ActivitiesTab.vue'
import PromoteTab from '@/components/job-detail/PromoteTab.vue'
import ReportingTab from '@/components/job-detail/ReportingTab.vue'

// State
const jobs = ref([
  { id: 1, title: 'JAVA Engineer', type: 'Freelance', location: 'Paris' },
  { id: 2, title: 'Python Engineer', type: 'Freelance', location: 'Colombo' },
  { id: 3, title: 'Marketing Manager', type: 'CDD (6 m)', location: 'Paris' },
])

const selectedJobId = ref(1)
const sidebarCollapsed = ref(false)
const selectedTab = ref('applications')

const collapsed = ref(false)

function handleToggleCollapse(val: boolean) {
  collapsed.value = val
}



// Computed job
const selectedJob = computed(() => {
  return (
    jobs.value.find(job => job.id === selectedJobId.value) ?? {
      title: '',
      type: '',
      location: ''
    }
  )
})


// Component mapping based on selectedTab
const currentTabComponent = computed(() => {
  switch (selectedTab.value) {
    case 'applications':
      return ApplicationsTab
    case 'activities':
      return ActivitiesTab
    case 'promote':
      return PromoteTab
    case 'reporting':
      return ReportingTab
    default:
      return ApplicationsTab
  }
})
</script>
