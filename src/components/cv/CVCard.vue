<template>
  <v-card class="cv-card" elevation="2" @click="$emit('view', cv)">
    <!-- Header with Status and Favorite -->
    <div class="cv-card-header pa-4 pb-2">
      <div class="d-flex justify-space-between align-start">
        <v-chip
          :color="getStatusColor(cv.status)"
          size="small"
          variant="tonal"
        >
          {{ cv.status }}
        </v-chip>

        <v-btn
          icon="mdi-star"
          :color="cv.isFavorite ? 'amber' : 'grey'"
          variant="text"
          size="small"
          @click.stop="$emit('favorite', cv.id)"
        />
      </div>
    </div>

    <!-- Avatar and Basic Info -->
    <div class="cv-card-content pa-4 pt-0">
      <div class="d-flex align-center mb-3">
        <v-avatar
          :color="getAvatarColor(cv.name)"
          size="48"
          class="mr-3"
        >
          <span class="text-h6 text-white font-weight-bold">
            {{ getInitials(cv.name) }}
          </span>
        </v-avatar>

        <div class="flex-grow-1">
          <h3 class="text-h6 font-weight-bold mb-1">{{ cv.name }}</h3>
          <p class="text-body-2 text-grey-darken-1 mb-0">{{ cv.experience }}</p>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mb-3">
        <div class="d-flex align-center mb-1">
          <v-icon size="small" color="grey" class="mr-2">mdi-email</v-icon>
          <span class="text-body-2 text-truncate">{{ cv.email }}</span>
        </div>
        <div class="d-flex align-center mb-1">
          <v-icon size="small" color="grey" class="mr-2">mdi-phone</v-icon>
          <span class="text-body-2">{{ cv.phone }}</span>
        </div>
        <div class="d-flex align-center">
          <v-icon size="small" color="grey" class="mr-2">mdi-map-marker</v-icon>
          <span class="text-body-2">{{ cv.location }}</span>
        </div>
      </div>

      <!-- Skills -->
      <div class="mb-3">
        <div class="d-flex flex-wrap gap-1">
          <v-chip
            v-for="skill in cv.skills.slice(0, 3)"
            :key="skill"
            size="x-small"
            variant="outlined"
            color="primary"
            class="text-caption"
          >
            {{ skill }}
          </v-chip>
          <v-chip
            v-if="cv.skills.length > 3"
            size="x-small"
            variant="outlined"
            color="grey"
            class="text-caption"
          >
            +{{ cv.skills.length - 3 }}
          </v-chip>
        </div>
      </div>

      <!-- Match Score -->
      <div class="mb-3">
        <div class="d-flex justify-space-between align-center mb-1">
          <span class="text-caption text-grey-darken-1">Match Score</span>
          <span class="text-caption font-weight-bold">{{ cv.matchScore }}%</span>
        </div>
        <v-progress-linear
          :model-value="cv.matchScore"
          color="primary"
          height="4"
          rounded
        />
      </div>

      <!-- Source and Date -->
      <div class="d-flex justify-space-between align-center">
        <v-chip
          size="x-small"
          variant="outlined"
          color="grey"
        >
          {{ cv.source }}
        </v-chip>
        <span class="text-caption text-grey-darken-1">
          {{ formatDate(cv.uploadDate) }}
        </span>
      </div>
    </div>

    <!-- Action Buttons -->
    <v-card-actions class="pa-4 pt-0">
      <v-btn
        color="primary"
        variant="outlined"
        size="small"
        block
        @click.stop="$emit('view', cv)"
      >
        View Details
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            variant="text"
            size="small"
            v-bind="props"
            @click.stop
          />
        </template>

        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-download"
            @click="$emit('download', cv)"
          >
            Download CV
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-delete"
            @click="$emit('delete', cv.id)"
          >
            Delete
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { CV } from '@/stores/cvLibrary'

interface Props {
  cv: CV
}

defineProps<Props>()

defineEmits<{
  view: [cv: CV]
  favorite: [cvId: number]
  download: [cv: CV]
  delete: [cvId: number]
}>()

// Helper functions
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
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Today'
  if (diffDays === 2) return 'Yesterday'
  if (diffDays <= 7) return `${diffDays - 1} days ago`
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`
  return date.toLocaleDateString()
}
</script>

<style scoped>
.cv-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.cv-card-content {
  flex-grow: 1;
}

.gap-1 {
  gap: 4px;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
