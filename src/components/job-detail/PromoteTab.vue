<template>
  <v-card class="promote-container ma-4 pa-6" elevation="2">
    <!-- Job Posting Sites Section -->
    <div class="sites-section mb-6">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="sites-info">
          <h3 class="text-h5 mb-2 text-grey-darken-2">Job Posting Sites</h3>
          <p class="text-body-1 text-grey">
            This offer is posted on <strong>{{ postingSites.length }}</strong> sites.
          </p>
        </div>
        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-plus"
          size="large"
          @click="addSites"
          class="add-sites-btn"
        >
          Add sites
        </v-btn>
      </div>

      <!-- Sites Grid -->
      <v-row dense>
        <v-col
          v-for="site in postingSites"
          :key="site.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="site-card pa-4" elevation="2" variant="outlined">
            <div class="d-flex align-center mb-3">
              <v-avatar size="40" class="mr-3" color="primary">
                <v-icon color="white" size="24">{{ getSiteIcon(site.name) }}</v-icon>
              </v-avatar>
              <div>
                <h4 class="text-h6 font-weight-medium">{{ site.name }}</h4>
                <v-chip
                  :color="site.status === 'Active' ? 'success' : 'warning'"
                  size="small"
                  variant="flat"
                >
                  {{ site.status }}
                </v-chip>
              </div>
            </div>
            <div class="site-details">
              <div class="d-flex justify-space-between text-caption text-grey">
                <span>Days remaining:</span>
                <span class="font-weight-medium">{{ site.daysRemaining }}</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Applications Table -->
    <div class="applications-section">
      <div class="d-flex justify-space-between align-center mb-4">
        <h3 class="text-h5 text-grey-darken-2">Applications from Sites</h3>
        <v-btn
          color="secondary"
          variant="outlined"
          prepend-icon="mdi-download"
          size="small"
        >
          Export
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
                <v-avatar size="40" class="mr-3 candidate-avatar">
                  <v-img :src="item.avatar || '/default-avatar.png'" />
                  <div v-if="!item.avatar" class="avatar-placeholder">
                    {{ getInitials(item.name) }}
                  </div>
                </v-avatar>
                <div>
                  <div class="font-weight-medium text-body-1">{{ item.name }}</div>
                  <div class="text-caption text-grey">{{ item.email }}</div>
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
              <div class="duration-cell">
                <v-icon size="16" color="grey" class="mr-1">mdi-clock-outline</v-icon>
                {{ item.duration }}
              </div>
            </td>
            <td>
              <div class="date-cell">
                <div class="font-weight-medium">{{ formatDate(item.postingDate) }}</div>
                <div class="text-caption text-grey">{{ getTimeAgo(item.postingDate) }}</div>
              </div>
            </td>
            <td>
              <v-chip
                :color="getDaysRemainingColor(item.daysRemaining)"
                size="small"
                variant="flat"
                class="days-chip"
              >
                <v-icon start size="16">mdi-calendar-clock</v-icon>
                {{ item.daysRemaining }} days
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
                  <v-list-item @click="viewApplication(item)" class="action-item">
                    <v-icon start size="20" color="primary">mdi-account</v-icon>
                    <v-list-item-title>View Application</v-list-item-title>
                  </v-list-item>
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
      <h3 class="text-h5 mb-3 text-grey-darken-1">No applications yet</h3>
      <p class="text-body-1 text-grey mb-6 max-width-400">
        Promote your job to reach more candidates and start receiving applications.
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

interface PostingSite {
  id: number
  name: string
  status: string
  daysRemaining: number
}

interface Application {
  id: number
  name: string
  email: string
  status: string
  duration: string
  postingDate: string
  daysRemaining: number
  avatar: string | null
}

// Generate dynamic posting sites based on job promotion data
const postingSites = computed(() => {
  if (!props.jobData?.promotion) {
    // Fallback to default sites if no promotion data
    return [
      { id: 1, name: 'Indeed', status: 'Active', daysRemaining: 15 },
      { id: 2, name: 'LinkedIn', status: 'Active', daysRemaining: 22 },
      { id: 3, name: 'Glassdoor', status: 'Active', daysRemaining: 8 }
    ]
  }

  const sites: PostingSite[] = []
  let id = 1

  // Add job boards
  if (props.jobData.promotion.jobBoards) {
    props.jobData.promotion.jobBoards.forEach((board: string) => {
      sites.push({
        id: id++,
        name: board,
        status: 'Active',
        daysRemaining: Math.max(0, 30 - Math.floor((Date.now() - new Date(props.jobData!.createdDate).getTime()) / (1000 * 60 * 60 * 24)))
      })
    })
  }

  // Add career site if enabled
  if (props.jobData.promotion.careerSite) {
    sites.push({
      id: id++,
      name: 'Career Site',
      status: 'Active',
      daysRemaining: Math.max(0, 30 - Math.floor((Date.now() - new Date(props.jobData!.createdDate).getTime()) / (1000 * 60 * 60 * 24)))
    })
  }

  return sites
})

// Use job applications data
const applications = computed(() => {
  if (!props.jobData?.applicationsList) {
    // Fallback to empty array if no applications
    return []
  }

  return props.jobData.applicationsList.map(app => ({
    id: app.id,
    name: app.name,
    email: app.email,
    status: app.status,
    duration: '2 days', // Default duration
    postingDate: app.appliedDate,
    daysRemaining: 15, // Default days remaining
    avatar: app.avatar
  }))
})

// Table headers
const tableHeaders = [
  { title: 'NAME', key: 'name', sortable: true },
  { title: 'STATUS', key: 'status', sortable: true },
  { title: 'DURATION OF DIFFUSION', key: 'duration', sortable: true },
  { title: 'POSTING DATE', key: 'postingDate', sortable: true },
  { title: 'NB DAYS REMAINING', key: 'daysRemaining', sortable: true },
  { title: 'ACTIONS', key: 'actions', sortable: false }
]

// Methods
const addSites = () => {
  console.log('Add sites clicked')
  // TODO: Implement add sites functionality
}

const promoteJob = () => {
  console.log('Promote job clicked')
  // TODO: Implement job promotion
}

const viewApplication = (application: Application) => {
  console.log('View application:', application)
  // TODO: Navigate to application detail view
}

const updateStatus = (application: Application, newStatus: string) => {
  console.log('Update status:', application, newStatus)
  // TODO: Update application status
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
      return 'blue'
    case 'shortlisted':
      return 'orange'
    case 'rejected':
      return 'red'
    default:
      return 'grey'
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
      return 'mdi-email-outline'
    case 'shortlisted':
      return 'mdi-star'
    case 'rejected':
      return 'mdi-close-circle'
    default:
      return 'mdi-account'
  }
}

const getDaysRemainingColor = (days: number) => {
  if (days <= 5) return 'red'
  if (days <= 10) return 'orange'
  return 'green'
}

const getSiteIcon = (siteName: string) => {
  switch (siteName.toLowerCase()) {
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
  const posted = new Date(date)
  const diffTime = Math.abs(now.getTime() - posted.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>

<style scoped>
.promote-container {
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.sites-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.sites-info h3 {
  color: #1976d2;
}

.add-sites-btn {
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
}

.add-sites-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

.site-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #e3f2fd;
}

.applications-section {
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

.days-chip {
  font-weight: 600;
  border-radius: 20px;
}

.duration-cell {
  display: flex;
  align-items: center;
  justify-content: center;
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
  .promote-container {
    margin: 16px 8px;
    padding: 16px;
  }

  .sites-section,
  .applications-section {
    padding: 16px;
  }

  .site-card {
    margin-bottom: 16px;
  }
}
</style>
