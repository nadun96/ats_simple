<template>
  <v-container fluid class="cv-library-container">
    <!-- Header Section with improved design -->
    <div class="header-section mb-8">
      <div class="header-content">
        <div class="header-text">
          <h1 class="text-h2 font-weight-bold mb-3 text-gradient">
            CV Library
          </h1>
          <p class="text-body-1 text-grey-darken-1 mb-0">
            Manage and discover top talent with our intelligent CV management system
          </p>
        </div>

        <div class="header-actions">
          <v-btn
            color="primary"
            variant="elevated"
            prepend-icon="mdi-upload"
            size="large"
            class="upload-btn"
            elevation="4"
            @click="openUploadDialog"
          >
            <v-icon start>mdi-plus</v-icon>
            Upload CV
          </v-btn>

          <v-btn
            variant="outlined"
            prepend-icon="mdi-export"
            size="large"
            class="export-btn"
            @click="exportCVs"
          >
            Export
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Enhanced Search and Filter Section -->
    <v-card class="search-filter-card mb-6" elevation="3">
      <v-card-text class="pa-6">
        <!-- Primary Search Row -->
        <v-row class="mb-4">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Search CVs..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              placeholder="Search by name, skills, experience, or keywords..."
              class="search-field"
              @update:model-value="filterCVs"
            >
              <template v-slot:prepend-inner>
                <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-select
              v-model="selectedStatus"
              label="Status"
              :items="statusOptions"
              variant="outlined"
              density="comfortable"
              clearable
              prepend-inner-icon="mdi-flag"
              class="filter-select"
              @update:model-value="filterCVs"
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-select
              v-model="selectedExperience"
              label="Experience"
              :items="experienceOptions"
              variant="outlined"
              density="comfortable"
              clearable
              prepend-inner-icon="mdi-account-star"
              class="filter-select"
              @update:model-value="filterCVs"
            />
          </v-col>

          <v-col cols="12" md="2">
            <v-btn
              variant="outlined"
              color="grey"
              @click="clearFilters"
              class="clear-btn"
              block
            >
              <v-icon start>mdi-refresh</v-icon>
              Clear
            </v-btn>
          </v-col>
        </v-row>

        <!-- Advanced Filters with smooth animation -->
        <v-expand-transition>
          <div v-show="showAdvancedFilters" class="advanced-filters">
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedSkills"
                  label="Skills"
                  :items="skillOptions"
                  variant="outlined"
                  density="comfortable"
                  multiple
                  chips
                  closable-chips
                  prepend-inner-icon="mdi-tools"
                  class="filter-select"
                  @update:model-value="filterCVs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedSource"
                  label="Source"
                  :items="sourceOptions"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  prepend-inner-icon="mdi-source-branch"
                  class="filter-select"
                  @update:model-value="filterCVs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedDateRange"
                  label="Date Range"
                  :items="dateRangeOptions"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  prepend-inner-icon="mdi-calendar"
                  class="filter-select"
                  @update:model-value="filterCVs"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-checkbox
                  v-model="showFavoritesOnly"
                  label="Favorites Only"
                  color="primary"
                  class="favorites-checkbox"
                  @change="filterCVs"
                >
                  <template v-slot:default>
                    <div class="d-flex align-center">
                      <v-icon color="amber" class="mr-2">mdi-star</v-icon>
                      <span>Favorites Only</span>
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>

        <!-- Enhanced Toggle Button -->
        <div class="text-center mt-4">
          <v-btn
            variant="text"
            @click="showAdvancedFilters = !showAdvancedFilters"
            size="small"
            class="toggle-filters-btn"
            :color="showAdvancedFilters ? 'primary' : 'grey'"
          >
            <v-icon :icon="showAdvancedFilters ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="mr-2" />
            {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced Filters
            <v-chip
              v-if="activeFiltersCount > 0"
              size="x-small"
              color="primary"
              class="ml-2"
            >
              {{ activeFiltersCount }}
            </v-chip>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Enhanced Stats Cards with animations -->
    <v-row class="mb-8">
      <v-col cols="12" md="3">
        <v-card class="stat-card total-cvs" elevation="3" @click="scrollToCVs">
          <v-card-text class="text-center pa-6">
            <div class="stat-icon-wrapper mb-3">
              <v-icon size="48" color="primary">mdi-file-document-multiple</v-icon>
            </div>
            <h3 class="text-h3 font-weight-bold text-primary mb-2">{{ totalCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1 mb-0">Total CVs</p>
            <v-progress-linear
              :model-value="100"
              color="primary"
              height="3"
              class="mt-3"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="stat-card favorites" elevation="3" @click="showFavoritesOnly = true; filterCVs()">
          <v-card-text class="text-center pa-6">
            <div class="stat-icon-wrapper mb-3">
              <v-icon size="48" color="amber">mdi-star</v-icon>
            </div>
            <h3 class="text-h3 font-weight-bold text-amber mb-2">{{ favoriteCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1 mb-0">Favorites</p>
            <v-progress-linear
              :model-value="(favoriteCVs / totalCVs) * 100"
              color="amber"
              height="3"
              class="mt-3"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="stat-card recent" elevation="3" @click="selectedDateRange = '30'; filterCVs()">
          <v-card-text class="text-center pa-6">
            <div class="stat-icon-wrapper mb-3">
              <v-icon size="48" color="info">mdi-clock</v-icon>
            </div>
            <h3 class="text-h3 font-weight-bold text-info mb-2">{{ recentCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1 mb-0">Recent (30 days)</p>
            <v-progress-linear
              :model-value="(recentCVs / totalCVs) * 100"
              color="info"
              height="3"
              class="mt-3"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="stat-card viewed" elevation="3">
          <v-card-text class="text-center pa-6">
            <div class="stat-icon-wrapper mb-3">
              <v-icon size="48" color="success">mdi-eye</v-icon>
            </div>
            <h3 class="text-h3 font-weight-bold text-success mb-2">{{ viewedCVs }}</h3>
            <p class="text-body-2 text-grey-darken-1 mb-0">Viewed Today</p>
            <v-progress-linear
              :model-value="(viewedCVs / totalCVs) * 100"
              color="success"
              height="3"
              class="mt-3"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Enhanced CV List Section -->
    <v-card elevation="3" class="cv-list-card">
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <div class="cv-count-section">
          <div class="d-flex align-center">
            <v-icon color="primary" class="mr-3">mdi-file-document</v-icon>
            <span class="text-h5 font-weight-bold">{{ filteredCVs.length }} CVs</span>
            <v-chip
              v-if="filteredCVs.length !== totalCVs"
              size="small"
              color="primary"
              variant="tonal"
              class="ml-3"
            >
              filtered from {{ totalCVs }}
            </v-chip>
          </div>
          <p v-if="searchQuery || selectedStatus || selectedExperience" class="text-body-2 text-grey-darken-1 mt-1 mb-0">
            Showing results for your search criteria
          </p>
        </div>

        <div class="view-controls">
          <v-btn-toggle
            v-model="viewMode"
            color="primary"
            density="comfortable"
            class="view-toggle"
          >
            <v-btn value="grid" icon="mdi-view-grid" />
            <v-btn value="list" icon="mdi-view-list" />
          </v-btn-toggle>

          <v-select
            v-model="sortBy"
            label="Sort by"
            :items="sortOptions"
            variant="outlined"
            density="comfortable"
            class="ml-4 sort-select"
            style="min-width: 180px"
            prepend-inner-icon="mdi-sort"
            @update:model-value="sortCVs"
          />
        </div>
      </v-card-title>

      <v-card-text class="pa-0">
        <!-- Loading State -->
        <div v-if="cvLibraryStore.isLoading" class="loading-state pa-12 text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
            class="mb-4"
          />
          <h3 class="text-h6 text-grey-darken-1">Loading CVs...</h3>
        </div>

        <!-- Grid View with enhanced animations -->
        <div v-else-if="viewMode === 'grid'" class="grid-view pa-6">
          <v-row>
            <v-col
              v-for="(cv, index) in paginatedCVs"
              :key="cv.id"
              cols="12"
              md="6"
              lg="4"
              xl="3"
            >
              <v-fade-transition :delay="index * 100">
                <CVCard
                  :cv="cv"
                  @view="viewCV"
                  @favorite="toggleFavorite"
                  @download="downloadCV"
                  @delete="deleteCV"
                />
              </v-fade-transition>
            </v-col>
          </v-row>
        </div>

        <!-- List View with enhanced styling -->
        <div v-else class="list-view pa-0">
          <v-list class="pa-0">
            <v-fade-transition-group>
              <CVListItem
                v-for="(cv, index) in paginatedCVs"
                :key="cv.id"
                :cv="cv"
                :index="index"
                @view="viewCV"
                @favorite="toggleFavorite"
                @download="downloadCV"
                @delete="deleteCV"
              />
            </v-fade-transition-group>
          </v-list>
        </div>

        <!-- Enhanced Empty State -->
        <div v-if="!cvLibraryStore.isLoading && filteredCVs.length === 0" class="empty-state pa-12 text-center">
          <div class="empty-state-icon mb-4">
            <v-icon size="80" color="grey-lighten-1">mdi-file-document-off</v-icon>
          </div>
          <h3 class="text-h5 text-grey-darken-1 mb-3">No CVs found</h3>
          <p class="text-body-1 text-grey mb-6 max-width-400">
            {{ searchQuery || selectedStatus || selectedExperience ? 'Try adjusting your search criteria or clearing some filters' : 'Start building your talent pool by uploading your first CV' }}
          </p>
          <div class="d-flex justify-center gap-3">
            <v-btn
              v-if="!searchQuery && !selectedStatus && !selectedExperience"
              color="primary"
              variant="elevated"
              prepend-icon="mdi-upload"
              size="large"
              @click="openUploadDialog"
            >
              Upload First CV
            </v-btn>
            <v-btn
              variant="outlined"
              @click="clearFilters"
              size="large"
            >
              Clear All Filters
            </v-btn>
          </div>
        </div>
      </v-card-text>

      <!-- Enhanced Pagination -->
      <v-card-actions v-if="filteredCVs.length > 0" class="pa-6 pt-0">
        <div class="pagination-info">
          <span class="text-body-2 text-grey-darken-1">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredCVs.length) }} of {{ filteredCVs.length }} CVs
          </span>
        </div>

        <v-spacer></v-spacer>

        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          class="pagination-controls"
          @update:model-value="handlePageChange"
        />

        <div class="items-per-page ml-6">
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

    <!-- Success/Error Snackbars -->
    <v-snackbar
      v-model="showSuccessMessage"
      color="success"
      timeout="4000"
      location="top"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-3">mdi-check-circle</v-icon>
        {{ successMessage }}
      </div>
    </v-snackbar>

    <v-snackbar
      v-model="showErrorMessage"
      color="error"
      timeout="6000"
      location="top"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-3">mdi-alert-circle</v-icon>
        {{ errorMessage }}
      </div>
    </v-snackbar>
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
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Computed
const totalCVs = computed(() => cvLibraryStore.totalCVs)
const favoriteCVs = computed(() => cvLibraryStore.favoriteCVs)
const recentCVs = computed(() => cvLibraryStore.recentCVs)
const viewedCVs = computed(() => cvLibraryStore.viewedToday)

const activeFiltersCount = computed(() => {
  let count = 0
  if (searchQuery.value) count++
  if (selectedStatus.value) count++
  if (selectedExperience.value) count++
  if (selectedLocation.value) count++
  if (selectedSkills.value.length > 0) count++
  if (selectedSource.value) count++
  if (selectedDateRange.value) count++
  if (showFavoritesOnly.value) count++
  return count
})

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
  successMessage.value = `CV for ${cv.name} uploaded successfully!`
  showSuccessMessage.value = true
  // Refresh the CV list
  cvLibraryStore.loadCVs()
}

const scrollToCVs = () => {
  const cvList = document.querySelector('.cv-list-card')
  if (cvList) {
    cvList.scrollIntoView({ behavior: 'smooth' })
  }
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
  padding: 24px;
}

/* Header Section */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 48px;
  color: white;
  margin: -24px -24px 48px -24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.header-text h1 {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.upload-btn {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: none;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.export-btn {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.export-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Search and Filter */
.search-filter-card {
  border-radius: 16px;
  border: 1px solid #e0e0e0;
}

.search-field {
  border-radius: 12px;
}

.filter-select {
  border-radius: 12px;
}

.clear-btn {
  border-radius: 12px;
  height: 56px;
}

.toggle-filters-btn {
  border-radius: 20px;
  padding: 8px 16px;
}

.advanced-filters {
  padding-top: 16px;
}

.favorites-checkbox {
  margin-top: 8px;
}

/* Stats Cards */
.stat-card {
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.stat-card.total-cvs:hover {
  border-color: rgb(var(--v-theme-primary));
}

.stat-card.favorites:hover {
  border-color: rgb(var(--v-theme-amber));
}

.stat-card.recent:hover {
  border-color: rgb(var(--v-theme-info));
}

.stat-card.viewed:hover {
  border-color: rgb(var(--v-theme-success));
}

.stat-icon-wrapper {
  display: inline-block;
  padding: 16px;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.1);
}

.stat-card.favorites .stat-icon-wrapper {
  background: rgba(var(--v-theme-amber), 0.1);
}

.stat-card.recent .stat-icon-wrapper {
  background: rgba(var(--v-theme-info), 0.1);
}

.stat-card.viewed .stat-icon-wrapper {
  background: rgba(var(--v-theme-success), 0.1);
}

/* CV List Card */
.cv-list-card {
  border-radius: 16px;
  border: 1px solid #e0e0e0;
}

.cv-count-section {
  display: flex;
  flex-direction: column;
}

.view-controls {
  display: flex;
  align-items: center;
}

.view-toggle {
  border-radius: 8px;
}

.sort-select {
  border-radius: 12px;
}

/* Loading State */
.loading-state {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Empty State */
.empty-state {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-state-icon {
  opacity: 0.6;
}

.max-width-400 {
  max-width: 400px;
}

/* Pagination */
.pagination-info {
  display: flex;
  align-items: center;
}

.pagination-controls {
  border-radius: 8px;
}

.items-per-page {
  display: flex;
  align-items: center;
}

/* Grid and List Views */
.grid-view {
  min-height: 400px;
}

.list-view {
  min-height: 400px;
}

/* Responsive Design */
@media (max-width: 960px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-actions {
    justify-content: center;
  }

  .cv-library-container {
    padding: 16px;
  }

  .header-section {
    margin: -16px -16px 32px -16px;
    padding: 32px 24px;
  }
}

@media (max-width: 600px) {
  .header-section {
    padding: 24px 16px;
  }

  .view-controls {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .sort-select {
    min-width: 100% !important;
  }
}

/* Utility Classes */
.gap-3 {
  gap: 12px;
}

.text-gradient {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
