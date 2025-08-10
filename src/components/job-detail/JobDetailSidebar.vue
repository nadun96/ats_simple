<!-- File: src/components/job-detail/JobDetailSidebar.vue -->
<template>
  <v-navigation-drawer
    :permanent="true"
    :width="collapsed ? 60 : 300"
    class="job-sidebar pa-0"
    elevation="4"
  >
    <!-- Header -->
    <div class="sidebar-header pa-4" v-if="!collapsed">
      <div class="d-flex align-center mb-3">
        <v-icon color="primary" size="24" class="mr-2">mdi-briefcase</v-icon>
        <h3 class="text-h6 font-weight-bold text-primary">My Jobs</h3>
      </div>
      <p class="text-caption text-grey-darken-1 mb-0">
        {{ jobs.length }} active job{{ jobs.length !== 1 ? 's' : '' }}
      </p>
    </div>

    <!-- Toggle Button -->
    <div class="toggle-section pa-2">
      <v-btn
        icon
        @click="$emit('toggle-collapse')"
        variant="text"
        color="primary"
        class="toggle-btn"
      >
        <v-icon>{{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </div>

    <!-- Jobs List -->
    <v-list class="jobs-list pa-2" dense>
      <v-list-item
        v-for="job in jobs"
        :key="job.id"
        :value="job.id"
        :active="modelValue === job.id"
        @click="$emit('update:selectedJobId', job.id)"
        class="job-item mb-2"
        :class="{ 'active-job': modelValue === job.id }"
      >
        <template #prepend>
          <v-avatar size="32" class="job-status-indicator">
            <v-icon
              :color="getStatusColor(job.status)"
              size="16"
            >
              {{ getStatusIcon(job.status) }}
            </v-icon>
          </v-avatar>
        </template>

        <v-list-item-content v-if="!collapsed">
          <v-list-item-title class="job-title font-weight-medium">
            {{ job.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="job-subtitle">
            <span class="job-type">{{ job.type }}</span>
            <span class="job-location">{{ job.location }}</span>
          </v-list-item-subtitle>
          <div class="job-meta mt-1">
            <v-chip
              :color="getStatusColor(job.status)"
              size="x-small"
              variant="flat"
              class="status-chip"
            >
              {{ job.status }}
            </v-chip>
            <span class="applications-count text-caption text-grey">
              {{ job.applications }} applications
            </span>
          </div>
        </v-list-item-content>

        <!-- Collapsed view icon -->
        <template #append v-if="collapsed">
          <v-icon
            :color="getStatusColor(job.status)"
            size="16"
          >
            {{ getStatusIcon(job.status) }}
          </v-icon>
        </template>
      </v-list-item>
    </v-list>

    <!-- Empty State -->
    <div v-if="jobs.length === 0" class="empty-state pa-4 text-center">
      <v-icon size="48" color="grey-lighten-2" class="mb-3">mdi-briefcase-outline</v-icon>
      <p class="text-body-2 text-grey">No jobs created yet</p>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
interface Job {
  id: number
  title: string
  type: string
  location: string
  status: string
  applications: number
}

defineProps<{
  jobs: Job[]
  modelValue: number
  collapsed: boolean
}>()

defineEmits(['update:selectedJobId', 'toggle-collapse'])

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

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'public':
      return 'mdi-eye'
    case 'suspended':
      return 'mdi-pause'
    case 'draft':
      return 'mdi-file-document-outline'
    case 'archived':
      return 'mdi-archive'
    default:
      return 'mdi-circle'
  }
}
</script>

<style scoped>
.job-sidebar {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  border-right: 1px solid #e0e0e0;
}

.sidebar-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-section {
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;
}

.toggle-btn {
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background-color: #e3f2fd;
  transform: scale(1.1);
}

.jobs-list {
  background: transparent;
}

.job-item {
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.job-item:hover {
  background-color: #f5f5f5;
  transform: translateX(4px);
}

.active-job {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-color: #1976d2;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
}

.job-status-indicator {
  background: rgba(25, 118, 210, 0.1);
  border: 2px solid rgba(25, 118, 210, 0.2);
}

.job-title {
  font-size: 0.875rem;
  line-height: 1.2;
  margin-bottom: 4px;
}

.job-subtitle {
  font-size: 0.75rem;
  line-height: 1.2;
  margin-bottom: 4px;
}

.job-type {
  color: #1976d2;
  font-weight: 500;
  margin-right: 8px;
}

.job-location {
  color: #666;
}

.job-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-chip {
  font-size: 0.625rem;
  height: 18px;
  font-weight: 600;
}

.applications-count {
  font-size: 0.625rem;
}

.empty-state {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  margin: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .job-sidebar {
    width: 100% !important;
  }
}
</style>
