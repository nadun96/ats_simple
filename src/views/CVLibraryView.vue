<template>
  <v-container fluid class="cv-library-container">
    <!-- Header Section -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h3 font-weight-bold mb-2">CV Library</h1>
        <p class="text-body-1 text-grey-darken-1">
          Manage and search through all candidate CVs and resumes
        </p>
      </div>

      <div class="d-flex gap-3">
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-upload"
          @click="openUploadDialog"
        >
          Upload CV
        </v-btn>
        <v-btn
          variant="outlined"
          prepend-icon="mdi-export"
          @click="exportCVs"
        >
          Export
        </v-btn>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <v-card class="mb-6" elevation="2">
      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchQuery"
              label="Search CVs..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              placeholder="Search by name, skills, experience..."
              @update:model-value="filterCVs"
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-select
              v-model="selectedStatus"
              label="Status"
              :items="statusOptions"
              variant="outlined"
              density="compact"
              clearable
              @update:model-value="filterCVs"
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-select
              v-model="selectedExperience"
              label="Experience"
              :items="experienceOptions"
              variant="outlined"
              density="compact"
              clearable
              @update:model-value="filterCVs"
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-select
              v-model="selectedLocation"
              label="Location"
              :items="locationOptions"
              variant="outlined"
              density="compact"
              clearable
              @update:model-value="filterCVs"
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-btn
              variant="outlined"
              @click="clearFilters"
              block
            >
              Clear
            </v-btn>
          </v-col>
        </v-row>

        <!-- Advanced Filters -->
        <v-expand-transition>
          <div v-show="showAdvancedFilters">
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedSkills"
                  label="Skills"
                  :items="skillOptions"
                  variant="outlined"
                  density="compact"
                  multiple
                  chips
                  clearable
                  @update:model-value="filterCVs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedSource"
                  label="Source"
                  :items="sourceOptions"
                  variant="outlined"
                  density="compact"
                  clearable
                  @update:model-value="filterCVs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedDateRange"
                  label="Date Range"
                  :items="dateRangeOptions"
                  variant="outlined"
                  density="compact"
                  clearable
                  @update:model-value="filterCVs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-checkbox
                  v-model="showFavoritesOnly"
                  label="Favorites Only"
                  color="primary"
                  @change="filterCVs"
                />
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>

        <div class="text-center mt-3">
          <v-btn
            variant="text"
            @click="showAdvancedFilters = !showAdvancedFilters"
            size="small"
          >
            {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced Filters
            <v-icon :icon="showAdvancedFilters ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="ml-1" />
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" md="3">
        <v-card class="text-center" elevation="2">
          <v-card-text>
            <v-icon size="48" color="primary" class="mb-3">mdi-file-document-multiple</v-icon>
            <h3 class="text-h4 font-weight-bold">{{ totalCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1">Total CVs</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="text-center" elevation="2">
          <v-card-text>
            <v-icon size="48" color="success" class="mb-3">mdi-star</v-icon>
            <h3 class="text-h4 font-weight-bold">{{ favoriteCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1">Favorites</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="text-center" elevation="2">
          <v-card-text>
            <v-icon size="48" color="info" class="mb-3">mdi-clock</v-icon>
            <h3 class="text-h4 font-weight-bold">{{ recentCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1">Recent (30 days)</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="text-center" elevation="2">
          <v-card-text>
            <v-icon size="48" color="warning" class="mb-3">mdi-eye</v-icon>
            <h3 class="text-h4 font-weight-bold">{{ viewedCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1">Viewed Today</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- CV List -->
    <v-card elevation="2">
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <div>
          <span class="text-h6 font-weight-bold">{{ filteredCVs.length }} CVs</span>
          <span v-if="filteredCVs.length !== totalCVs" class="text-body-2 text-grey-darken-1 ml-2">
            (filtered from {{ totalCVs }})
          </span>
        </div>

        <div class="d-flex align-center gap-3">
          <v-btn-toggle
            v-model="viewMode"
            color="primary"
            density="compact"
          >
            <v-btn value="grid" icon="mdi-view-grid" />
            <v-btn value="list" icon="mdi-view-list" />
          </v-btn-toggle>

          <v-select
            v-model="sortBy"
            label="Sort by"
            :items="sortOptions"
            variant="outlined"
            density="compact"
            class="ml-3"
            style="min-width: 150px"
            @update:model-value="sortCVs"
          />
        </div>
      </v-card-title>

      <v-card-text class="pa-0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="pa-6">
          <v-row>
            <v-col
              v-for="cv in paginatedCVs"
              :key="cv.id"
              cols="12"
              md="6"
              lg="4"
              xl="3"
            >
              <CVCard
                :cv="cv"
                @view="viewCV"
                @favorite="toggleFavorite"
                @download="downloadCV"
                @delete="deleteCV"
              />
            </v-col>
          </v-row>
        </div>

        <!-- List View -->
        <div v-else class="pa-0">
          <v-list class="pa-0">
            <CVListItem
              v-for="cv in paginatedCVs"
              :key="cv.id"
              :cv="cv"
              @view="viewCV"
              @favorite="toggleFavorite"
              @download="downloadCV"
              @delete="deleteCV"
            />
          </v-list>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCVs.length === 0" class="text-center py-12">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-file-document-off</v-icon>
          <h3 class="text-h5 text-grey-darken-1 mb-2">No CVs found</h3>
          <p class="text-body-1 text-grey mb-4">
            {{ searchQuery || selectedStatus || selectedExperience ? 'Try adjusting your search criteria' : 'Start by uploading your first CV' }}
          </p>
          <v-btn
            v-if="!searchQuery && !selectedStatus && !selectedExperience"
            color="primary"
            variant="elevated"
            prepend-icon="mdi-upload"
            @click="openUploadDialog"
          >
            Upload First CV
          </v-btn>
        </div>
      </v-card-text>

      <!-- Pagination -->
      <v-card-actions v-if="filteredCVs.length > 0" class="pa-6 pt-0">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          @update:model-value="handlePageChange"
        />

        <v-spacer></v-spacer>

        <div class="d-flex align-center">
          <span class="text-body-2 text-grey-darken-1 mr-3">Items per page:</span>
          <v-select
            v-model="itemsPerPage"
            :items="[10, 20, 50, 100]"
            variant="outlined"
            density="compact"
            style="min-width: 80px"
            @update:model-value="handleItemsPerPageChange"
          />
        </div>
      </v-card-actions>
    </v-card>

    <!-- CV Upload Dialog -->
    <CVUploadDialog
      v-model="showUploadDialog"
      @cv-uploaded="handleCVUploaded"
    />

    <!-- CV Detail Dialog -->
    <CVDetailDialog
      v-model="showDetailDialog"
      :cv="selectedCV"
      @favorite="toggleFavorite"
      @download="downloadCV"
      @delete="deleteCV"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CVCard from '@/components/cv/CVCard.vue'
import CVListItem from '@/components/cv/CVListItem.vue'
import CVUploadDialog from '@/components/cv/CVUploadDialog.vue'
import CVDetailDialog from '@/components/cv/CVDetailDialog.vue'
import { useCVLibraryStore } from '@/stores/cvLibrary'

const router = useRouter()
const cvLibraryStore = useCVLibraryStore()

// State
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedExperience = ref('')
const selectedLocation = ref('')
const selectedSkills = ref<string[]>([])
const selectedSource = ref('')
const selectedDateRange = ref('')
const showFavoritesOnly = ref(false)
const showAdvancedFilters = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('date')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const showUploadDialog = ref(false)
const showDetailDialog = ref(false)
const selectedCV = ref(null)

// Computed
const totalCVs = computed(() => cvLibraryStore.totalCVs)
const favoriteCVs = computed(() => cvLibraryStore.favoriteCVs)
const recentCVs = computed(() => cvLibraryStore.recentCVs)
const viewedCVs = computed(() => cvLibraryStore.viewedToday)

const filteredCVs = computed(() => {
  let filtered = cvLibraryStore.filteredCVs

  // Apply search filter
  if (searchQuery.value) {
    filtered = filtered.filter(cv =>
      cv.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cv.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cv.skills.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      cv.experience.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Apply status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(cv => cv.status === selectedStatus.value)
  }

  // Apply experience filter
  if (selectedExperience.value) {
    filtered = filtered.filter(cv => cv.experience === selectedExperience.value)
  }

  // Apply location filter
  if (selectedLocation.value) {
    filtered = filtered.filter(cv => cv.location === selectedLocation.value)
  }

  // Apply skills filter
  if (selectedSkills.value.length > 0) {
    filtered = filtered.filter(cv =>
      selectedSkills.value.some(skill => cv.skills.includes(skill))
    )
  }

  // Apply source filter
  if (selectedSource.value) {
    filtered = filtered.filter(cv => cv.source === selectedSource.value)
  }

  // Apply date range filter
  if (selectedDateRange.value) {
    const now = new Date()
    const daysAgo = parseInt(selectedDateRange.value)
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000))

    filtered = filtered.filter(cv => new Date(cv.uploadDate) >= cutoffDate)
  }

  // Apply favorites filter
  if (showFavoritesOnly.value) {
    filtered = filtered.filter(cv => cv.isFavorite)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredCVs.value.length / itemsPerPage.value))

const paginatedCVs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCVs.value.slice(start, end)
})

// Options for filters
const statusOptions = [
  'New',
  'CV Selected',
  'Phone Evaluated',
  'Interview Scheduled',
  'Interview Completed',
  'Hired',
  'Rejected'
]

const experienceOptions = [
  'Entry Level',
  'Junior',
  'Mid Level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Executive'
]

const locationOptions = [
  'Remote',
  'New York',
  'London',
  'Paris',
  'Berlin',
  'Tokyo',
  'Sydney',
  'Toronto'
]

const skillOptions = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'PHP',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Kubernetes'
]

const sourceOptions = [
  'Career Site',
  'LinkedIn',
  'Indeed',
  'Glassdoor',
  'Referral',
  'Job Board',
  'Direct Application'
]

const dateRangeOptions = [
  { title: 'Last 7 days', value: '7' },
  { title: 'Last 30 days', value: '30' },
  { title: 'Last 90 days', value: '90' },
  { title: 'Last 6 months', value: '180' },
  { title: 'Last year', value: '365' }
]

const sortOptions = [
  { title: 'Date Uploaded', value: 'date' },
  { title: 'Name', value: 'name' },
  { title: 'Experience', value: 'experience' },
  { title: 'Status', value: 'status' },
  { title: 'Skills Match', value: 'skills' }
]

// Methods
const filterCVs = () => {
  currentPage.value = 1
  cvLibraryStore.applyFilters({
    search: searchQuery.value,
    status: selectedStatus.value,
    experience: selectedExperience.value,
    location: selectedLocation.value,
    skills: selectedSkills.value,
    source: selectedSource.value,
    dateRange: selectedDateRange.value,
    favoritesOnly: showFavoritesOnly.value
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedExperience.value = ''
  selectedLocation.value = ''
  selectedSkills.value = []
  selectedSource.value = ''
  selectedDateRange.value = ''
  showFavoritesOnly.value = false
  filterCVs()
}

const sortCVs = () => {
  cvLibraryStore.sortCVs(sortBy.value)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleItemsPerPageChange = (items: number) => {
  itemsPerPage.value = items
  currentPage.value = 1
}

const openUploadDialog = () => {
  showUploadDialog.value = true
}

const viewCV = (cv: any) => {
  selectedCV.value = cv
  showDetailDialog.value = true
  cvLibraryStore.markAsViewed(cv.id)
}

const toggleFavorite = (cvId: number) => {
  cvLibraryStore.toggleFavorite(cvId)
}

const downloadCV = (cv: any) => {
  cvLibraryStore.downloadCV(cv.id)
}

const deleteCV = async (cvId: number) => {
  const confirmed = confirm('Are you sure you want to delete this CV? This action cannot be undone.')
  if (confirmed) {
    await cvLibraryStore.deleteCV(cvId)
  }
}

const exportCVs = () => {
  cvLibraryStore.exportCVs(filteredCVs.value)
}

const handleCVUploaded = (cv: any) => {
  showUploadDialog.value = false
  // Refresh the CV list
  cvLibraryStore.loadCVs()
}

// Lifecycle
onMounted(async () => {
  await cvLibraryStore.loadCVs()
})
</script>

<style scoped>
.cv-library-container {
  max-width: 1400px;
  margin: 0 auto;
}

.gap-3 {
  gap: 12px;
}
</style>
