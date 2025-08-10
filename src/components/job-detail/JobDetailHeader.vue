<!-- File: src/components/job-detail/JobDetailHeader.vue -->
<template>
  <div class="job-header pa-6">
    <!-- Background gradient overlay -->
    <div class="header-background"></div>

    <div class="d-flex justify-space-between align-center position-relative">
      <div class="job-info">
        <div class="d-flex align-center mb-3">
          <h1 class="text-h4 font-weight-bold mr-3 text-white">{{ job.title }}</h1>
          <v-icon color="amber" size="24" class="star-icon">mdi-star</v-icon>
        </div>
        <div class="job-meta mb-3">
          <v-chip
            variant="flat"
            color="white"
            size="small"
            class="mr-3 mb-2"
          >
            <v-icon start size="16">mdi-briefcase-outline</v-icon>
            {{ job.type }}
          </v-chip>
          <v-chip
            variant="flat"
            color="white"
            size="small"
            class="mr-3 mb-2"
          >
            <v-icon start size="16">mdi-map-marker</v-icon>
            {{ job.location }}
          </v-chip>
          <v-chip
            variant="flat"
            color="white"
            size="small"
            class="mb-2"
          >
            <v-icon start size="16">mdi-information</v-icon>
            Infos
          </v-chip>
        </div>
        <div class="job-details text-white">
          <span class="mr-4"><strong>Company:</strong> {{ job.company }}</span>
          <span class="mr-4"><strong>Created:</strong> {{ formatDate(job.createdDate) }}</span>
          <span><strong>{{ job.applications }}</strong> applications</span>
        </div>
      </div>

      <div class="d-flex align-center gap-3">
        <!-- Status Dropdown -->
        <v-menu>
          <template #activator="{ props }">
            <v-chip
              :color="getStatusColor(job.status)"
              size="large"
              v-bind="props"
              class="cursor-pointer status-chip"
              variant="flat"
            >
              <v-icon start size="18">mdi-circle</v-icon>
              {{ job.status }}
              <v-icon end size="18">mdi-chevron-down</v-icon>
            </v-chip>
          </template>
          <v-list class="status-menu">
            <v-list-item @click="updateStatus('Public')" class="status-item">
              <v-icon start color="green">mdi-circle</v-icon>
              <v-list-item-title>Public</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus('Suspended')" class="status-item">
              <v-icon start color="orange">mdi-circle</v-icon>
              <v-list-item-title>Suspended</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus('Draft')" class="status-item">
              <v-icon start color="grey">mdi-circle</v-icon>
              <v-list-item-title>Draft</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus('Archived')" class="status-item">
              <v-icon start color="red">mdi-circle</v-icon>
              <v-list-item-title>Archived</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-chip color="white" size="small" variant="outlined" class="visibility-chip">
          <v-icon start size="16">mdi-eye</v-icon>
          Public
        </v-chip>

        <!-- User Actions -->
        <v-btn icon size="large" variant="text" color="white" class="action-btn">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon size="large" variant="text" color="white" class="action-btn">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Job {
  title: string
  type: string
  location: string
  status: string
  company: string
  applications: number
  createdDate: string
}

defineProps<{
  job: Job
}>()

const emit = defineEmits<{
  statusUpdate: [status: string]
}>()

const updateStatus = (newStatus: string) => {
  emit('statusUpdate', newStatus)
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'public':
      return 'success'
    case 'suspended':
      return 'warning'
    case 'draft':
      return 'grey'
    case 'archived':
      return 'error'
    default:
      return 'primary'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.job-header {
  position: relative;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%);
  border-radius: 0 0 16px 16px;
  margin-bottom: 24px;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.position-relative {
  position: relative;
  z-index: 1;
}

.job-info {
  flex: 1;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
}

.job-details {
  font-size: 0.875rem;
  opacity: 0.9;
}

.status-chip {
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.visibility-chip {
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
}

.action-btn {
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.star-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.status-menu {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.status-item {
  border-radius: 8px;
  margin: 2px 8px;
}

.status-item:hover {
  background-color: #f5f5f5;
}

.cursor-pointer {
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .job-header {
    padding: 24px 16px;
  }

  .job-meta {
    flex-direction: column;
  }

  .job-details {
    flex-direction: column;
  }

  .job-details span {
    display: block;
    margin-bottom: 8px;
  }
}
</style>
