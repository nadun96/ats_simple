<template>
  <v-list-item
    class="cv-list-item"
    :class="{ 'cv-favorite': cv.isFavorite, 'cv-hover': true }"
    @click="$emit('view', cv)"
  >
    <!-- Enhanced Avatar with glow effect -->
    <template v-slot:prepend>
      <v-avatar
        :color="getAvatarColor(cv.name)"
        size="48"
        class="list-avatar"
      >
        <span class="text-h6 text-white font-weight-bold">
          {{ getInitials(cv.name) }}
        </span>
      </v-avatar>
    </template>

    <!-- Enhanced Main Content -->
    <v-list-item-title class="candidate-name">
      <div class="name-section">
        <span class="name-text">{{ cv.name }}</span>
        <v-chip
          :color="getStatusColor(cv.status)"
          size="x-small"
          variant="tonal"
          class="status-chip"
        >
          <v-icon size="x-small" class="mr-1">{{ getStatusIcon(cv.status) }}</v-icon>
          {{ cv.status }}
        </v-chip>
      </div>
    </v-list-item-title>

    <v-list-item-subtitle class="candidate-meta">
      <div class="meta-grid">
        <div class="meta-item">
          <v-icon size="x-small" color="grey" class="meta-icon">mdi-account-star</v-icon>
          <span class="meta-text">{{ cv.experience }}</span>
        </div>

        <div class="meta-item">
          <v-icon size="x-small" color="grey" class="meta-icon">mdi-target</v-icon>
          <span class="meta-text">{{ cv.matchScore }}% Match</span>
        </div>
      </div>
    </v-list-item-subtitle>

    <!-- Enhanced Skills Section -->
    <div class="skills-section">
      <div class="skills-container">
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

    <!-- Enhanced Contact and Location -->
    <div class="contact-section">
      <div class="contact-grid">
        <div class="contact-item">
          <v-icon size="x-small" color="grey" class="contact-icon">mdi-email</v-icon>
          <span class="contact-text">{{ cv.email }}</span>
        </div>

        <div class="contact-item">
          <v-icon size="x-small" color="grey" class="contact-icon">mdi-phone</v-icon>
          <span class="contact-text">{{ cv.phone }}</span>
        </div>

        <div class="contact-item">
          <v-icon size="x-small" color="grey" class="contact-icon">mdi-map-marker</v-icon>
          <span class="contact-text">{{ cv.location }}</span>
        </div>

        <div class="contact-item">
          <v-icon size="x-small" color="grey" class="contact-icon">mdi-tag</v-icon>
          <span class="contact-text">{{ cv.source }}</span>
        </div>
      </div>
    </div>

    <!-- Enhanced Upload Date -->
    <div class="date-section">
      <span class="date-text">{{ formatDate(cv.uploadDate) }}</span>
    </div>

    <!-- Enhanced Action Buttons -->
    <template v-slot:append>
      <div class="action-buttons">
        <v-btn
          :icon="cv.isFavorite ? 'mdi-star' : 'mdi-star-outline'"
          :color="cv.isFavorite ? 'amber' : 'grey'"
          variant="text"
          size="small"
          class="favorite-btn"
          @click.stop="$emit('favorite', cv.id)"
        />

        <v-btn
          icon="mdi-download"
          variant="text"
          size="small"
          color="primary"
          class="download-btn"
          @click.stop="$emit('download', cv)"
        />

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              variant="text"
              size="small"
              color="grey"
              v-bind="props"
              @click.stop
              class="more-btn"
            />
          </template>

          <v-list density="compact" class="actions-menu">
            <v-list-item
              prepend-icon="mdi-eye"
              @click="$emit('view', cv)"
              class="action-item"
            >
              <v-list-item-title class="text-body-2">View Details</v-list-item-title>
            </v-list-item>

            <v-list-item
              prepend-icon="mdi-pencil"
              @click="editCV"
              class="action-item"
            >
              <v-list-item-title class="text-body-2">Edit CV</v-list-item-title>
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
      </div>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import type { CV } from '@/stores/cvLibrary'

interface Props {
  cv: CV
  index?: number
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
  console.log('Edit CV:', props.cv?.id)
}
</script>

<style scoped>
.cv-list-item {
  border-radius: 16px;
  margin: 8px 0;
  padding: 20px;
  background: white;
  border: 1px solid #e0e0e0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.cv-list-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.cv-list-item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.cv-list-item:hover::before {
  transform: scaleX(1);
}

.cv-list-item.cv-favorite {
  border-color: #ffc107;
  background: linear-gradient(135deg, #fffbf0 0%, #fff8e1 100%);
}

.cv-list-item.cv-favorite::before {
  background: linear-gradient(90deg, #ffc107, #ff9800);
}

/* Avatar Styles */
.list-avatar {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cv-list-item:hover .list-avatar {
  transform: scale(1.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border-color: #667eea;
}

/* Name Section */
.candidate-name {
  margin-bottom: 8px;
}

.name-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.name-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  transition: color 0.3s ease;
}

.cv-list-item:hover .name-text {
  color: #667eea;
}

.status-chip {
  font-weight: 600;
  border-radius: 20px;
  font-size: 0.75rem;
}

/* Meta Section */
.candidate-meta {
  margin-bottom: 12px;
}

.meta-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  opacity: 0.7;
}

.meta-text {
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: 500;
}

/* Skills Section */
.skills-section {
  margin-bottom: 12px;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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

/* Contact Section */
.contact-section {
  margin-bottom: 12px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.contact-item:hover {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 6px;
  padding: 4px 8px;
  margin: -4px -8px;
}

.contact-icon {
  opacity: 0.7;
  min-width: 16px;
}

.contact-text {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Date Section */
.date-section {
  margin-bottom: 12px;
}

.date-text {
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 500;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 4px;
  align-items: center;
}

.favorite-btn {
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.download-btn {
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: scale(1.1);
  background: rgba(102, 126, 234, 0.1);
}

.more-btn {
  transition: all 0.3s ease;
}

.more-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

/* Actions Menu */
.actions-menu {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  min-width: 180px;
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
@media (max-width: 960px) {
  .cv-list-item {
    padding: 16px;
  }

  .meta-grid {
    gap: 12px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .cv-list-item {
    padding: 12px;
    margin: 4px 0;
  }

  .name-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .meta-grid {
    flex-direction: column;
    gap: 8px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 2px;
  }
}

/* Animation Classes */
.cv-list-item {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Hover Effects */
.cv-list-item:hover .skill-chip {
  transform: translateY(-2px);
}

.cv-list-item:hover .contact-item {
  transform: translateX(4px);
}

/* Focus States */
.cv-list-item:focus-within {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Loading States */
.cv-list-item.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .cv-list-item,
  .cv-list-item:hover,
  .list-avatar,
  .skill-chip,
  .contact-item {
    transition: none;
    transform: none;
    animation: none;
  }
}

/* Custom Scrollbar for list container */
.v-list::-webkit-scrollbar {
  width: 6px;
}

.v-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.v-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.v-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Enhanced spacing for better readability */
.v-list-item-title {
  margin-bottom: 8px;
}

.v-list-item-subtitle {
  margin-bottom: 12px;
}

/* Compact view optimizations */
.cv-list-item {
  min-height: auto;
  align-items: flex-start;
}

/* Enhanced visual hierarchy */
.candidate-name {
  order: 1;
}

.candidate-meta {
  order: 2;
}

.skills-section {
  order: 3;
}

.contact-section {
  order: 4;
}

.date-section {
  order: 5;
}

.action-buttons {
  order: 6;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}

/* Enhanced focus indicators */
.cv-list-item:focus-within {
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

/* Better contrast for accessibility */
.cv-list-item {
  color: #2c3e50;
}

.cv-list-item:hover {
  color: #1a202c;
}

/* Enhanced status chip visibility */
.status-chip {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Improved button accessibility */
.action-buttons .v-btn {
  min-width: 36px;
  height: 36px;
}

/* Enhanced hover states for better UX */
.cv-list-item:hover .action-buttons .v-btn {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
}
</style>
