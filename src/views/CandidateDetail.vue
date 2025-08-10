<template>
  <div class="candidate-detail-page">
    <div class="candidate-detail-container">
        <!-- Header Section -->
        <div class="candidate-header">
          <div class="header-content">
            <div class="breadcrumb">
              <v-btn
                variant="text"
                prepend-icon="mdi-arrow-left"
                @click="$router.push('/candidates')"
                class="back-btn"
              >
                Back to CV Library
              </v-btn>
            </div>

            <div class="candidate-main-info">
              <div class="candidate-avatar-section">
                <v-avatar size="80" class="mr-4">
                  <v-img :src="candidate?.avatar || '/default-avatar.png'" />
                  <div v-if="!candidate?.avatar" class="avatar-placeholder">
                    {{ getInitials(candidate?.firstName || '', candidate?.lastName || '') }}
                  </div>
                </v-avatar>
                <div class="candidate-details">
                  <h1 class="text-h4 font-weight-bold text-grey-darken-3 mb-2">
                    {{ candidate?.firstName }} {{ candidate?.lastName }}
                  </h1>
                  <div class="candidate-meta">
                    <v-chip
                      :color="getStatusColor(candidate?.status)"
                      size="small"
                      variant="flat"
                      class="status-chip mr-3"
                    >
                      {{ formatStatus(candidate?.status) }}
                    </v-chip>
                    <span class="text-body-1 text-grey-darken-1">
                      {{ candidate?.experience }} year{{ candidate?.experience !== 1 ? 's' : '' }} experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="header-actions">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-pencil"
              @click="editCandidate"
              class="edit-btn"
            >
              Edit
            </v-btn>
            <v-btn
              color="primary"
              variant="elevated"
              prepend-icon="mdi-download"
              @click="downloadCV"
              :disabled="!candidate?.cvUrl"
              class="download-btn"
            >
              Download CV
            </v-btn>
          </div>
        </div>

        <!-- Main Content -->
        <div class="candidate-content">
          <v-row>
            <!-- Left Column - Main Information -->
            <v-col cols="12" lg="8">
              <!-- Contact Information Card -->
              <v-card class="info-card mb-6" elevation="1">
                <v-card-title class="card-title">
                  <v-icon start color="primary">mdi-account-circle</v-icon>
                  Contact Information
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Email</label>
                        <div class="info-value">
                          <v-icon size="16" color="primary" class="mr-2">mdi-email</v-icon>
                          {{ candidate?.email }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Phone</label>
                        <div class="info-value">
                          <v-icon size="16" color="primary" class="mr-2">mdi-phone</v-icon>
                          {{ candidate?.countryCode }} {{ candidate?.phone }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Location</label>
                        <div class="info-value">
                          <v-icon size="16" color="primary" class="mr-2">mdi-map-marker</v-icon>
                          {{ candidate?.location || 'Not specified' }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Availability</label>
                        <div class="info-value">
                          <v-icon size="16" color="primary" class="mr-2">mdi-calendar</v-icon>
                          {{ candidate?.availability || 'Not specified' }}
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Professional Information Card -->
              <v-card class="info-card mb-6" elevation="1">
                <v-card-title class="card-title">
                  <v-icon start color="primary">mdi-briefcase</v-icon>
                  Professional Information
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Experience</label>
                        <div class="info-value">
                          <v-icon size="16" color="primary" class="mr-2">mdi-clock</v-icon>
                          {{ candidate?.experience }} year{{ candidate?.experience !== 1 ? 's' : '' }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Study Level</label>
                        <div class="info-value">
                          <v-icon size="16" color="primary" class="mr-2">mdi-school</v-icon>
                          {{ candidate?.studyLevel || 'Not specified' }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Salary Range</label>
                        <div class="info-value">
                          <v-icon size="16" color="primary" class="mr-2">mdi-currency-eur</v-icon>
                          {{ candidate?.salary ? formatSalary(candidate.salary) : 'Not specified' }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="info-item">
                        <label class="info-label">Rating</label>
                        <div class="info-value">
                          <v-rating
                            :model-value="candidate?.rating || 0"
                            readonly
                            density="compact"
                            size="small"
                            color="warning"
                            class="mr-2"
                          />
                          <span>{{ candidate?.rating || 0 }}/5</span>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Applied Jobs Card -->
              <v-card class="info-card mb-6" elevation="1">
                <v-card-title class="card-title">
                  <v-icon start color="primary">mdi-briefcase-outline</v-icon>
                  Applied Jobs
                </v-card-title>
                <v-card-text>
                  <div v-if="candidate?.appliedJobs?.length" class="applied-jobs-list">
                    <div
                      v-for="job in candidate.appliedJobs"
                      :key="job.id"
                      class="job-item"
                    >
                      <div class="job-header">
                        <h4 class="job-title">{{ job.title }}</h4>
                        <v-chip
                          :color="getJobStatusColor(job.status)"
                          size="small"
                          variant="flat"
                        >
                          {{ formatJobStatus(job.status) }}
                        </v-chip>
                      </div>
                      <div class="job-details">
                        <span class="job-company">{{ job.company }}</span>
                        <span class="job-separator">•</span>
                        <span class="job-contract">{{ job.contractType }} ({{ job.duration }})</span>
                        <span class="job-separator">•</span>
                        <span class="job-location">
                          {{ job.location }}
                          <v-icon v-if="job.remote" size="14" color="primary" class="ml-1">mdi-laptop</v-icon>
                        </span>
                      </div>
                      <div class="job-date">
                        Applied: {{ formatDate(job.appliedDate) }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-jobs">
                    <v-icon size="48" color="grey" class="mb-3">mdi-briefcase-off</v-icon>
                    <p class="text-body-1 text-grey-darken-1">No jobs applied yet</p>
                  </div>
                </v-card-text>
              </v-card>

              <!-- CV Preview Card -->
              <v-card class="info-card mb-6" elevation="1">
                <v-card-title class="card-title">
                  <v-icon start color="primary">mdi-file-document</v-icon>
                  CV Preview
                </v-card-title>
                <v-card-text>
                  <div v-if="candidate?.cvUrl" class="cv-preview">
                    <iframe
                      :src="candidate.cvUrl"
                      width="100%"
                      height="600"
                      frameborder="0"
                      class="cv-iframe"
                    ></iframe>
                  </div>
                  <div v-else class="no-cv">
                    <v-icon size="48" color="grey" class="mb-3">mdi-file-document-outline</v-icon>
                    <p class="text-body-1 text-grey-darken-1 mb-3">No CV uploaded yet</p>
                    <v-btn
                      variant="outlined"
                      prepend-icon="mdi-upload"
                      @click="uploadCV"
                      class="upload-btn"
                    >
                      Upload CV
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Right Column - Sidebar -->
            <v-col cols="12" lg="4">
              <!-- Evaluation Card -->
              <v-card class="sidebar-card mb-6" elevation="1">
                <v-card-title class="card-title">
                  <v-icon start color="warning">mdi-star</v-icon>
                  Evaluation
                </v-card-title>
                <v-card-text>
                  <div class="evaluation-content">
                    <div class="rating-section mb-4">
                      <label class="rating-label text-body-2 text-grey-darken-2 mb-2">
                        Overall Rating
                      </label>
                      <v-rating
                        v-model="evaluation.rating"
                        color="warning"
                        size="large"
                        class="mb-2"
                      />
                      <div class="rating-actions">
                        <v-btn
                          variant="outlined"
                          size="small"
                          @click="requestEvaluation"
                          class="request-btn"
                        >
                          Request evaluation
                        </v-btn>
                        <v-btn
                          color="warning"
                          variant="elevated"
                          size="small"
                          @click="evaluateCandidate"
                          class="evaluate-btn"
                        >
                          Evaluate candidate
                        </v-btn>
                      </div>
                    </div>

                    <div class="comments-section">
                      <label class="comments-label text-body-2 text-grey-darken-2 mb-2">
                        Comments
                      </label>
                      <v-textarea
                        v-model="evaluation.comments"
                        variant="outlined"
                        density="compact"
                        rows="4"
                        placeholder="Write your evaluation comments..."
                        hide-details
                        class="comments-input"
                      />
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Recruitment Status Card -->
              <v-card class="sidebar-card mb-6" elevation="1">
                <v-card-title class="card-title">
                  <v-icon start color="info">mdi-account-multiple</v-icon>
                  Recruitment Status
                </v-card-title>
                <v-card-text>
                  <div class="recruitment-content">
                    <div class="status-selector mb-4">
                      <label class="status-label text-body-2 text-grey-darken-2 mb-2">
                        Current Step
                      </label>
                      <v-select
                        v-model="recruitmentStatus.step"
                        :items="recruitmentSteps"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="status-select"
                      />
                    </div>

                    <div class="talent-pools mb-4">
                      <label class="pools-label text-body-2 text-grey-darken-2 mb-2">
                        Talent Pools
                      </label>
                      <div class="pools-list">
                        <v-chip
                          v-for="pool in candidate?.talentPools"
                          :key="pool"
                          size="small"
                          variant="outlined"
                          class="pool-chip mr-2 mb-2"
                        >
                          {{ pool }}
                        </v-chip>
                      </div>
                    </div>

                    <div class="manage-actions">
                      <v-btn
                        variant="outlined"
                        size="small"
                        @click="manageRecruitment"
                        class="manage-btn"
                      >
                        Manage
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Profile Summary Card -->
              <v-card class="sidebar-card mb-6" elevation="1">
                <v-card-title class="card-title">
                  <v-icon start color="success">mdi-account-details</v-icon>
                  Profile Summary
                </v-card-title>
                <v-card-text>
                  <div class="profile-summary">
                    <div class="summary-item mb-3">
                      <label class="summary-label">Age</label>
                      <span class="summary-value">{{ candidate?.age || 'Not specified' }}</span>
                    </div>
                    <div class="summary-item mb-3">
                      <label class="summary-label">Experience</label>
                      <span class="summary-value">{{ candidate?.experience }} year{{ candidate?.experience !== 1 ? 's' : '' }}</span>
                    </div>
                    <div class="summary-item mb-3">
                      <label class="summary-label">Study Level</label>
                      <span class="summary-value">{{ candidate?.studyLevel || 'Not specified' }}</span>
                    </div>
                    <div class="summary-item mb-3">
                      <label class="summary-label">Availability</label>
                      <span class="summary-value">{{ candidate?.availability || 'Not specified' }}</span>
                    </div>
                    <div class="summary-item">
                      <label class="summary-label">Salary</label>
                      <span class="summary-value">{{ candidate?.salary ? formatSalary(candidate.salary) : 'Not specified' }}</span>
                    </div>
                  </div>
                  <div class="see-more-section mt-4">
                    <v-btn
                      variant="text"
                      color="primary"
                      @click="viewFullProfile"
                      class="see-more-btn"
                    >
                      See more
                      <v-icon end size="16">mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import type { Candidate } from '@/types/interfaces/candidate-types'
import { CandidateStatus, JobApplicationStatus } from '@/types/interfaces/candidate-types'

const route = useRoute()

// Mock data - replace with actual API calls
const candidate = ref<Candidate | null>(null)
const evaluation = ref({
  rating: 0,
  comments: ''
})
const recruitmentStatus = ref({
  step: 'New'
})

const recruitmentSteps = [
  'New',
  'CV Selected',
  'Phone Evaluated',
  'Interview Passed',
  'Offer Made'
]

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const getStatusColor = (status: CandidateStatus | undefined) => {
  if (!status) return 'grey'
  const colors = {
    [CandidateStatus.NEW]: 'primary',
    [CandidateStatus.CV_SELECTED]: 'info',
    [CandidateStatus.PHONE_EVALUATED]: 'warning',
    [CandidateStatus.INTERVIEW_PASSED]: 'success',
    [CandidateStatus.OFFER_MADE]: 'purple',
    [CandidateStatus.HIRED]: 'success',
    [CandidateStatus.REJECTED]: 'error'
  }
  return colors[status] || 'grey'
}

const formatStatus = (status: CandidateStatus | undefined) => {
  if (!status) return 'Unknown'
  const labels = {
    [CandidateStatus.NEW]: 'New',
    [CandidateStatus.CV_SELECTED]: 'CV Selected',
    [CandidateStatus.PHONE_EVALUATED]: 'Phone Evaluated',
    [CandidateStatus.INTERVIEW_PASSED]: 'Interview Passed',
    [CandidateStatus.OFFER_MADE]: 'Offer Made',
    [CandidateStatus.HIRED]: 'Hired',
    [CandidateStatus.REJECTED]: 'Rejected'
  }
  return labels[status] || status
}

const getJobStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    applied: 'primary',
    reviewing: 'info',
    shortlisted: 'warning',
    interviewing: 'purple',
    offered: 'success',
    hired: 'success',
    rejected: 'error'
  }
  return colors[status] || 'grey'
}

const formatJobStatus = (status: string) => {
  const labels: Record<string, string> = {
    applied: 'Applied',
    reviewing: 'Reviewing',
    shortlisted: 'Shortlisted',
    interviewing: 'Interviewing',
    offered: 'Offered',
    hired: 'Hired',
    rejected: 'Rejected'
  }
  return labels[status] || status
}

const formatSalary = (salary: { min: number; max: number; currency: string } | null) => {
  if (!salary) return 'Not specified'
  return `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} €`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const editCandidate = () => {
  // TODO: Implement edit functionality
  console.log('Edit candidate')
}

const downloadCV = () => {
  if (candidate.value?.cvUrl) {
    // TODO: Implement CV download
    console.log('Download CV')
  }
}

const uploadCV = () => {
  // TODO: Implement CV upload
  console.log('Upload CV')
}

const requestEvaluation = () => {
  // TODO: Implement evaluation request
  console.log('Request evaluation')
}

const evaluateCandidate = () => {
  // TODO: Implement candidate evaluation
  console.log('Evaluate candidate')
}

const manageRecruitment = () => {
  // TODO: Implement recruitment management
  console.log('Manage recruitment')
}

const viewFullProfile = () => {
  // TODO: Navigate to full profile view
  console.log('View full profile')
}

onMounted(async () => {
  const candidateId = route.params.id as string

  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500))

  candidate.value = {
    id: candidateId,
    firstName: 'Nadun',
    lastName: 'Bandara',
    email: 'nadunudaraka@gmail.com',
    phone: '71 63 36 78 8',
    countryCode: '+33',
    age: 28,
    experience: 1,
    studyLevel: 'No diploma',
    location: 'Paris, France',
    availability: 'Jul 16, 2025',
    salary: { min: 30000, max: 35000, currency: 'EUR' },
    status: CandidateStatus.NEW,
    appliedJobs: [
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Tech Corp',
        status: JobApplicationStatus.APPLIED,
        appliedDate: '2024-01-15',
        contractType: 'CDD',
        duration: '6 months',
        location: 'Paris',
        remote: true
      }
    ],
    talentPools: ['Sourcing'],
    tags: ['JavaScript', 'React', 'Node.js'],
    rating: 4,
    notes: 'Promising candidate with good technical skills',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }

  evaluation.value.rating = candidate.value.rating
})
</script>

<style scoped>
.candidate-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.candidate-detail-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.candidate-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.header-content {
  flex: 1;
}

.breadcrumb {
  margin-bottom: 16px;
}

.back-btn {
  color: var(--color-primary);
  text-transform: none;
}

.candidate-main-info {
  display: flex;
  align-items: center;
}

.candidate-avatar-section {
  display: flex;
  align-items: center;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 32px;
}

.candidate-details h1 {
  margin: 0;
  color: var(--color-heading);
}

.candidate-meta {
  display: flex;
  align-items: center;
}

.status-chip {
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.edit-btn, .download-btn {
  border-radius: 8px;
}

.download-btn {
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
}

.candidate-content {
  margin-top: 24px;
}

.info-card, .sidebar-card {
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-title {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 16px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.info-item {
  margin-bottom: 16px;
}

.info-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.info-value {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #1f2937;
}

.applied-jobs-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.job-item {
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.02);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.job-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.job-details {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #1f2937;
}

.job-separator {
  color: var(--color-secondary);
}

.job-date {
  font-size: 0.8rem;
  color: var(--color-secondary);
}

.no-jobs, .no-cv {
  text-align: center;
  padding: 32px;
  color: var(--color-secondary);
}

.cv-preview {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.cv-iframe {
  border: none;
}

.upload-btn {
  border-radius: 8px;
}

.evaluation-content, .recruitment-content, .profile-summary {
  padding: 8px 0;
}

.rating-section, .status-selector, .talent-pools {
  margin-bottom: 24px;
}

.rating-label, .status-label, .pools-label, .comments-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}

.rating-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.request-btn, .evaluate-btn, .manage-btn {
  border-radius: 6px;
}

.evaluate-btn {
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
}

.comments-input {
  border-radius: 8px;
}

.pools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pool-chip {
  font-size: 0.75rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-size: 0.875rem;
  color: var(--color-secondary);
}

.summary-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.see-more-section {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.see-more-btn {
  text-transform: none;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .candidate-detail-container {
    padding: 16px;
  }

  .candidate-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .header-actions {
    justify-content: stretch;
  }

  .edit-btn, .download-btn {
    flex: 1;
  }

  .candidate-main-info {
    flex-direction: column;
    text-align: center;
  }

  .candidate-avatar-section {
    flex-direction: column;
    margin-bottom: 16px;
  }

  .candidate-meta {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .candidate-detail-container {
    padding: 12px;
  }

  .card-title {
    padding: 12px 16px;
    font-size: 1rem;
  }

  .job-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .job-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .rating-actions {
    flex-direction: column;
  }

  .request-btn, .evaluate-btn {
    width: 100%;
  }
}
</style>
