<template>
  <PublicLayout>
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container class="py-16">
        <v-row justify="center" align="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">
              Find Your Dream Job
            </h1>
            <p class="text-h5 text-grey-darken-1 mb-8">
              Discover thousands of job opportunities with all the information you need.
              Its your future.
            </p>

            <!-- Search Bar -->
            <v-card class="search-card" elevation="8">
              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="searchQuery"
                      label="What job are you looking for?"
                      prepend-inner-icon="mdi-briefcase"
                      variant="outlined"
                      density="comfortable"
                      clearable
                      placeholder="Job title, keywords, or company"
                      @update:model-value="filterJobs"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      v-model="selectedLocation"
                      label="Where?"
                      prepend-inner-icon="mdi-map-marker"
                      :items="filterOptions.locations"
                      variant="outlined"
                      density="comfortable"
                      clearable
                      placeholder="City, state, or remote"
                      @update:model-value="filterJobs"
                    />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-btn
                      color="primary"
                      variant="elevated"
                      size="x-large"
                      block
                      @click="filterJobs"
                      class="search-btn"
                    >
                      <v-icon left>mdi-magnify</v-icon>
                      Search Jobs
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <v-container class="py-8">
        <!-- Filter Section -->
        <v-card class="mb-6" elevation="2">
          <v-card-text class="pa-6">
            <v-row align="center">
              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedType"
                  label="Job Type"
                  :items="filterOptions.types"
                  variant="outlined"
                  density="compact"
                  clearable
                  @update:model-value="filterJobs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedExperience"
                  label="Experience Level"
                  :items="filterOptions.experienceLevels"
                  variant="outlined"
                  density="compact"
                  clearable
                  @update:model-value="filterJobs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-checkbox
                  v-model="showRemoteOnly"
                  label="Remote Only"
                  color="primary"
                  @change="filterJobs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-btn
                  variant="outlined"
                  @click="clearFilters"
                  block
                >
                  Clear Filters
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Jobs List -->
        <v-row>
          <v-col cols="12" lg="8">
            <div v-if="filteredJobs.length === 0" class="text-center py-12">
              <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-briefcase-off</v-icon>
              <h3 class="text-h5 text-grey-darken-1 mb-2">No jobs found</h3>
              <p class="text-body-1 text-grey">Try adjusting your search criteria</p>
            </div>

            <v-card
              v-for="job in filteredJobs"
              :key="job.id"
              class="mb-4 job-card"
              elevation="2"
              @click="selectJob(job)"
              :class="{ 'selected-job': selectedJob?.id === job.id }"
            >
              <v-card-text class="pa-6">
                <div class="d-flex justify-space-between align-start">
                  <div class="flex-grow-1">
                    <div class="d-flex align-center mb-2">
                      <h3 class="text-h5 font-weight-bold mb-0">{{ job.title }}</h3>
                      <v-chip
                        v-if="job.isRemote"
                        size="small"
                        color="success"
                        variant="outlined"
                        class="ml-3"
                      >
                        Remote
                      </v-chip>
                    </div>

                    <p class="text-body-1 text-grey-darken-1 mb-3">{{ job.company }}</p>

                    <div class="d-flex align-center mb-4">
                      <v-icon size="small" color="grey" class="mr-2">mdi-map-marker</v-icon>
                      <span class="text-body-1">{{ job.location }}</span>

                      <v-icon size="small" color="grey" class="ml-4 mr-2">mdi-clock</v-icon>
                      <span class="text-body-1">{{ job.type }}</span>

                      <v-icon size="small" color="grey" class="ml-4 mr-2">mdi-currency-usd</v-icon>
                      <span class="text-body-1">{{ job.salary }}</span>
                    </div>

                    <p class="text-body-1 text-grey-darken-2 line-clamp-2 mb-4">
                      {{ job.description }}
                    </p>

                    <div class="d-flex flex-wrap gap-2 mb-4">
                      <v-chip
                        v-for="skill in job.skills.slice(0, 3)"
                        :key="skill"
                        size="small"
                        variant="outlined"
                        color="primary"
                      >
                        {{ skill }}
                      </v-chip>
                      <v-chip
                        v-if="job.skills.length > 3"
                        size="small"
                        variant="outlined"
                        color="grey"
                      >
                        +{{ job.skills.length - 3 }} more
                      </v-chip>
                    </div>

                    <div class="d-flex align-center">
                      <v-icon size="small" color="grey" class="mr-2">mdi-calendar</v-icon>
                      <span class="text-body-2 text-grey-darken-1">Posted {{ job.postedDate }}</span>

                      <v-icon size="small" color="grey" class="ml-4 mr-2">mdi-account-group</v-icon>
                      <span class="text-body-2 text-grey-darken-1">{{ job.totalApplications }} applications</span>
                    </div>
                  </div>

                  <v-btn
                    color="primary"
                    variant="outlined"
                    size="large"
                    @click.stop="openApplicationDialog(job)"
                    class="ml-4"
                  >
                    Apply Now
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Job Details Sidebar -->
          <v-col cols="12" lg="4">
            <v-card v-if="selectedJob" class="sticky-sidebar" elevation="3">
              <v-card-title class="text-h6 font-weight-bold">
                Job Details
              </v-card-title>

              <v-card-text>
                <h4 class="text-h5 font-weight-bold mb-3">{{ selectedJob.title }}</h4>
                <p class="text-body-1 text-grey-darken-1 mb-4">{{ selectedJob.company }}</p>

                <div class="mb-4">
                  <h6 class="text-subtitle-1 font-weight-bold mb-2">Job Overview</h6>
                  <div class="d-flex align-center mb-2">
                    <v-icon size="small" color="grey" class="mr-2">mdi-map-marker</v-icon>
                    <span class="text-body-2">{{ selectedJob.location }}</span>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon size="small" color="grey" class="mr-2">mdi-clock</v-icon>
                    <span class="text-body-2">{{ selectedJob.type }}</span>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon size="small" color="grey" class="mr-2">mdi-currency-usd</v-icon>
                    <span class="text-body-2">{{ selectedJob.salary }}</span>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon size="small" color="grey" class="mr-2">mdi-calendar</v-icon>
                    <span class="text-body-2">Posted {{ selectedJob.postedDate }}</span>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon size="small" color="grey" class="mr-2">mdi-account-group</v-icon>
                    <span class="text-body-2">{{ selectedJob.totalApplications }} applications</span>
                  </div>
                  <div v-if="selectedJob.applicationDeadline" class="d-flex align-center mb-2">
                    <v-icon size="small" color="grey" class="mr-2">mdi-calendar-clock</v-icon>
                    <span class="text-body-2">Deadline: {{ selectedJob.applicationDeadline }}</span>
                  </div>
                </div>

                <div class="mb-4">
                  <h6 class="text-subtitle-1 font-weight-bold mb-2">Required Skills</h6>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip
                      v-for="skill in selectedJob.skills"
                      :key="skill"
                      size="small"
                      variant="outlined"
                      color="primary"
                    >
                      {{ skill }}
                    </v-chip>
                  </div>
                </div>

                <div class="mb-4">
                  <h6 class="text-subtitle-1 font-weight-bold mb-2">Job Description</h6>
                  <p class="text-body-2">{{ selectedJob.description }}</p>
                </div>

                <div class="mb-4">
                  <h6 class="text-subtitle-1 font-weight-bold mb-2">Responsibilities</h6>
                  <ul class="text-body-2">
                    <li v-for="responsibility in selectedJob.responsibilities.slice(0, 3)" :key="responsibility">
                      {{ responsibility }}
                    </li>
                    <li v-if="selectedJob.responsibilities.length > 3" class="text-grey">
                      +{{ selectedJob.responsibilities.length - 3 }} more responsibilities
                    </li>
                  </ul>
                </div>

                <div class="mb-4">
                  <h6 class="text-subtitle-1 font-weight-bold mb-2">Benefits</h6>
                  <ul class="text-body-2">
                    <li v-for="benefit in selectedJob.benefits.slice(0, 3)" :key="benefit">
                      {{ benefit }}
                    </li>
                    <li v-if="selectedJob.benefits.length > 3" class="text-grey">
                      +{{ selectedJob.benefits.length - 3 }} more benefits
                    </li>
                  </ul>
                </div>

                <v-btn
                  color="primary"
                  variant="elevated"
                  size="large"
                  block
                  @click="openApplicationDialog(selectedJob)"
                >
                  Apply for this Position
                </v-btn>
              </v-card-text>
            </v-card>

            <v-card v-else class="text-center py-8" elevation="2">
              <v-icon size="48" color="grey-lighten-1" class="mb-4">mdi-briefcase</v-icon>
              <h4 class="text-h6 text-grey-darken-1 mb-2">Select a Job</h4>
              <p class="text-body-2 text-grey">Choose a job from the list to view details</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Job Application Dialog -->
    <JobApplicationDialog
      v-model="showApplicationDialog"
      :job="selectedJobForApplication"
      @application-submitted="handleApplicationSubmitted"
    />
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { JobApplicationDialog } from '@/components/public'
import { publicJobService, type PublicJob, type JobApplication } from '@/services/publicJobService'
import { PublicLayout } from '@/components/layout'

// Search and filter
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedType = ref('')
const selectedExperience = ref('')
const showRemoteOnly = ref(false)

// Jobs data
const jobs = ref<PublicJob[]>([])
const selectedJob = ref<PublicJob | null>(null)
const selectedJobForApplication = ref<PublicJob | null>(null)
const showApplicationDialog = ref(false)

  // Filter options
  const filterOptions = ref<{
    locations: string[]
    types: string[]
    experienceLevels: string[]
  }>({
    locations: [],
    types: [],
    experienceLevels: []
  })

// Computed
const filteredJobs = computed(() => {
  let filtered = jobs.value

  // Apply search filter
  if (searchQuery.value) {
    filtered = publicJobService.searchPublicJobs(searchQuery.value)
  }

  // Apply other filters
  const filters: {
    location?: string
    type?: string
    experienceLevel?: string
    isRemote?: boolean
  } = {}

  if (selectedLocation.value) {
    filters.location = selectedLocation.value
  }

  if (selectedType.value) {
    filters.type = selectedType.value
  }

  if (selectedExperience.value) {
    filters.experienceLevel = selectedExperience.value
  }

  if (showRemoteOnly.value) {
    filters.isRemote = true
  }

  if (Object.keys(filters).length > 0) {
    filtered = publicJobService.filterPublicJobs(filters)
  }

  return filtered
})

// Methods
const loadJobs = () => {
  const publicJobs = publicJobService.getPublicJobs()
  jobs.value = publicJobs
  filterOptions.value = publicJobService.getFilterOptions()
}

const filterJobs = () => {
  // Filtering is handled by computed property
  console.log('Filtering jobs with:', {
    searchQuery: searchQuery.value,
    location: selectedLocation.value,
    type: selectedType.value,
    experience: selectedExperience.value,
    remoteOnly: showRemoteOnly.value
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedLocation.value = ''
  selectedType.value = ''
  selectedExperience.value = ''
  showRemoteOnly.value = false
}

const selectJob = (job: PublicJob) => {
  selectedJob.value = job
}

const openApplicationDialog = (job: PublicJob) => {
  selectedJobForApplication.value = job
  showApplicationDialog.value = true
}

const handleApplicationSubmitted = (application: JobApplication) => {
  console.log('Application submitted:', application)
  // Refresh jobs to update application count
  loadJobs()

  // Show success message
  // TODO: Add toast notification
  alert('Application submitted successfully!')
}



// Lifecycle
onMounted(() => {
  loadJobs()
  // Select first job by default
  if (jobs.value.length > 0) {
    selectedJob.value = jobs.value[0]
  }
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 0;
}

.search-card {
  background: white;
  border-radius: 16px;
}

.search-btn {
  height: 56px;
}

.main-content {
  background-color: #f8f9fa;
}

.job-card {
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  border-radius: 12px;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.selected-job {
  border: 2px solid #1976d2;
  background-color: #f3f8ff;
}

.sticky-sidebar {
  position: sticky;
  top: 24px;
  background: white;
  border-radius: 12px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gap-1 {
  gap: 4px;
}

.gap-2 {
  gap: 8px;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 4px;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .hero-section {
    padding: 2rem 0;
  }

  .search-card {
    margin: 0 1rem;
  }
}
</style>
