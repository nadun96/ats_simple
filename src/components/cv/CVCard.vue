<template>
  <v-card class="cv-card" elevation="2" @click="$emit('view', cv)">
    <!-- Enhanced Header with Status and Favorite -->
    <div class="cv-card-header pa-4 pb-2">
      <div class="d-flex justify-space-between align-start">
        <v-chip
          :color="getStatusColor(cv.status)"
          size="small"
          variant="tonal"
          class="status-chip"
        >
          <v-icon size="small" class="mr-1">{{ getStatusIcon(cv.status) }}</v-icon>
          {{ cv.status }}
        </v-chip>

        <v-btn
          :icon="cv.isFavorite ? 'mdi-star' : 'mdi-star-outline'"
          :color="cv.isFavorite ? 'amber' : 'grey'"
          variant="text"
          size="small"
          class="favorite-btn"
          @click.stop="$emit('favorite', cv.id)"
        />
      </div>
    </div>

    <!-- Enhanced Content with better spacing -->
    <div class="cv-card-content pa-4 pt-0">
      <!-- Avatar and Basic Info with improved layout -->
      <div class="avatar-section mb-4">
        <div class="d-flex align-center">
          <v-avatar
            :color="getAvatarColor(cv.name)"
            size="56"
            class="mr-4 avatar-glow"
          >
            <span class="text-h5 text-white font-weight-bold">
              {{ getInitials(cv.name) }}
            </span>
          </v-avatar>

          <div class="candidate-info">
            <h3 class="text-h6 font-weight-bold mb-1 candidate-name">{{ cv.name }}</h3>
            <p class="text-body-2 text-grey-darken-1 mb-0 experience-level">{{ cv.experience }}</p>
            <div class="match-score-badge">
              <v-chip
                size="x-small"
                color="primary"
                variant="tonal"
                class="match-chip"
              >
                {{ cv.matchScore }}% Match
              </v-chip>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Contact Info with icons -->
      <div class="contact-section mb-4">
        <div class="contact-item mb-2">
          <div class="d-flex align-center">
            <v-icon size="small" color="grey" class="mr-2 contact-icon">mdi-email</v-icon>
            <span class="text-body-2 text-truncate contact-text">{{ cv.email }}</span>
          </div>
        </div>
        <div class="contact-item mb-2">
          <div class="d-flex align-center">
            <v-icon size="small" color="grey" class="mr-2 contact-icon">mdi-phone</v-icon>
            <span class="text-body-2 contact-text">{{ cv.phone }}</span>
          </div>
        </div>
        <div class="contact-item">
          <div class="d-flex align-center">
            <v-icon size="small" color="grey" class="mr-2 contact-icon">mdi-map-marker</v-icon>
            <span class="text-body-2 contact-text">{{ cv.location }}</span>
          </div>
        </div>
      </div>

      <!-- Enhanced Skills with better visual hierarchy -->
      <div class="skills-section mb-4">
        <div class="skills-header mb-2">
          <span class="text-caption text-grey-darken-1 font-weight-medium">Skills</span>
        </div>
        <div class="d-flex flex-wrap gap-1">
          <v-chip
            v-for="skill in cv.skills.slice(0, 3)"
            :key="skill"
            size="x-small"
            variant="outlined"
            color="primary"
            class="skill-chip"
          >
            {{ skill }}
          </v-chip>
          <v-chip
            v-if="cv.skills.length > 3"
            size="x-small"
            variant="outlined"
            color="grey"
            class="more-skills-chip"
          >
            +{{ cv.skills.length - 3 }}
          </v-chip>
        </div>
      </div>

      <!-- Enhanced Match Score with visual indicator -->
      <div class="match-score-section mb-4">
        <div class="d-flex justify-space-between align-center mb-2">
          <span class="text-caption text-grey-darken-1 font-weight-medium">Match Score</span>
          <span class="text-caption font-weight-bold match-percentage">{{ cv.matchScore }}%</span>
        </div>
        <v-progress-linear
          :model-value="cv.matchScore"
          :color="getMatchScoreColor(cv.matchScore)"
          height="6"
          rounded
          class="match-progress"
        />
        <div class="match-label text-center mt-1">
          <span class="text-caption text-grey-darken-1">{{ getMatchScoreLabel(cv.matchScore) }}</span>
        </div>
      </div>

      <!-- Enhanced Source and Date with better layout -->
      <div class="meta-section">
        <div class="d-flex justify-space-between align-center">
          <v-chip
            size="x-small"
            variant="outlined"
            color="grey"
            class="source-chip"
          >
            <v-icon size="x-small" class="mr-1">{{ getSourceIcon(cv.source) }}</v-icon>
            {{ cv.source }}
          </v-chip>
          <span class="text-caption text-grey-darken-1 upload-date">{{ formatDate(cv.uploadDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Enhanced Action Buttons -->
    <v-card-actions class="pa-4 pt-0">
      <v-btn
        color="primary"
        variant="outlined"
        size="small"
        block
        class="view-btn"
        @click.stop="$emit('view', cv)"
      >
        <v-icon start size="small">mdi-eye</v-icon>
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
            class="more-actions-btn"
          />
        </template>

        <v-list density="compact" class="actions-menu">
          <v-list-item
            prepend-icon="mdi-download"
            @click="$emit('download', cv)"
            class="action-item"
          >
            <v-list-item-title class="text-body-2">Download CV</v-list-item-title>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-delete"
            @click="$emit('delete', cv.id)"
            class="action-item delete-action"
          >
            <v-list-item-title class="text-body-2">Delete</v-list-item-title>
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

const getStatusIcon = (status: string): string => {
  const statusIcons: Record<string, string> = {
    'New': 'mdi-new-box',
    'CV Selected': 'mdi-check-circle',
    'Phone Evaluated': 'mdi-phone-check',
    'Interview Scheduled': 'mdi-calendar-clock',
    'Interview Completed': 'mdi-calendar-check',
    'Hired': 'mdi-account-check',
    'Rejected': 'mdi-close-circle'
  }
  return statusIcons[status] || 'mdi-flag'
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

const getMatchScoreColor = (score: number): string => {
  if (score >= 90) return 'success'
  if (score >= 80) return 'primary'
  if (score >= 70) return 'info'
  if (score >= 60) return 'warning'
  return 'error'
}

const getMatchScoreLabel = (score: number): string => {
  if (score >= 90) return 'Excellent Match'
  if (score >= 80) return 'Very Good Match'
  if (score >= 70) return 'Good Match'
  if (score >= 60) return 'Fair Match'
  return 'Poor Match'
}

const getSourceIcon = (source: string): string => {
  const sourceIcons: Record<string, string> = {
    'Career Site': 'mdi-web',
    'LinkedIn': 'mdi-linkedin',
    'Indeed': 'mdi-briefcase',
    'Glassdoor': 'mdi-glassdoor',
    'Referral': 'mdi-account-multiple',
    'Job Board': 'mdi-bullhorn',
    'Direct Application': 'mdi-email'
  }
  return sourceIcons[source] || 'mdi-tag'
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  position: relative;
}

.cv-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.cv-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.cv-card:hover::before {
  transform: scaleX(1);
}

.cv-card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.cv-card-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #e0e0e0;
}

.status-chip {
  font-weight: 600;
  border-radius: 20px;
}

.favorite-btn {
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

/* Avatar Section */
.avatar-section {
  position: relative;
}

.avatar-glow {
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.cv-card:hover .avatar-glow {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.candidate-info {
  flex-grow: 1;
}

.candidate-name {
  color: #2c3e50;
  transition: color 0.3s ease;
}

.cv-card:hover .candidate-name {
  color: #667eea;
}

.experience-level {
  font-weight: 500;
}

.match-score-badge {
  margin-top: 4px;
}

.match-chip {
  font-weight: 600;
  border-radius: 12px;
}

/* Contact Section */
.contact-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e9ecef;
}

.contact-item {
  transition: all 0.2s ease;
}

.contact-item:hover {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  padding: 4px;
  margin: -4px;
}

.contact-icon {
  opacity: 0.7;
}

.contact-text {
  font-weight: 500;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Skills Section */
.skills-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e9ecef;
}

.skills-header {
  display: flex;
  align-items: center;
}

.skill-chip {
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.skill-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.more-skills-chip {
  font-weight: 600;
  border-radius: 12px;
}

/* Match Score Section */
.match-score-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e9ecef;
}

.match-percentage {
  color: #667eea;
  font-size: 0.875rem;
}

.match-progress {
  border-radius: 8px;
}

.match-label {
  font-weight: 500;
}

/* Meta Section */
.meta-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e9ecef;
}

.source-chip {
  font-weight: 600;
  border-radius: 12px;
}

.upload-date {
  font-weight: 500;
}

/* Action Buttons */
.view-btn {
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-width: 2px;
}

.view-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.more-actions-btn {
  border-radius: 8px;
  transition: all 0.2s ease;
}

.more-actions-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.actions-menu {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.action-item {
  border-radius: 8px;
  margin: 2px 4px;
  transition: all 0.2s ease;
}

.action-item:hover {
  background: rgba(102, 126, 234, 0.05);
}

.delete-action:hover {
  background: rgba(244, 67, 54, 0.05);
  color: #f44336;
}

/* Responsive Design */
@media (max-width: 600px) {
  .cv-card {
    margin: 0 -8px;
  }

  .cv-card-content {
    padding: 16px;
  }

  .avatar-section {
    flex-direction: column;
    text-align: center;
  }

  .avatar-glow {
    margin: 0 auto 16px auto;
  }
}

/* Animation Classes */
.gap-1 {
  gap: 4px;
}

/* Hover Effects */
.cv-card:hover .contact-section,
.cv-card:hover .skills-section,
.cv-card:hover .match-score-section,
.cv-card:hover .meta-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #667eea;
  transform: translateY(-2px);
}

/* Focus States */
.cv-card:focus-within {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Loading States */
.cv-card.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .cv-card,
  .cv-card:hover,
  .avatar-glow,
  .contact-item,
  .skill-chip,
  .view-btn {
    transition: none;
    transform: none;
  }
}
</style>
