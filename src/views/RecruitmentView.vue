<template>
  <v-container fluid>
    <RecruitmentFilterHeader
      @filter-change="onFilterChange"
      @search-change="onSearchChange"
      @sort-change="onSortChange"
      @view-mode-change="onViewModeChange"
    />

    <v-container fluid>
      <RecruitmentCard v-for="job in displayedJobs" :key="job.id" :job="job" />

      <!-- No jobs message -->
      <v-card v-if="displayedJobs.length === 0" class="pa-8 text-center">
        <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-briefcase-outline</v-icon>
        <h3 class="text-h6 text-grey-darken-1 mb-2">No jobs found</h3>
        <p class="text-body-2 text-grey-darken-2">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import RecruitmentFilterHeader from '@/components/recruitment/RecruitmentFilterHeader.vue'
import RecruitmentCard from '@/components/recruitment/RecruitmentCard.vue'
import NewViewDialog from '@/components/recruitment/NewViewDialog.vue'
import { jobService, type Job } from '@/services/jobService'

const dialogVisible = ref(false)
const allJobs = ref<Job[]>([])
const filteredJobs = ref<Job[]>([])
const searchedJobs = ref<Job[]>([])
const sortedJobs = ref<Job[]>([])
const viewMode = ref('list')

// Computed property for displayed jobs
const displayedJobs = computed(() => {
  // Apply filters first
  let jobs = filteredJobs.value.length > 0 ? filteredJobs.value : allJobs.value

  // Then apply search
  if (searchedJobs.value.length > 0) {
    jobs = jobs.filter(job =>
      searchedJobs.value.some(searchedJob => searchedJob.id === job.id)
    )
  }

  // Finally apply sorting
  if (sortedJobs.value.length > 0) {
    jobs = jobs.filter(job =>
      sortedJobs.value.some(sortedJob => sortedJob.id === job.id)
    )
  }

  return jobs
})

onMounted(() => {
  allJobs.value = jobService.getAllJobs()
  filteredJobs.value = []
  searchedJobs.value = []
  sortedJobs.value = []
})

// Event handlers
const onFilterChange = (jobs: Job[]) => {
  filteredJobs.value = jobs
}

const onSearchChange = (jobs: Job[]) => {
  searchedJobs.value = jobs
}

const onSortChange = (jobs: Job[]) => {
  sortedJobs.value = jobs
}

const onViewModeChange = (mode: string) => {
  viewMode.value = mode
  // You can implement grid view logic here if needed
}
</script>
