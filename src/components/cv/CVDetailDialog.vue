<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="900px"
    persistent
    class="cv-detail-dialog"
    transition="dialog-bottom-transition"
  >
    <v-card v-if="cv" class="detail-card">
      <!-- Enhanced Header with gradient and better layout -->
      <div class="dialog-header">
        <div class="candidate-profile">
          <v-avatar size="80" color="green" class="candidate-avatar">
            <span class="avatar-text">{{ getInitials(cv.name) }}</span>
          </v-avatar>

          <div class="candidate-info">
            <h2 class="candidate-name">{{ cv.name }}</h2>
            <div class="candidate-meta">
              <v-chip
                :color="getStatusColor(cv.status)"
                size="small"
                variant="tonal"
                class="status-chip"
              >
                <v-icon size="small" class="mr-1">{{ getStatusIcon(cv.status) }}</v-icon>
                {{ cv.status }}
              </v-chip>

              <v-chip
                size="small"
                variant="outlined"
                color="grey"
                class="experience-chip"
              >
                {{ cv.experience }}
              </v-chip>
            </div>
          </div>
        </div>

        <div class="header-right-section">
          <div class="header-actions">
            <v-btn
              :icon="cv.isFavorite ? 'mdi-star' : 'mdi-star-outline'"
              :color="cv.isFavorite ? 'amber' : 'white'"
              variant="text"
              size="large"
              class="favorite-btn"
              @click="$emit('favorite', cv.id)"
            />

            <v-btn
              color="yellow"
              variant="text"
              size="large"
              class="edit-btn"
              @click="editCV"
            >
              <v-icon size="large">mdi-pencil</v-icon>
            </v-btn>

            <v-btn
              color="red"
              variant="text"
              size="large"
              class="delete-btn"
              @click="confirmDelete"
            >
              <v-icon size="large">mdi-delete</v-icon>
            </v-btn>

            <v-btn
              icon="mdi-close"
              color="red"
              variant="text"
              size="large"
              @click="closeDialog"
              class="close-btn"
            />
          </div>

          <!-- Download buttons on separate line -->
          <div class="download-actions">
            <v-btn
              color="green"
              size="small"
              class="file-btn cv-btn"
              @click="$emit('download', cv)"
            >
              <v-icon start size="small">mdi-download</v-icon>
              CV
            </v-btn>

            <v-btn
              v-if="cv.coverLetter"
              color="yellow"
              size="small"
              class="file-btn cover-btn"
              @click="downloadCoverLetter"
            >
              <v-icon start size="small">mdi-download</v-icon>
              Cover Letter
            </v-btn>
          </div>
        </div>

        <!-- Full-width progress bar at bottom of header -->
        <div class="header-full-progress">
          <v-progress-linear
            :model-value="cv.matchScore"
            color="primary"
            height="6"
            rounded
            class="full-width-progress"
          />
          <span class="progress-percentage">{{ cv.matchScore }}%</span>
        </div>
      </div>

      <!-- Enhanced Content with better layout -->
      <v-card-text class="detail-content pa-0">
        <div class="content-grid">
          <!-- Left Column - Main Information -->
          <div class="left-column">
            <!-- Contact Information Card -->
            <div class="info-card contact-card">
              <div class="card-header">
                <v-icon color="primary" class="mr-2" size="24">mdi-account-circle</v-icon>
                <h3 class="card-title">Contact Information</h3>
              </div>
              <div class="card-content">
                <div class="contact-item">
                  <v-icon size="20" color="grey" class="contact-icon">mdi-email</v-icon>
                  <span class="contact-text">{{ cv.email }}</span>
                </div>
                <div class="contact-item">
                  <v-icon size="20" color="grey" class="contact-icon">mdi-phone</v-icon>
                  <span class="contact-text">{{ cv.phone }}</span>
                </div>
                <div class="contact-item">
                  <v-icon size="20" color="grey" class="contact-icon">mdi-map-marker</v-icon>
                  <span class="contact-text">{{ cv.location }}</span>
                </div>
                <div class="contact-item">
                  <v-icon size="20" color="grey" class="contact-icon">mdi-tag</v-icon>
                  <span class="contact-text">{{ cv.source }}</span>
                </div>
              </div>
            </div>

            <!-- Skills Card -->
            <div class="info-card skills-card">
              <div class="card-header">
                <v-icon color="success" class="mr-2" size="24">mdi-tools</v-icon>
                <h3 class="card-title">Skills</h3>
              </div>
              <div class="card-content">
                <div class="skills-grid">
                  <v-chip
                    v-for="skill in cv.skills"
                    :key="skill"
                    size="small"
                    variant="outlined"
                    color="primary"
                    class="skill-chip"
                  >
                    {{ skill }}
                  </v-chip>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Metrics and Actions -->
          <div class="right-column">
            <!-- Timeline Card - Always visible at top -->
            <div class="info-card timeline-card">
              <div class="card-header timeline-header" @click="toggleTimeline">
                <div class="header-left">
                  <v-icon color="info" class="mr-2" size="24">mdi-timeline</v-icon>
                  <h3 class="card-title">Timeline</h3>
                </div>
                <v-icon
                  :icon="isTimelineExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  size="20"
                  color="grey"
                  class="toggle-icon"
                />
              </div>
              <div v-show="isTimelineExpanded" class="card-content">
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-dot applied"></div>
                    <div class="timeline-content">
                      <div class="timeline-title">Applied</div>
                      <div class="timeline-date">{{ formatDate(cv.appliedDate) }}</div>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-dot uploaded"></div>
                    <div class="timeline-content">
                      <div class="timeline-title">Uploaded</div>
                      <div class="timeline-date">{{ formatDate(cv.uploadDate) }}</div>
                    </div>
                  </div>

                  <div v-if="cv.lastViewed" class="timeline-item">
                    <div class="timeline-dot viewed"></div>
                    <div class="timeline-content">
                      <div class="timeline-title">Last Viewed</div>
                      <div class="timeline-date">{{ formatDate(cv.lastViewed) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Always visible sections -->
            <div class="always-visible-sections">
              <!-- Notes Card -->
              <div v-if="cv.notes" class="info-card notes-card">
                <div class="card-header timeline-header" @click="toggleNotes">
                  <div class="header-left">
                    <v-icon color="info" class="mr-2" size="24">mdi-note-text</v-icon>
                    <h3 class="card-title">Notes</h3>
                  </div>
                  <v-icon
                    :icon="isNotesExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    size="20"
                    color="grey"
                    class="toggle-icon"
                  />
                </div>
                <div v-show="isNotesExpanded" class="card-content">
                  <p class="notes-text">{{ cv.notes }}</p>
                </div>
              </div>

              <!-- Tags Card -->
              <div v-if="cv.tags.length > 0" class="info-card tags-card">
                <div class="card-header timeline-header" @click="toggleTags">
                  <div class="header-left">
                    <v-icon color="warning" class="mr-2" size="24">mdi-tag-multiple</v-icon>
                    <h3 class="card-title">Tags</h3>
                  </div>
                  <v-icon
                    :icon="isTagsExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    size="20"
                    color="grey"
                    class="toggle-icon"
                  />
                </div>
                <div v-show="isTagsExpanded" class="card-content">
                  <div class="tags-grid">
                    <v-chip
                      v-for="tag in cv.tags"
                      :key="tag"
                      size="small"
                      variant="tonal"
                      color="warning"
                      class="tag-chip"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

// State
const isTimelineExpanded = ref(false)
const isNotesExpanded = ref(false)
const isTagsExpanded = ref(false)

// Computed
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

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
    'Applied': 'mdi-account-check',
    'Interviewed': 'mdi-account-group',
    'Hired': 'mdi-account-check-circle',
    'Rejected': 'mdi-account-remove',
    'Pending': 'mdi-clock-outline'
  }
  return statusIcons[status] || 'mdi-flag'
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
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Methods
const closeDialog = () => {
  dialogVisible.value = false
}

const downloadCoverLetter = () => {
  // TODO: Implement cover letter download
  console.log('Download cover letter')
}

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this CV? This action cannot be undone.')) {
    emit('delete', props.cv!.id)
    closeDialog()
  }
}

const editCV = () => {
  // TODO: Implement edit functionality
  console.log('Edit CV:', props.cv?.id)
}

// Methods
const toggleTimeline = () => {
  isTimelineExpanded.value = !isTimelineExpanded.value
}

const toggleNotes = () => {
  isNotesExpanded.value = !isNotesExpanded.value
}

const toggleTags = () => {
  isTagsExpanded.value = !isTagsExpanded.value
}
</script>

<style scoped>
.cv-detail-dialog {
  border-radius: 20px;
}

.detail-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
}

/* Enhanced Header with plain colors */
.dialog-header {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 32px 32px 80px 32px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.candidate-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.candidate-avatar {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.candidate-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.avatar-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
}

.candidate-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.candidate-name {
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.candidate-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.status-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white !important;
  font-weight: 600;
}

.experience-chip {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white !important;
  font-weight: 600;
}

.header-right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  flex-shrink: 0;
}

.download-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.favorite-btn {
  transition: all 0.3s ease;
  color: #fbbf24 !important;
  font-size: 1.5rem;
}

.favorite-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1) !important;
}

.edit-btn {
  transition: all 0.3s ease;
  color: #ffffff !important;
  font-size: 1.5rem;
  background: transparent !important;
  border-radius: 50% !important;
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
  max-width: 48px !important;
  max-height: 48px !important;
  padding: 0 !important;
}

.edit-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1) !important;
}

.delete-btn {
  transition: all 0.3s ease;
  color: #ffffff !important;
  font-size: 1.5rem;
  background: transparent !important;
  border-radius: 50% !important;
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
  max-width: 48px !important;
  max-height: 48px !important;
  padding: 0 !important;
}

.delete-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1) !important;
}

.close-btn {
  color: #ffffff !important;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  background: transparent !important;
  border-radius: 50% !important;
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
  max-width: 48px !important;
  max-height: 48px !important;
  padding: 0 !important;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: scale(1.1);
}

.file-btn {
  border-radius: 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0.5px;
  min-width: 120px;
  height: 40px;
  color: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.cv-btn {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
}

.cv-btn:hover {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.cover-btn {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%) !important;
  color: #000000 !important;
}

.cover-btn:hover {
  background: linear-gradient(135deg, #ca8a04 0%, #a16207 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(234, 179, 8, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Full-width progress bar at bottom of header */
.header-full-progress {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: transparent;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
}

.full-width-progress {
  flex-grow: 1;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.25) !important;
}

.full-width-progress :deep(.v-progress-linear__background) {
  background: rgba(255, 255, 255, 0.25) !important;
}

.full-width-progress :deep(.v-progress-linear__determinate) {
  background: rgba(255, 255, 255, 0.5) !important;
  border-radius: 3px;
}

.progress-percentage {
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Content Grid */
.detail-content {
  background: white;
  padding: 20px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 24px;
  padding: 32px;
}

/* Info Cards */
.info-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.card-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.timeline-header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
}

.timeline-header:hover {
  background: rgba(0, 0, 0, 0.02);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.always-visible-sections {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
}

.card-content {
  padding: 20px;
}

/* Contact Card */
.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  transition: all 0.2s ease;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item:hover {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0 -12px;
}

.contact-icon {
  opacity: 0.7;
  min-width: 20px;
}

.contact-text {
  font-weight: 500;
  color: #2c3e50;
}

/* Skills Card */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

/* Notes Card */
.notes-text {
  color: #2c3e50;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

/* Tags Card */
.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-chip {
  font-weight: 600;
  border-radius: 12px;
}

/* Timeline Card */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.timeline-dot.applied {
  background: #667eea;
}

.timeline-dot.uploaded {
  background: #28a745;
}

.timeline-dot.viewed {
  background: #17a2b8;
}

.timeline-content {
  flex-grow: 1;
}

.timeline-title {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.timeline-date {
  color: #6c757d;
  font-size: 0.8rem;
}

/* Files Card */
.file-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-btn {
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.file-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 960px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px;
  }

  .right-column {
    order: -1;
  }
}

@media (max-width: 600px) {
  .dialog-header {
    padding: 24px 20px 70px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .candidate-profile {
    flex-direction: column;
    text-align: center;
    gap: 16px;
    width: 100%;
  }

  .candidate-name {
    font-size: 1.8rem;
  }

  .candidate-meta {
    justify-content: center;
    flex-wrap: wrap;
  }

  .header-right-section {
    align-items: center;
    width: 100%;
  }

  .download-actions {
    gap: 8px;
    justify-content: center;
    width: 100%;
  }

  .header-actions {
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .file-btn {
    min-width: 100px;
    height: 32px;
    font-size: 0.75rem;
  }

  .edit-btn,
  .delete-btn {
    font-size: 0.75rem;
    padding: 6px 12px;
    height: 32px;
  }

  .header-full-progress {
    padding: 16px 20px;
    flex-direction: column;
    gap: 6px;
    align-items: stretch;
  }

  .progress-percentage {
    font-size: 0.75rem;
    text-align: center;
  }

  .content-grid {
    padding: 20px;
  }
}

/* Animation Classes */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-bottom-transition-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.dialog-bottom-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

/* Hover Effects */
.info-card:hover .card-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

/* Focus States */
.action-btn:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Loading States */
.info-card.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .info-card:hover,
  .profile-avatar:hover,
  .skill-chip:hover,
  .file-btn:hover,
  .action-btn:hover {
    transform: none;
    transition: none;
  }

  .dialog-bottom-transition-enter-active,
  .dialog-bottom-transition-leave-active {
    transition: none;
  }
}

/* Custom Scrollbar Styling for the entire component */
.cv-detail-dialog {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.6) rgba(99, 102, 241, 0.1);
}

.cv-detail-dialog::-webkit-scrollbar {
  width: 8px;
}

.cv-detail-dialog::-webkit-scrollbar-track {
  background: rgba(99, 102, 241, 0.1);
  border-radius: 10px;
  margin: 4px;
}

.cv-detail-dialog::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.6);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.cv-detail-dialog::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.8);
  background-clip: content-box;
}

.cv-detail-dialog::-webkit-scrollbar-corner {
  background: transparent;
}

/* Detail Content Scrollbar */
.detail-content {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.6) rgba(99, 102, 241, 0.1);
}

.detail-content::-webkit-scrollbar {
  width: 8px;
}

.detail-content::-webkit-scrollbar-track {
  background: rgba(99, 102, 241, 0.1);
  border-radius: 10px;
  margin: 4px;
}

.detail-content::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.6);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.detail-content::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.8);
  background-clip: content-box;
}

.detail-content::-webkit-scrollbar-corner {
  background: transparent;
}

/* Content Grid Scrollbar */
.content-grid {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.6) rgba(99, 102, 241, 0.1);
}

.content-grid::-webkit-scrollbar {
  width: 8px;
}

.content-grid::-webkit-scrollbar-track {
  background: rgba(99, 102, 241, 0.1);
  border-radius: 10px;
  margin: 4px;
}

.content-grid::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.6);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.content-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.8);
  background-clip: content-box;
}

.content-grid::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
