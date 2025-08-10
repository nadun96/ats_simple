<template>
  <v-card class="applications-container ma-4 pa-6" elevation="2">
    <!-- Applications Summary Cards -->
    <div class="summary-section mb-6">
      <h3 class="text-h6 mb-4 text-grey-darken-2">Applications Overview</h3>
      <v-row dense>
        <v-col
          v-for="(label, index) in labels"
          :key="index"
          :cols="12 / labels.length"
          class="d-flex justify-center"
        >
          <v-card
            class="summary-card pa-4 text-center w-100"
            :class="`status-${index}`"
            elevation="3"
          >
            <div class="status-icon mb-2">
              <v-icon :color="getStatusIconColor(label)" size="32">
                {{ getStatusIcon(label) }}
              </v-icon>
            </div>
            <h2 class="text-h4 mb-1 font-weight-bold">{{ getApplicationCount(label) }}</h2>
            <div class="text-body-2 text-grey-darken-1">{{ label }}</div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Applications Table -->
    <div class="table-section">
      <div class="d-flex justify-space-between align-center mb-4">
        <h3 class="text-h6 text-grey-darken-2">All Applications</h3>
        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-filter"
          size="small"
        >
          Filter
        </v-btn>
      </div>

      <v-data-table
        :headers="tableHeaders"
        :items="applications"
        :items-per-page="10"
        class="applications-table elevation-1"
        hover
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <div class="d-flex align-center">
                <v-avatar size="48" class="mr-3 candidate-avatar">
                  <v-img :src="item.avatar || '/default-avatar.png'" />
                  <div v-if="!item.avatar" class="avatar-placeholder">
                    {{ getInitials(item.name) }}
                  </div>
                </v-avatar>
                <div>
                  <div class="font-weight-medium text-body-1">{{ item.name }}</div>
                  <div class="text-caption text-grey">{{ item.email }}</div>
                  <div class="text-caption text-grey">{{ item.phone }}</div>
                </div>
              </div>
            </td>
            <td>
              <v-chip
                :color="getStatusColor(item.status)"
                size="small"
                variant="flat"
                class="status-chip"
              >
                <v-icon start size="16">{{ getStatusIcon(item.status) }}</v-icon>
                {{ item.status }}
              </v-chip>
            </td>
            <td>
              <div class="date-cell">
                <div class="font-weight-medium">{{ formatDate(item.appliedDate) }}</div>
                <div class="text-caption text-grey">{{ getTimeAgo(item.appliedDate) }}</div>
              </div>
            </td>
            <td>
              <v-chip
                :color="getSourceColor(item.source)"
                size="small"
                variant="outlined"
                class="source-chip"
              >
                <v-icon start size="16">{{ getSourceIcon(item.source) }}</v-icon>
                {{ item.source }}
              </v-chip>
            </td>
            <td>
              <v-menu>
                <template #activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    size="small"
                    variant="text"
                    v-bind="props"
                    class="action-btn"
                  />
                </template>
                <v-list class="action-menu">
                  <v-list-item @click="viewCandidate(item)" class="action-item">
                    <v-icon start size="20" color="primary">mdi-account</v-icon>
                    <v-list-item-title>View Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="viewResume(item)" class="action-item">
                    <v-icon start size="20" color="info">mdi-file-document</v-icon>
                    <v-list-item-title>View Resume</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="scheduleInterview(item)" class="action-item">
                    <v-icon start size="20" color="success">mdi-calendar</v-icon>
                    <v-list-item-title>Schedule Interview</v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="updateStatus(item, 'shortlisted')" class="action-item">
                    <v-icon start size="20" color="warning">mdi-star</v-icon>
                    <v-list-item-title>Shortlist</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="updateStatus(item, 'rejected')" class="action-item">
                    <v-icon start size="20" color="error">mdi-close</v-icon>
                    <v-list-item-title>Reject</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <!-- Empty State -->
    <div v-if="applications.length === 0" class="empty-state text-center py-12">
      <div class="empty-icon mb-4">
        <v-icon size="80" color="grey-lighten-2">mdi-account-multiple-outline</v-icon>
      </div>
      <h3 class="text-h5 mb-3 text-grey-darken-1">No candidates yet</h3>
      <p class="text-body-1 text-grey mb-6 max-width-400">
        Not enough candidates? Post your ad to our partners and start receiving applications.
      </p>
      <v-btn
        color="primary"
        size="large"
        variant="flat"
        prepend-icon="mdi-rocket"
        @click="promoteJob"
      >
        Promote Job
      </v-btn>
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

interface Candidate {
  id: number
  name: string
  email: string
  phone: string
  status: string
  appliedDate: string
  source: string
  avatar: string | null
}

const labels = [
  'New',
  'CV Selected',
  'Phone Evaluated',
  'Interview Passed',
  'Offer Made',
  'Hired',
  'Rejected'
]

// Use job applications data or fallback to empty array
const applications = computed(() => {
  if (props.jobData?.applicationsList) {
    return props.jobData.applicationsList.map(app => ({
      id: app.id,
      name: app.name,
      email: app.email,
      phone: app.phone,
      status: app.status,
      appliedDate: app.appliedDate,
      source: app.source,
      avatar: app.avatar
    }))
  }
  return []
})

// Table headers
const tableHeaders = [
  { title: 'CANDIDATE', key: 'candidate', sortable: true },
  { title: 'STATUS', key: 'status', sortable: true },
  { title: 'APPLIED DATE', key: 'appliedDate', sortable: true },
  { title: 'SOURCE', key: 'source', sortable: true },
  { title: 'ACTIONS', key: 'actions', sortable: false }
]

// Computed properties
const getApplicationCount = (status: string) => {
  return applications.value.filter(app => app.status === status).length
}

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'blue'
    case 'CV Selected':
      return 'orange'
    case 'Phone':
      return 'purple'
    case 'Interview Passed':
      return 'indigo'
    case 'Offer Made':
      return 'amber'
    case 'Hired':
      return 'green'
    case 'Rejected':
      return 'red'
    default:
      return 'grey'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'New':
      return 'mdi-email-outline'
    case 'CV Selected':
      return 'mdi-star-outline'
    case 'Phone':
      return 'mdi-phone'
    case 'Interview Passed':
      return 'mdi-account-check'
    case 'Offer Made':
      return 'mdi-handshake'
    case 'Hired':
      return 'mdi-account-check'
    case 'Rejected':
      return 'mdi-close-circle'
    default:
      return 'mdi-account'
  }
}

const getStatusIconColor = (status: string) => {
  return getStatusColor(status)
}

const getSourceColor = (source: string) => {
  switch (source.toLowerCase()) {
    case 'indeed':
      return 'blue'
    case 'linkedin':
      return 'indigo'
    case 'glassdoor':
      return 'green'
    default:
      return 'grey'
  }
}

const getSourceIcon = (source: string) => {
  switch (source.toLowerCase()) {
    case 'indeed':
      return 'mdi-briefcase'
    case 'linkedin':
      return 'mdi-linkedin'
    case 'glassdoor':
      return 'mdi-glassdoor'
    default:
      return 'mdi-web'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getTimeAgo = (date: string) => {
  const now = new Date()
  const applied = new Date(date)
  const diffTime = Math.abs(now.getTime() - applied.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const viewCandidate = (candidate: Candidate) => {
  console.log('View candidate:', candidate)
  // TODO: Navigate to candidate profile
}

const viewResume = (candidate: Candidate) => {
  console.log('View resume:', candidate)
  // TODO: Open resume viewer
}

const scheduleInterview = (candidate: Candidate) => {
  console.log('Schedule interview:', candidate)
  // TODO: Open interview scheduler
}

const updateStatus = (candidate: Candidate, newStatus: string) => {
  console.log('Update status:', candidate, newStatus)
  // TODO: Update candidate status
}

const promoteJob = () => {
  console.log('Promote job clicked')
  // TODO: Navigate to promote tab
}
</script>

<style scoped>
.applications-container {
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.summary-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.summary-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.status-0 { border-color: #2196f3; }
.status-1 { border-color: #ff9800; }
.status-2 { border-color: #9c27b0; }
.status-3 { border-color: #3f51b5; }
.status-4 { border-color: #ffc107; }
.status-5 { border-color: #4caf50; }
.status-6 { border-color: #f44336; }

.status-icon {
  opacity: 0.8;
}

.table-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.applications-table {
  border-radius: 12px;
  overflow: hidden;
}

.candidate-avatar {
  border: 3px solid #e3f2fd;
  position: relative;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.status-chip {
  font-weight: 600;
  border-radius: 20px;
}

.source-chip {
  border-radius: 20px;
  font-weight: 500;
}

.date-cell {
  text-align: center;
}

.action-btn {
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: #f5f5f5;
  transform: scale(1.1);
}

.action-menu {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.action-item {
  border-radius: 8px;
  margin: 2px 8px;
  transition: all 0.2s ease;
}

.action-item:hover {
  background-color: #f5f5f5;
  transform: translateX(4px);
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
  .applications-container {
    margin: 16px 8px;
    padding: 16px;
  }

  .summary-section,
  .table-section {
    padding: 16px;
  }

  .summary-card {
    margin-bottom: 16px;
  }
}
</style>
