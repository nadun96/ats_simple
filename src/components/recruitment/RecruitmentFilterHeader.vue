<template>
  <v-row class="align-center mb-4 px-2">
    <v-col cols="12" md="6" class="d-flex align-center">
      <!-- Filter Chips -->
      <v-chip
        v-if="activeFilters.length > 0"
        class="ml-2"
        closable
        @click:close="clearAllFilters"
      >
        Filter ({{ activeFilters.length }})
      </v-chip>

      <!-- Filter Dropdown -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
            variant="outlined"
            prepend-icon="mdi-filter-variant"
          >
            Filter
          </v-btn>
        </template>
        <v-card min-width="300" class="pa-4">
          <v-card-title class="text-h6 pb-2">Filters</v-card-title>

          <!-- Status Filter -->
          <v-select
            v-model="filters.status"
            :items="statusOptions"
            label="Status"
            clearable
            hide-details
            class="mb-3"
            @update:model-value="applyFilters"
          />

          <!-- Job Type Filter -->
          <v-select
            v-model="filters.type"
            :items="typeOptions"
            label="Job Type"
            clearable
            hide-details
            class="mb-3"
            @update:model-value="applyFilters"
          />

          <!-- Company Filter -->
          <v-select
            v-model="filters.company"
            :items="companyOptions"
            label="Company"
            clearable
            hide-details
            class="mb-3"
            @update:model-value="applyFilters"
          />

          <!-- Experience Level Filter -->
          <v-select
            v-model="filters.experienceLevel"
            :items="experienceLevelOptions"
            label="Experience Level"
            clearable
            hide-details
            class="mb-3"
            @update:model-value="applyFilters"
          />

          <v-card-actions class="pa-0">
            <v-spacer />
            <v-btn
              variant="text"
              @click="clearAllFilters"
            >
              Clear All
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-col>

    <v-col cols="12" md="6" class="d-flex justify-end align-center">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        hide-details
        dense
        variant="outlined"
        @input="onSearch"
        class="max-width-200"
      />
      <v-select
        v-model="sortBy"
        class="ml-2"
        :items="sortOptions"
        label="Sort by"
        hide-details
        dense
        variant="outlined"
        @update:model-value="onSort"
      />
      <v-btn
        icon
        class="ml-2"
        :color="viewMode === 'list' ? 'primary' : undefined"
        @click="setViewMode('list')"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      <v-btn
        icon
        :color="viewMode === 'grid' ? 'primary' : undefined"
        @click="setViewMode('grid')"
      >
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { jobService, type Job } from '@/services/jobService'

// Emits
const emit = defineEmits<{
  'filter-change': [jobs: Job[]]
  'search-change': [jobs: Job[]]
  'sort-change': [jobs: Job[]]
  'view-mode-change': [mode: string]
}>()

// Reactive data
const searchQuery = ref('')
const sortBy = ref('Newest')
const viewMode = ref('list')

// Filters
const filters = ref({
  status: '',
  type: '',
  company: '',
  experienceLevel: ''
})

// Options for filters
const statusOptions = ['Public', 'Draft', 'Archived', 'Suspended']
const typeOptions = ['Freelance', 'Full-time', 'Part-time', 'Contract', 'Internship']
const companyOptions = computed(() => {
  const companies = jobService.getAllJobs().map(job => job.company.name)
  return [...new Set(companies)]
})
const experienceLevelOptions = ['Entry', 'Mid-Level', 'Mid-Senior', 'Senior', 'Lead', 'Principal']

const sortOptions = [
  { title: 'Newest', value: 'Newest' },
  { title: 'Oldest', value: 'Oldest' },
  { title: 'Title A-Z', value: 'Title A-Z' },
  { title: 'Title Z-A', value: 'Title Z-A' },
  { title: 'Most Applications', value: 'Most Applications' },
  { title: 'Least Applications', value: 'Least Applications' }
]

// Computed properties
const activeFilters = computed(() => {
  return Object.values(filters.value).filter(filter => filter !== '')
})

// Methods
const applyFilters = () => {
  let filteredJobs = jobService.getAllJobs()

  if (filters.value.status) {
    filteredJobs = filteredJobs.filter(job => job.status === filters.value.status)
  }

  if (filters.value.type) {
    filteredJobs = filteredJobs.filter(job => job.jobSettings.contractType === filters.value.type)
  }

  if (filters.value.company) {
    filteredJobs = filteredJobs.filter(job => job.company.name === filters.value.company)
  }

  if (filters.value.experienceLevel) {
    filteredJobs = filteredJobs.filter(job => job.jobSettings.experienceLevel === filters.value.experienceLevel)
  }

  emit('filter-change', filteredJobs)
}

const onSearch = () => {
  if (searchQuery.value.trim()) {
    const searchResults = jobService.searchJobs(searchQuery.value)
    emit('search-change', searchResults)
  } else {
    emit('search-change', jobService.getAllJobs())
  }
}

const onSort = () => {
  let sortedJobs = [...jobService.getAllJobs()]

  switch (sortBy.value) {
    case 'Newest':
      sortedJobs.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      break
    case 'Oldest':
      sortedJobs.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
      break
    case 'Title A-Z':
      sortedJobs.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'Title Z-A':
      sortedJobs.sort((a, b) => b.title.localeCompare(a.title))
      break
    case 'Most Applications':
      sortedJobs.sort((a, b) => b.applications - a.applications)
      break
    case 'Least Applications':
      sortedJobs.sort((a, b) => a.applications - b.applications)
      break
  }

  emit('sort-change', sortedJobs)
}

const setViewMode = (mode: string) => {
  viewMode.value = mode
  emit('view-mode-change', mode)
}

const clearAllFilters = () => {
  filters.value = {
    status: '',
    type: '',
    company: '',
    experienceLevel: ''
  }
  emit('filter-change', jobService.getAllJobs())
}

// Watch for filter changes
watch(filters, applyFilters, { deep: true })
</script>

<style scoped>
.max-width-200 {
  max-width: 200px;
}
</style>
