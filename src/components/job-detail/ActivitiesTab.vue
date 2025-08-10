<template>
  <v-card class="activities-container ma-4 pa-6" elevation="2">
    <!-- Header -->
    <div class="activities-header mb-6">
      <h3 class="text-h5 mb-2 text-grey-darken-2">Recent Activities</h3>
      <p class="text-body-1 text-grey">
        Track all activities related to this job posting
      </p>
    </div>

    <!-- Activities Timeline -->
    <div class="activities-timeline">
      <div
        v-for="(activity, index) in activities"
        :key="activity.id"
        class="activity-item"
        :class="{ 'activity-item--highlighted': activity.highlighted }"
      >
        <!-- Timeline connector -->
        <div class="timeline-connector" v-if="index < activities.length - 1"></div>

        <!-- Activity icon -->
        <div class="activity-icon">
          <v-avatar
            :color="getActivityColor(activity.type)"
            size="40"
            class="activity-avatar"
          >
            <v-icon color="white" size="20">
              {{ getActivityIcon(activity.type) }}
            </v-icon>
          </v-avatar>
        </div>

        <!-- Activity content -->
        <div class="activity-content">
          <div class="activity-header">
            <h4 class="activity-title font-weight-medium">
              {{ activity.title }}
            </h4>
            <span class="activity-time text-caption text-grey">
              {{ getTimeAgo(activity.timestamp) }}
            </span>
          </div>
          <p class="activity-description text-body-2 text-grey-darken-1">
            {{ activity.description }}
          </p>

          <!-- Activity metadata -->
          <div class="activity-meta" v-if="activity.metadata">
            <v-chip
              v-for="(meta, key) in activity.metadata"
              :key="key"
              :color="getMetaColor(key)"
              size="small"
              variant="outlined"
              class="meta-chip mr-2 mb-2"
            >
              <v-icon start size="16">{{ getMetaIcon(key) }}</v-icon>
              {{ meta }}
            </v-chip>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="activities.length === 0" class="empty-state text-center py-12">
      <div class="empty-icon mb-4">
        <v-icon size="80" color="grey-lighten-2">mdi-clock-outline</v-icon>
      </div>
      <h3 class="text-h5 mb-3 text-grey-darken-1">No activities yet</h3>
      <p class="text-body-1 text-grey mb-6 max-width-400">
        Activities will appear here as you interact with candidates and manage the job posting.
      </p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Job } from '@/services/jobService'

interface Props {
  jobData?: Job
}

const props = defineProps<Props>()

interface Activity {
  id: number
  type: string
  title: string
  description: string
  timestamp: string
  highlighted?: boolean
  metadata?: Record<string, string>
}

// Generate dynamic activities based on job data
const activities = computed(() => {
  if (!props.jobData) return []

  const jobActivities: Activity[] = []

  // Add job creation activity
  jobActivities.push({
    id: 1,
    type: 'job_created',
    title: 'Job posting created',
    description: `Created "${props.jobData.title}" position`,
    timestamp: props.jobData.createdDate + 'T00:00:00Z',
    highlighted: true
  })

  // Add application activities
  if (props.jobData.applicationsList) {
    props.jobData.applicationsList.forEach((app, index) => {
      jobActivities.push({
        id: 2 + index,
        type: 'application',
        title: 'New application received',
        description: `${app.name} submitted an application`,
        timestamp: app.appliedDate,
        metadata: { 'Source': app.source, 'Status': app.status }
      })
    })
  }

  // Add workflow stage activities
  if (props.jobData.workflow?.stages) {
    props.jobData.workflow.stages.forEach((stage, index) => {
      jobActivities.push({
        id: 100 + index,
        type: 'workflow',
        title: `Workflow stage: ${stage.name}`,
        description: stage.description,
        timestamp: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString(),
        metadata: { 'Stage': stage.name }
      })
    })
  }

  return jobActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
})

const getActivityColor = (type: string) => {
  switch (type) {
    case 'application':
      return 'success'
    case 'job_created':
      return 'primary'
    case 'workflow':
      return 'info'
    case 'status_change':
      return 'info'
    case 'interview':
      return 'warning'
    case 'job_update':
      return 'primary'
    case 'promotion':
      return 'purple'
    default:
      return 'grey'
  }
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'application':
      return 'mdi-account-plus'
    case 'job_created':
      return 'mdi-briefcase-plus'
    case 'workflow':
      return 'mdi-format-list-checks'
    case 'status_change':
      return 'mdi-arrow-right-bold'
    case 'interview':
      return 'mdi-calendar-clock'
    case 'job_update':
      return 'mdi-pencil'
    case 'promotion':
      return 'mdi-rocket'
    default:
      return 'mdi-information'
  }
}

const getMetaColor = (key: string) => {
  switch (key.toLowerCase()) {
    case 'candidate':
      return 'primary'
    case 'source':
      return 'success'
    case 'status':
      return 'warning'
    case 'type':
      return 'info'
    case 'platform':
      return 'purple'
    default:
      return 'grey'
  }
}

const getMetaIcon = (key: string) => {
  switch (key.toLowerCase()) {
    case 'candidate':
      return 'mdi-account'
    case 'source':
      return 'mdi-web'
    case 'status':
      return 'mdi-flag'
    case 'type':
      return 'mdi-tag'
    case 'platform':
      return 'mdi-monitor'
    default:
      return 'mdi-information'
  }
}

const getTimeAgo = (timestamp: string) => {
  const now = new Date()
  const activityTime = new Date(timestamp)
  const diffTime = Math.abs(now.getTime() - activityTime.getTime())
  const diffMinutes = Math.ceil(diffTime / (1000 * 60))
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) return `${diffMinutes} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}
</script>

<style scoped>
.activities-container {
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.activities-header {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.activities-header h3 {
  color: #1976d2;
}

.activities-timeline {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 32px;
  position: relative;
}

.activity-item:last-child {
  margin-bottom: 0;
}

.activity-item--highlighted {
  background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e1 100%);
  border-radius: 12px;
  padding: 16px;
  margin: -16px -16px 16px -16px;
  border-left: 4px solid #4caf50;
}

.timeline-connector {
  position: absolute;
  left: 20px;
  top: 40px;
  width: 2px;
  height: 32px;
  background: linear-gradient(180deg, #e0e0e0 0%, transparent 100%);
}

.activity-icon {
  margin-right: 20px;
  flex-shrink: 0;
}

.activity-avatar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.activity-title {
  font-size: 1rem;
  color: #333;
  margin: 0;
}

.activity-time {
  font-size: 0.75rem;
  white-space: nowrap;
  margin-left: 16px;
}

.activity-description {
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.activity-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-chip {
  border-radius: 16px;
  font-weight: 500;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 48px 24px;
}

.empty-icon {
  opacity: 0.6;
}

.max-width-400 {
  max-width: 400px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .activities-container {
    margin: 16px 8px;
    padding: 16px;
  }

  .activities-header,
  .activities-timeline {
    padding: 16px;
  }

  .activity-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .activity-time {
    margin-left: 0;
    margin-top: 4px;
  }
}
</style>
