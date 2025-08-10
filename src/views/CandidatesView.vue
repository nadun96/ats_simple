<template>
  <div class="candidates-page">
    <div class="candidates-container">
      <!-- Header Section -->
      <div class="candidates-header">
        <div class="header-content">
          <h1 class="text-h4 font-weight-bold text-grey-darken-3 mb-2">
            All Profiles - CV Library
          </h1>
          <p class="text-body-1 text-grey-darken-1 mb-6">
            View and manage candidates across all your job postings and recruitment campaigns
          </p>
        </div>

        <div class="header-actions">
          <v-btn
            color="secondary"
            variant="outlined"
            prepend-icon="mdi-filter-remove"
            size="large"
            @click="clearAllFilters"
            class="clear-filters-btn mr-3"
          >
            Clear Filters
          </v-btn>
          <v-btn
            color="info"
            variant="outlined"
            prepend-icon="mdi-download"
            size="large"
            @click="exportCandidates"
            class="export-btn mr-3"
          >
            Export
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            prepend-icon="mdi-plus"
            size="large"
            @click="goToCreateCandidate"
            class="create-candidate-btn"
          >
            Add Candidate
          </v-btn>
        </div>
      </div>

      <!-- Filters Section -->
      <v-card class="filters-card mb-6" elevation="1">
        <v-card-text class="pa-6">
          <div class="filters-content">
            <!-- Search Bar -->
            <div class="search-section">
              <v-text-field
                v-model="filters.search"
                prepend-inner-icon="mdi-magnify"
                placeholder="Search candidates by name, email, or skills..."
                variant="outlined"
                density="compact"
                hide-details
                class="search-input"
                clearable
              />
            </div>

            <!-- Filter Chips -->
            <div class="filter-chips">
              <v-chip-group
                v-model="selectedFilters"
                column
                multiple
                class="filter-group"
              >
                <v-chip
                  v-for="status in Object.values(CandidateStatus)"
                  :key="status"
                  :value="status"
                  variant="outlined"
                  size="small"
                  :color="getStatusColor(status)"
                  class="status-chip"
                >
                  {{ formatStatus(status) }}
                </v-chip>
              </v-chip-group>
            </div>

            <!-- Advanced Filters -->
            <div class="advanced-filters">
              <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon start>mdi-filter-variant</v-icon>
                    Advanced Filters
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="filters.experience"
                          :items="experienceOptions"
                          label="Experience Level"
                          variant="outlined"
                          density="compact"
                          multiple
                          chips
                          hide-details
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="filters.location"
                          :items="locationOptions"
                          label="Location"
                          variant="outlined"
                          density="compact"
                          multiple
                          chips
                          hide-details
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="filters.talentPools"
                          :items="talentPoolOptions"
                          label="Talent Pools"
                          variant="outlined"
                          density="compact"
                          multiple
                          chips
                          hide-details
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="filters.appliedJobs"
                          :items="jobOptions"
                          label="Applied Jobs"
                          variant="outlined"
                          density="compact"
                          multiple
                          chips
                          hide-details
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Candidates List -->
      <v-card class="candidates-list-card" elevation="1">
        <v-card-text class="pa-6">
          <div v-if="filteredCandidates.length > 0">
            <div class="d-flex justify-space-between align-center mb-4">
              <h3 class="text-h5 font-weight-bold">Candidates ({{ filteredCandidates.length }})</h3>
            </div>

            <div class="candidates-grid">
              <v-card
                v-for="candidate in filteredCandidates"
                :key="candidate.id"
                class="candidate-card mb-4"
                elevation="2"
                hover
              >
                <v-card-text class="pa-4">
                  <!-- Header with Avatar and Status -->
                  <div class="d-flex align-center mb-3">
                    <v-avatar size="56" class="mr-3">
                      <div class="avatar-placeholder text-h5 font-weight-bold">
                        {{ getInitials(candidate.firstName, candidate.lastName) }}
                      </div>
                    </v-avatar>
                    <div class="flex-grow-1">
                      <h4 class="text-h6 font-weight-bold mb-1">
                        {{ candidate.firstName }} {{ candidate.lastName }}
                      </h4>
                      <p class="text-body-2 text-grey-darken-1 mb-1">{{ candidate.email }}</p>
                      <p class="text-caption text-grey">{{ candidate.phone }}</p>
                    </div>
                    <v-chip
                      :color="getStatusColor(candidate.status)"
                      size="small"
                      variant="flat"
                      class="status-chip"
                    >
                      {{ formatStatus(candidate.status) }}
                    </v-chip>
                  </div>

                  <!-- Details Row -->
                  <div class="candidate-details mb-3">
                    <div class="detail-item d-flex align-center mb-2">
                      <v-icon size="16" color="primary" class="mr-2">mdi-map-marker</v-icon>
                      <span class="text-body-2">{{ candidate.location || 'Location not specified' }}</span>
                    </div>
                    <div class="detail-item d-flex align-center mb-2">
                      <v-icon size="16" color="primary" class="mr-2">mdi-briefcase</v-icon>
                      <span class="text-body-2">{{ candidate.experience }} year{{ candidate.experience !== 1 ? 's' : '' }} experience</span>
                    </div>
                    <div class="detail-item d-flex align-center mb-2">
                      <v-icon size="16" color="primary" class="mr-2">mdi-star</v-icon>
                      <span class="text-body-2">{{ candidate.rating }}/5 rating</span>
                    </div>
                  </div>

                  <!-- Applied Jobs -->
                  <div class="applied-jobs mb-3" v-if="candidate.appliedJobs.length > 0">
                    <h6 class="text-subtitle-2 font-weight-bold mb-2">Applied Jobs:</h6>
                    <div class="jobs-list">
                      <v-chip
                        v-for="job in candidate.appliedJobs.slice(0, 3)"
                        :key="job.id"
                        size="small"
                        variant="outlined"
                        class="job-chip mr-1 mb-1"
                        :color="getJobStatusColor(job.status)"
                      >
                        <v-icon size="12" class="mr-1">{{ getJobStatusIcon(job.status) }}</v-icon>
                        {{ job.title }}
                      </v-chip>
                      <v-chip
                        v-if="candidate.appliedJobs.length > 3"
                        size="small"
                        variant="text"
                        color="primary"
                        class="more-jobs-chip"
                      >
                        +{{ candidate.appliedJobs.length - 3 }} more
                      </v-chip>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="candidate-actions d-flex justify-end">
                    <v-btn
                      variant="text"
                      size="small"
                      color="primary"
                      @click="viewCandidate(candidate)"
                      class="mr-2"
                    >
                      <v-icon size="16" class="mr-1">mdi-eye</v-icon>
                      View
                    </v-btn>
                    <v-btn
                      variant="text"
                      size="small"
                      color="secondary"
                      @click="editCandidate(candidate)"
                      class="mr-2"
                    >
                      <v-icon size="16" class="mr-1">mdi-pencil</v-icon>
                      Edit
                    </v-btn>
                    <v-btn
                      variant="text"
                      size="small"
                      color="info"
                      @click="downloadCV(candidate)"
                      :disabled="!candidate.cvUrl"
                    >
                      <v-icon size="16" class="mr-1">mdi-download</v-icon>
                      CV
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center pa-8">
            <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-account-group-outline</v-icon>
            <h3 class="text-h6 text-grey-darken-1 mb-2">No Candidates Found</h3>
            <p class="text-body-2 text-grey-darken-1 mb-4">
              No candidates match your current filters. Try adjusting your search criteria.
            </p>
            <v-btn
              color="primary"
              variant="elevated"
              prepend-icon="mdi-plus"
              @click="goToCreateCandidate"
            >
              Add First Candidate
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import type { Candidate, CandidateFilters } from '@/types/interfaces/candidate-types'
import { CandidateStatus, JobApplicationStatus } from '@/types/interfaces/candidate-types'

const router = useRouter()

// Mock data - replace with actual API calls
const candidates = ref<Candidate[]>([
  {
    id: '1',
    firstName: 'Nadun',
    lastName: 'Bandara',
    email: 'nadunudaraka@gmail.com',
    phone: '71 63 36 78 8',
    countryCode: '+33',
    age: 28,
    experience: 1,
    studyLevel: 'No diploma',
    location: 'Paris, France',
    availability: 'Jul 16, 2025',
    salary: { min: 30000, max: 35000, currency: 'EUR' },
    status: CandidateStatus.NEW,
    appliedJobs: [
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Tech Corp',
        status: JobApplicationStatus.APPLIED,
        appliedDate: '2024-01-15',
        contractType: 'CDD',
        duration: '6 months',
        location: 'Paris',
        remote: true
      },
      {
        id: '5',
        title: 'Junior Developer',
        company: 'Startup Inc',
        status: JobApplicationStatus.REVIEWING,
        appliedDate: '2024-01-18',
        contractType: 'CDI',
        duration: 'Permanent',
        location: 'Paris',
        remote: false
      }
    ],
    talentPools: ['Sourcing'],
    tags: ['JavaScript', 'React', 'Node.js'],
    rating: 4,
    notes: 'Promising candidate with good technical skills',
    cvUrl: 'https://example.com/cv/nadun-bandara.pdf',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@email.com',
    phone: '06 12 34 56 78',
    countryCode: '+33',
    age: 32,
    experience: 5,
    studyLevel: 'Master\'s degree',
    location: 'Lyon, France',
    availability: 'Immediate',
    salary: { min: 45000, max: 55000, currency: 'EUR' },
    status: CandidateStatus.CV_SELECTED,
    appliedJobs: [
      {
        id: '2',
        title: 'Senior Developer',
        company: 'Innovation Labs',
        status: JobApplicationStatus.REVIEWING,
        appliedDate: '2024-01-10',
        contractType: 'CDI',
        duration: 'Permanent',
        location: 'Lyon',
        remote: false
      },
      {
        id: '3',
        title: 'Tech Lead',
        company: 'Digital Solutions',
        status: JobApplicationStatus.SHORTLISTED,
        appliedDate: '2024-01-05',
        contractType: 'CDI',
        duration: 'Permanent',
        location: 'Paris',
        remote: true
      },
      {
        id: '6',
        title: 'Backend Engineer',
        company: 'Cloud Systems',
        status: JobApplicationStatus.INTERVIEWING,
        appliedDate: '2024-01-12',
        contractType: 'CDI',
        duration: 'Permanent',
        location: 'Lyon',
        remote: true
      }
    ],
    talentPools: ['Active', 'Sourcing'],
    tags: ['Java', 'Spring', 'Microservices', 'Leadership'],
    rating: 5,
    notes: 'Experienced developer with leadership potential',
    cvUrl: 'https://example.com/cv/marie-dubois.pdf',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    firstName: 'Thomas',
    lastName: 'Martin',
    email: 'thomas.martin@email.com',
    phone: '07 98 76 54 32',
    countryCode: '+33',
    age: 25,
    experience: 2,
    studyLevel: 'Bachelor\'s degree',
    location: 'Marseille, France',
    availability: 'Feb 1, 2025',
    salary: { min: 35000, max: 42000, currency: 'EUR' },
    status: CandidateStatus.PHONE_EVALUATED,
    appliedJobs: [
      {
        id: '4',
        title: 'Frontend Developer',
        company: 'Web Studio',
        status: JobApplicationStatus.INTERVIEWING,
        appliedDate: '2024-01-12',
        contractType: 'CDD',
        duration: '12 months',
        location: 'Marseille',
        remote: false
      },
      {
        id: '7',
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        status: JobApplicationStatus.SHORTLISTED,
        appliedDate: '2024-01-20',
        contractType: 'CDI',
        duration: 'Permanent',
        location: 'Marseille',
        remote: true
      }
    ],
    talentPools: ['Active'],
    tags: ['Vue.js', 'TypeScript', 'CSS', 'UI/UX'],
    rating: 4,
    notes: 'Good frontend skills, needs backend experience',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12'
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Leroy',
    email: 'sophie.leroy@email.com',
    phone: '06 45 67 89 12',
    countryCode: '+33',
    age: 29,
    experience: 3,
    studyLevel: 'Master\'s degree',
    location: 'Toulouse, France',
    availability: 'Mar 1, 2025',
    salary: { min: 40000, max: 48000, currency: 'EUR' },
    status: CandidateStatus.INTERVIEW_PASSED,
    appliedJobs: [
      {
        id: '8',
        title: 'Full Stack Developer',
        company: 'Aerospace Tech',
        status: JobApplicationStatus.OFFERED,
        appliedDate: '2024-01-08',
        contractType: 'CDI',
        duration: 'Permanent',
        location: 'Toulouse',
        remote: false
      },
      {
        id: '9',
        title: 'React Developer',
        company: 'Mobile Apps Co',
        status: JobApplicationStatus.HIRED,
        appliedDate: '2024-01-02',
        contractType: 'CDI',
        duration: 'Permanent',
        location: 'Paris',
        remote: true
      }
    ],
    talentPools: ['Active', 'Hired'],
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    rating: 5,
    notes: 'Excellent full-stack developer, great team player',
    cvUrl: 'https://example.com/cv/sophie-leroy.pdf',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-15'
  }
])

const filters = ref<CandidateFilters>({
  search: '',
  status: [],
  experience: [],
  location: [],
  talentPools: [],
  appliedJobs: [],
  availability: [],
  salary: { min: 20000, max: 150000 }
})

const selectedFilters = ref<CandidateStatus[]>([])
const salaryRange = ref([20000, 150000])

const tableHeaders = [
  { title: 'Candidate', key: 'candidate', sortable: false },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Experience', key: 'experience', sortable: true },
  { title: 'Jobs Applied To', key: 'appliedJobs', sortable: false },
  { title: 'Rating', key: 'rating', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
]

const experienceOptions = [
  { title: '0-1 years', value: [0, 1] as [number, number] },
  { title: '1-3 years', value: [1, 3] as [number, number] },
  { title: '3-5 years', value: [3, 5] as [number, number] },
  { title: '5+ years', value: [5, 10] as [number, number] }
]

const locationOptions = ['Paris', 'Lyon', 'Marseille', 'Remote', 'Other']
const talentPoolOptions = ['Sourcing', 'Active', 'Passive', 'Rejected']
const jobOptions = [
  'Software Engineer',
  'Senior Developer',
  'Frontend Developer',
  'Tech Lead',
  'Junior Developer',
  'Backend Engineer',
  'UI/UX Designer',
  'Full Stack Developer',
  'React Developer',
  'All Jobs'
]

const filteredCandidates = computed(() => {
  let filtered = candidates.value

  if (filters.value.status.length > 0) {
    filtered = filtered.filter(c => filters.value.status.includes(c.status))
  }

  if (filters.value.experience.length > 0) {
    filtered = filtered.filter(c =>
      filters.value.experience.some(([min, max]) =>
        c.experience >= min && c.experience <= max
      )
    )
  }

  if (filters.value.location.length > 0) {
    filtered = filtered.filter(c =>
      filters.value.location.some(loc =>
        c.location?.toLowerCase().includes(loc.toLowerCase())
      )
    )
  }

  if (filters.value.appliedJobs.length > 0) {
    filtered = filtered.filter(c =>
      filters.value.appliedJobs.some(jobTitle =>
        c.appliedJobs.some(appliedJob =>
          appliedJob.title.toLowerCase().includes(jobTitle.toLowerCase())
        )
      )
    )
  }

  if (filters.value.salary.min > 20000 || filters.value.salary.max < 150000) {
    filtered = filtered.filter(c =>
      c.salary.min >= filters.value.salary.min && c.salary.max <= filters.value.salary.max
    )
  }

  return filtered
})

const getStatusColor = (status: CandidateStatus) => {
  const colors = {
    [CandidateStatus.NEW]: 'primary',
    [CandidateStatus.CV_SELECTED]: 'info',
    [CandidateStatus.PHONE_EVALUATED]: 'warning',
    [CandidateStatus.INTERVIEW_PASSED]: 'success',
    [CandidateStatus.OFFER_MADE]: 'purple',
    [CandidateStatus.HIRED]: 'success',
    [CandidateStatus.REJECTED]: 'error'
  }
  return colors[status] || 'grey'
}

const formatStatus = (status: CandidateStatus) => {
  const labels = {
    [CandidateStatus.NEW]: 'New',
    [CandidateStatus.CV_SELECTED]: 'CV Selected',
    [CandidateStatus.PHONE_EVALUATED]: 'Phone Evaluated',
    [CandidateStatus.INTERVIEW_PASSED]: 'Interview Passed',
    [CandidateStatus.OFFER_MADE]: 'Offer Made',
    [CandidateStatus.HIRED]: 'Hired',
    [CandidateStatus.REJECTED]: 'Rejected'
  }
  return labels[status] || status
}

const getJobStatusColor = (status: JobApplicationStatus) => {
  const colors = {
    [JobApplicationStatus.APPLIED]: 'primary',
    [JobApplicationStatus.REVIEWING]: 'info',
    [JobApplicationStatus.SHORTLISTED]: 'warning',
    [JobApplicationStatus.INTERVIEWING]: 'purple',
    [JobApplicationStatus.OFFERED]: 'success',
    [JobApplicationStatus.HIRED]: 'success',
    [JobApplicationStatus.REJECTED]: 'error'
  }
  return colors[status] || 'grey'
}

const getJobStatusIcon = (status: JobApplicationStatus) => {
  const icons = {
    [JobApplicationStatus.APPLIED]: 'mdi-file-document-outline',
    [JobApplicationStatus.REVIEWING]: 'mdi-eye-outline',
    [JobApplicationStatus.SHORTLISTED]: 'mdi-star-outline',
    [JobApplicationStatus.INTERVIEWING]: 'mdi-calendar-clock',
    [JobApplicationStatus.OFFERED]: 'mdi-handshake',
    [JobApplicationStatus.HIRED]: 'mdi-check-circle',
    [JobApplicationStatus.REJECTED]: 'mdi-close-circle'
  }
  return icons[status] || 'mdi-help-circle'
}

const formatJobStatus = (status: JobApplicationStatus) => {
  const labels = {
    [JobApplicationStatus.APPLIED]: 'Applied',
    [JobApplicationStatus.REVIEWING]: 'Reviewing',
    [JobApplicationStatus.SHORTLISTED]: 'Shortlisted',
    [JobApplicationStatus.INTERVIEWING]: 'Interviewing',
    [JobApplicationStatus.OFFERED]: 'Offered',
    [JobApplicationStatus.HIRED]: 'Hired',
    [JobApplicationStatus.REJECTED]: 'Rejected'
  }
  return labels[status] || status
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const updateSalaryFilter = (range: number[]) => {
  filters.value.salary.min = range[0]
  filters.value.salary.max = range[1]
}

// Synchronize selectedFilters with filters.status
watch(selectedFilters, (newFilters) => {
  filters.value.status = newFilters
})

// Initialize selectedFilters with current status filters
watch(() => filters.value.status, (newStatus) => {
  selectedFilters.value = newStatus
}, { immediate: true })

const viewCandidate = (candidate: Candidate) => {
  router.push(`/candidates/${candidate.id}`)
}

const goToCreateCandidate = () => {
  router.push('/candidates/create')
}

const editCandidate = (candidate: Candidate) => {
  // TODO: Implement edit functionality
  console.log('Edit candidate:', candidate)
}

const downloadCV = (candidate: Candidate) => {
  if (candidate.cvUrl) {
    // TODO: Implement CV download
    console.log('Download CV for:', candidate.firstName)
  }
}



const clearAllFilters = () => {
  filters.value = {
    search: '',
    status: [],
    experience: [],
    location: [],
    talentPools: [],
    appliedJobs: [],
    availability: [],
    salary: { min: 20000, max: 150000 }
  }
  selectedFilters.value = []
  salaryRange.value = [20000, 150000]
}

const exportCandidates = () => {
  // TODO: Implement export functionality
  console.log('Exporting candidates:', filteredCandidates.value.length)
}

const getActiveFiltersCount = () => {
  let count = 0
  if (filters.value.search) count++
  if (filters.value.status.length > 0) count++
  if (filters.value.experience.length > 0) count++
  if (filters.value.location.length > 0) count++
  if (filters.value.talentPools.length > 0) count++
  if (filters.value.appliedJobs.length > 0) count++
  if (filters.value.salary.min > 20000 || filters.value.salary.max < 150000) count++
  return count
}

const getUniqueJobsCount = () => {
  const uniqueJobs = new Set<string>()
  filteredCandidates.value.forEach(candidate => {
    candidate.appliedJobs.forEach(job => {
      uniqueJobs.add(`${job.title} at ${job.company}`)
    })
  })
  return uniqueJobs.size
}

const getJobStatistics = () => {
  const jobStats: { title: string; company: string; applicantCount: number; status: JobApplicationStatus }[] = []
  const jobApplications = filteredCandidates.value.flatMap(candidate => candidate.appliedJobs)

  const jobApplicationCounts: { [key: string]: number } = {}
  jobApplications.forEach(job => {
    const key = `${job.title} at ${job.company}`
    jobApplicationCounts[key] = (jobApplicationCounts[key] || 0) + 1
  })

  const uniqueJobApplications = Object.entries(jobApplicationCounts)
  uniqueJobApplications.forEach(([key, count]) => {
    const [title, company] = key.split(' at ')
    const status = jobApplications.find(j => `${j.title} at ${j.company}` === key)?.status || JobApplicationStatus.APPLIED
    jobStats.push({ title, company, applicantCount: count, status })
  })

  return jobStats.sort((a, b) => b.applicantCount - a.applicantCount)
}

onMounted(() => {
  // TODO: Load candidates from API
  console.log('Candidates view mounted')
  console.log('Candidates data:', candidates.value)
  console.log('Filtered candidates:', filteredCandidates.value)
  console.log('Table headers:', tableHeaders)
})
</script>

<style scoped>
.candidates-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.candidates-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.candidates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
}

.candidate-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.candidate-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.avatar-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.candidate-details .detail-item {
  padding: 4px 0;
}

.jobs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.job-chip {
  font-size: 0.75rem;
}

.candidate-actions {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 12px;
  margin-top: 12px;
}

.candidates-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.header-content {
  flex: 1;
}

.header-actions {
  flex-shrink: 0;
}

.create-candidate-btn {
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
}

.create-candidate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
}

.clear-filters-btn,
.export-btn {
  transition: all 0.3s ease;
}

.clear-filters-btn:hover,
.export-btn:hover {
  transform: translateY(-1px);
}

.summary-card {
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-top: 4px;
}

.filters-card {
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.filters-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.search-section {
  max-width: 400px;
}

.search-input {
  border-radius: 8px;
}

.filter-chips {
  margin-top: 16px;
}

.filter-group {
  gap: 8px;
}

.status-chip {
  font-weight: 500;
}

.advanced-filters {
  margin-top: 16px;
}

.job-stats-card {
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-top: 24px;
}

.job-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.job-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.job-stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.job-stat-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
}

.job-title {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.job-company {
  font-size: 0.875rem;
  color: var(--color-secondary);
  font-weight: 500;
}

.job-stat-numbers {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.applicant-count {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.applicant-label {
  font-size: 0.75rem;
  color: var(--color-secondary);
  margin-top: 2px;
}

.job-stat-status {
  margin-top: 8px;
}

.candidates-list-card {
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.candidates-table {
  border-radius: 12px;
}

.candidate-row {
  transition: background-color 0.2s ease;
}

.candidate-row:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

.candidate-info {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.candidate-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-heading);
  margin-bottom: 4px;
}

.candidate-email {
  font-size: 0.875rem;
  color: var(--color-text);
  margin-bottom: 2px;
}

.candidate-location {
  font-size: 0.8rem;
  color: var(--color-secondary);
}

.experience-info {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--color-text);
}

.applied-jobs {
  display: flex;
  flex-direction: column; /* Changed to column for better stacking */
  gap: 4px;
}

.job-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.job-chip {
  font-size: 0.75rem;
  max-width: 120px;
}

.job-details {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  color: var(--color-secondary);
}

.job-company {
  font-weight: 500;
  color: var(--color-heading);
}

.job-status {
  font-weight: 400;
}

.more-jobs-chip {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-primary);
}

.rating-info {
  display: flex;
  align-items: center;
}

.rating-text {
  font-size: 0.875rem;
  color: var(--color-text);
}

.actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .candidates-container {
    padding: 16px;
  }

  .candidates-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .header-actions {
    align-self: stretch;
  }

  .create-candidate-btn {
    width: 100%;
  }

  .job-stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 600px) {
  .candidates-container {
    padding: 12px;
  }

  .filters-content {
    gap: 16px;
  }

  .search-section {
    max-width: 100%;
  }

  .summary-stats {
    gap: 16px;
  }

  .stat-number {
    font-size: 1.25rem;
  }

  .job-stats-grid {
    gap: 8px;
  }

  .job-stat-item {
    padding: 12px;
  }

  .applicant-count {
    font-size: 1.5rem;
  }
}
</style>
