<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="800px"
    persistent
  >
    <v-card v-if="cv">
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <div class="d-flex align-center">
          <v-avatar
            :color="getAvatarColor(cv.name)"
            size="48"
            class="mr-4"
          >
            <span class="text-h5 text-white font-weight-bold">
              {{ getInitials(cv.name) }}
            </span>
          </v-avatar>
          <div>
            <h2 class="text-h4 font-weight-bold mb-1">{{ cv.name }}</h2>
            <p class="text-body-1 text-grey-darken-1 mb-0">{{ cv.experience }} • {{ cv.location }}</p>
          </div>
        </div>

        <div class="d-flex align-center gap-3">
          <v-chip
            :color="getStatusColor(cv.status)"
            size="large"
            variant="tonal"
          >
            {{ cv.status }}
          </v-chip>

          <v-btn
            icon="mdi-star"
            :color="cv.isFavorite ? 'amber' : 'grey'"
            variant="text"
            size="large"
            @click="$emit('favorite', cv.id)"
          />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeDialog"
          />
        </div>
      </v-card-title>

      <v-card-text class="pa-6 pt-0">
        <v-row>
          <!-- Left Column -->
          <v-col cols="12" md="8">
            <!-- Contact Information -->
            <v-card class="mb-4" variant="outlined">
              <v-card-title class="text-h6 pa-4 pb-2">Contact Information</v-card-title>
              <v-card-text class="pa-4 pt-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="d-flex align-center mb-3">
                      <v-icon size="small" color="grey" class="mr-3">mdi-email</v-icon>
                      <div>
                        <span class="text-caption text-grey-darken-1">Email</span>
                        <p class="text-body-1 mb-0">{{ cv.email }}</p>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="d-flex align-center mb-3">
                      <v-icon size="small" color="grey" class="mr-3">mdi-phone</v-icon>
                      <div>
                        <span class="text-caption text-grey-darken-1">Phone</span>
                        <p class="text-body-1 mb-0">{{ cv.phone }}</p>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="d-flex align-center mb-3">
                      <v-icon size="small" color="grey" class="mr-3">mdi-map-marker</v-icon>
                      <div>
                        <span class="text-caption text-grey-darken-1">Location</span>
                        <p class="text-body-1 mb-0">{{ cv.location }}</p>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="d-flex align-center mb-3">
                      <v-icon size="small" color="grey" class="mr-3">mdi-tag</v-icon>
                      <div>
                        <span class="text-caption text-grey-darken-1">Source</span>
                        <p class="text-body-1 mb-0">{{ cv.source }}</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Skills -->
            <v-card class="mb-4" variant="outlined">
              <v-card-title class="text-h6 pa-4 pb-2">Skills</v-card-title>
              <v-card-text class="pa-4 pt-0">
                <div class="d-flex flex-wrap gap-2">
                  <v-chip
                    v-for="skill in cv.skills"
                    :key="skill"
                    size="medium"
                    variant="outlined"
                    color="primary"
                  >
                    {{ skill }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>

            <!-- Notes -->
            <v-card v-if="cv.notes" class="mb-4" variant="outlined">
              <v-card-title class="text-h6 pa-4 pb-2">Notes</v-card-title>
              <v-card-text class="pa-4 pt-0">
                <p class="text-body-1 mb-0">{{ cv.notes }}</p>
              </v-card-text>
            </v-card>

            <!-- Tags -->
            <v-card v-if="cv.tags.length > 0" class="mb-4" variant="outlined">
              <v-card-title class="text-h6 pa-4 pb-2">Tags</v-card-title>
              <v-card-text class="pa-4 pt-0">
                <div class="d-flex flex-wrap gap-2">
                  <v-chip
                    v-for="tag in cv.tags"
                    :key="tag"
                    size="small"
                    variant="tonal"
                    color="secondary"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Right Column -->
          <v-col cols="12" md="4">
            <!-- Match Score -->
            <v-card class="mb-4" variant="outlined">
              <v-card-title class="text-h6 pa-4 pb-2">Match Score</v-card-title>
              <v-card-text class="pa-4 pt-0 text-center">
                <div class="text-h2 font-weight-bold text-primary mb-2">{{ cv.matchScore }}%</div>
                <v-progress-linear
                  :model-value="cv.matchScore"
                  color="primary"
                  height="8"
                  rounded
                  class="mb-3"
                />
                <p class="text-body-2 text-grey-darken-1 mb-0">
                  {{ getMatchScoreDescription(cv.matchScore) }}
                </p>
              </v-card-text>
            </v-card>

            <!-- Timeline -->
            <v-card class="mb-4" variant="outlined">
              <v-card-title class="text-h6 pa-4 pb-2">Timeline</v-card-title>
              <v-card-text class="pa-4 pt-0">
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-dot primary"></div>
                    <div class="timeline-content">
                      <div class="text-caption text-grey-darken-1">Applied</div>
                      <div class="text-body-2">{{ formatDate(cv.appliedDate) }}</div>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-dot success"></div>
                    <div class="timeline-content">
                      <div class="text-caption text-grey-darken-1">Uploaded</div>
                      <div class="text-body-2">{{ formatDate(cv.uploadDate) }}</div>
                    </div>
                  </div>

                  <div v-if="cv.lastViewed" class="timeline-item">
                    <div class="timeline-dot info"></div>
                    <div class="timeline-content">
                      <div class="text-caption text-grey-darken-1">Last Viewed</div>
                      <div class="text-body-2">{{ formatDate(cv.lastViewed) }}</div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <!-- Files -->
            <v-card variant="outlined">
              <v-card-title class="text-h6 pa-4 pb-2">Files</v-card-title>
              <v-card-text class="pa-4 pt-0">
                <div class="d-flex flex-column gap-2">
                  <v-btn
                    variant="outlined"
                    prepend-icon="mdi-file-pdf-box"
                    @click="$emit('download', cv)"
                    block
                  >
                    Download CV
                  </v-btn>

                  <v-btn
                    v-if="cv.coverLetter"
                    variant="outlined"
                    prepend-icon="mdi-file-document"
                    @click="downloadCoverLetter"
                    block
                  >
                    Download Cover Letter
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="closeDialog"
        >
          Close
        </v-btn>
        <v-btn
          color="error"
          variant="outlined"
          prepend-icon="mdi-delete"
          @click="confirmDelete"
        >
          Delete CV
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-pencil"
          @click="editCV"
        >
          Edit CV
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CV } from '@/stores/cvLibrary'

interface Props {
  modelValue: boolean
  cv: CV | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'favorite', cvId: number): void
  (e: 'download', cv: CV): void
  (e: 'delete', cvId: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
const closeDialog = () => {
  dialogVisible.value = false
}

const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'New': 'info',
    'CV Selected': 'success',
    'Phone Evaluated': 'warning',
    'Interview Scheduled': 'primary',
    'Interview Completed': 'secondary',
    'Hired': 'success',
    'Rejected': 'error'
  }
  return statusColors[status] || 'grey'
}

const getAvatarColor = (name: string): string => {
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getMatchScoreDescription = (score: number): string => {
  if (score >= 90) return 'Excellent Match'
  if (score >= 80) return 'Very Good Match'
  if (score >= 70) return 'Good Match'
  if (score >= 60) return 'Fair Match'
  return 'Poor Match'
}

const downloadCoverLetter = () => {
  if (props.cv?.coverLetter) {
    // Simulate download
    const link = document.createElement('a')
    link.href = `#${props.cv.coverLetter}`
    link.download = props.cv.coverLetter
    link.click()
  }
}

const confirmDelete = () => {
  if (props.cv) {
    const confirmed = confirm(`Are you sure you want to delete ${props.cv.name}'s CV? This action cannot be undone.`)
    if (confirmed) {
      emit('delete', props.cv.id)
      closeDialog()
    }
  }
}

const editCV = () => {
  // TODO: Implement edit functionality
  console.log('Edit CV:', props.cv?.id)
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
  margin-top: 4px;
  flex-shrink: 0;
}

.timeline-dot.primary {
  background-color: rgb(var(--v-theme-primary));
}

.timeline-dot.success {
  background-color: rgb(var(--v-theme-success));
}

.timeline-dot.info {
  background-color: rgb(var(--v-theme-info));
}

.timeline-content {
  flex-grow: 1;
}
</style>
