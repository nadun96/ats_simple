<template>
  <v-list-item
    class="cv-list-item"
    :class="{ 'cv-favorite': cv.isFavorite }"
    @click="$emit('view', cv)"
  >
    <!-- Avatar -->
    <template v-slot:prepend>
      <v-avatar
        :color="getAvatarColor(cv.name)"
        size="40"
        class="mr-3"
      >
        <span class="text-body-1 text-white font-weight-bold">
          {{ getInitials(cv.name) }}
        </span>
      </v-avatar>
    </template>

    <!-- Main Content -->
    <v-list-item-title class="d-flex align-center">
      <span class="font-weight-bold mr-3">{{ cv.name }}</span>
      <v-chip
        :color="getStatusColor(cv.status)"
        size="x-small"
        variant="tonal"
        class="mr-2"
      >
        {{ cv.status }}
      </v-chip>
      <v-chip
        size="x-small"
        variant="outlined"
        color="grey"
        class="mr-2"
      >
        {{ cv.experience }}
      </v-chip>
      <v-chip
        size="x-small"
        variant="outlined"
        color="primary"
      >
        {{ cv.matchScore }}% Match
      </v-chip>
    </v-list-item-title>

    <v-list-item-subtitle class="mt-1">
      <div class="d-flex align-center flex-wrap">
        <span class="mr-4">
          <v-icon size="small" color="grey" class="mr-1">mdi-email</v-icon>
          {{ cv.email }}
        </span>
        <span class="mr-4">
          <v-icon size="small" color="grey" class="mr-1">mdi-phone</v-icon>
          {{ cv.phone }}
        </span>
        <span class="mr-4">
          <v-icon size="small" color="grey" class="mr-1">mdi-map-marker</v-icon>
          {{ cv.location }}
        </span>
        <span class="mr-4">
          <v-icon size="small" color="grey" class="mr-1">mdi-tag</v-icon>
          {{ cv.source }}
        </span>
      </div>
    </v-list-item-subtitle>

    <!-- Skills -->
    <div class="mt-2">
      <div class="d-flex flex-wrap gap-1">
        <v-chip
          v-for="skill in cv.skills.slice(0, 5)"
          :key="skill"
          size="x-small"
          variant="outlined"
          color="primary"
          class="text-caption"
        >
          {{ skill }}
        </v-chip>
        <v-chip
          v-if="cv.skills.length > 5"
          size="x-small"
          variant="outlined"
          color="grey"
          class="text-caption"
        >
          +{{ cv.skills.length - 5 }}
        </v-chip>
      </div>
    </div>

    <!-- Actions -->
    <template v-slot:append>
      <div class="d-flex align-center">
        <!-- Date -->
        <span class="text-caption text-grey-darken-1 mr-3">
          {{ formatDate(cv.uploadDate) }}
        </span>

        <!-- Favorite Button -->
        <v-btn
          icon="mdi-star"
          :color="cv.isFavorite ? 'amber' : 'grey'"
          variant="text"
          size="small"
          @click.stop="$emit('favorite', cv.id)"
          class="mr-2"
        />

        <!-- Download Button -->
        <v-btn
          icon="mdi-download"
          variant="text"
          size="small"
          @click.stop="$emit('download', cv)"
          class="mr-2"
        />

        <!-- More Actions Menu -->
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
              prepend-icon="mdi-eye"
              @click="$emit('view', cv)"
            >
              View Details
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-pencil"
              @click="editCV"
            >
              Edit
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-delete"
              @click="$emit('delete', cv.id)"
            >
              Delete
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-list-item>
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

const editCV = () => {
  // TODO: Implement edit functionality
  console.log('Edit CV:', cv.id)
}
</script>

<style scoped>
.cv-list-item {
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.cv-list-item:hover {
  background-color: #f8f9fa;
}

.cv-favorite {
  background-color: #fff8e1;
}

.cv-favorite:hover {
  background-color: #fff3cd;
}

.gap-1 {
  gap: 4px;
}
</style>
