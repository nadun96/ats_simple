<template>
  <div class="notifications-container">
    <div class="notifications-header d-flex align-center justify-space-between mb-6">
      <div>
        <h3 class="text-h5 font-weight-bold mb-2">Notifications</h3>
        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage your notification preferences and view recent alerts
        </p>
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        prepend-icon="mdi-cog"
        @click="openSettings"
      >
        Settings
      </v-btn>
    </div>

    <!-- Notification Filters -->
    <v-card class="mb-6" elevation="1">
      <v-card-text class="pa-4">
        <div class="d-flex align-center flex-wrap gap-3">
          <v-chip
            v-for="filter in notificationFilters"
            :key="filter.value"
            :color="activeFilter === filter.value ? 'primary' : 'default'"
            :variant="activeFilter === filter.value ? 'elevated' : 'outlined'"
            @click="setFilter(filter.value)"
            class="cursor-pointer"
          >
            {{ filter.label }}
            <v-badge
              v-if="filter.count > 0"
              :content="filter.count"
              :color="activeFilter === filter.value ? 'white' : 'primary'"
              class="ml-2"
            />
          </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <!-- Notifications List -->
    <v-card elevation="1">
      <v-card-text class="pa-0">
        <v-list class="notifications-list">
          <v-list-item
            v-for="notification in filteredNotifications"
            :key="notification.id"
            :class="[
              'notification-item',
              'pa-4',
              { 'unread': !notification.read }
            ]"
          >
            <template #prepend>
              <v-avatar
                :color="getNotificationColor(notification.type)"
                size="40"
                class="mr-3"
              >
                <v-icon :icon="getNotificationIcon(notification.type)" color="white" />
              </v-avatar>
            </template>

            <v-list-item-title class="text-body-1 font-weight-medium mb-1">
              {{ notification.title }}
            </v-list-item-title>

            <v-list-item-subtitle class="text-body-2 text-medium-emphasis mb-2">
              {{ notification.message }}
            </v-list-item-subtitle>

            <div class="d-flex align-center justify-space-between">
              <span class="text-caption text-medium-emphasis">
                {{ formatTime(notification.timestamp) }}
              </span>

              <div class="d-flex gap-2">
                <v-btn
                  v-if="!notification.read"
                  size="small"
                  variant="text"
                  color="primary"
                  @click="markAsRead(notification.id)"
                >
                  Mark as read
                </v-btn>
                <v-btn
                  size="small"
                  variant="text"
                  color="error"
                  @click="deleteNotification(notification.id)"
                >
                  Delete
                </v-btn>
              </div>
            </div>
          </v-list-item>

          <v-list-item v-if="filteredNotifications.length === 0" class="pa-8 text-center">
            <v-list-item-title class="text-body-1 text-medium-emphasis">
              No notifications found
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Load More Button -->
    <div v-if="hasMoreNotifications" class="text-center mt-6">
      <v-btn
        variant="outlined"
        color="primary"
        @click="loadMoreNotifications"
        :loading="loading"
      >
        Load More Notifications
      </v-btn>
    </div>

    <!-- Settings Dialog -->
    <v-dialog v-model="settingsDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h6 pa-4">
          Notification Settings
        </v-card-title>
        <v-card-text class="pa-4">
          <v-list>
            <v-list-item v-for="setting in notificationSettings" :key="setting.key">
              <template #prepend>
                <v-icon :icon="setting.icon" color="primary" class="mr-3" />
              </template>
              <v-list-item-title>{{ setting.title }}</v-list-item-title>
              <template #append>
                <v-switch
                  v-model="setting.enabled"
                  color="primary"
                  @change="updateSetting(setting.key, setting.enabled)"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="primary"
            @click="settingsDialog = false"
          >
            Save Settings
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

interface NotificationSetting {
  key: string
  title: string
  icon: string
  enabled: boolean
}

// Reactive data
const activeFilter = ref('all')
const settingsDialog = ref(false)
const loading = ref(false)
const hasMoreNotifications = ref(true)

// Notification filters
const notificationFilters = ref([
  { label: 'All', value: 'all', count: 0 },
  { label: 'Unread', value: 'unread', count: 0 },
  { label: 'Info', value: 'info', count: 0 },
  { label: 'Success', value: 'success', count: 0 },
  { label: 'Warning', value: 'warning', count: 0 },
  { label: 'Error', value: 'error', count: 0 },
])

// Sample notifications data
const notifications = ref<Notification[]>([
  {
    id: '1',
    title: 'New Candidate Application',
    message: 'John Doe has applied for the Senior Developer position',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: '2',
    title: 'Interview Scheduled',
    message: 'Your interview with Sarah Smith has been scheduled for tomorrow at 2:00 PM',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: '3',
    title: 'Job Posting Expired',
    message: 'The Frontend Developer position has expired and needs to be renewed',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
  },
  {
    id: '5',
    title: 'Profile Update Required',
    message: 'Please update your profile information to maintain account security',
    type: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: false,
  },
])

// Notification settings
const notificationSettings = ref<NotificationSetting[]>([
  { key: 'email', title: 'Email Notifications', icon: 'mdi-email', enabled: true },
  { key: 'push', title: 'Push Notifications', icon: 'mdi-bell', enabled: true },
  { key: 'sms', title: 'SMS Notifications', icon: 'mdi-message-text', enabled: false },
  { key: 'in_app', title: 'In-App Notifications', icon: 'mdi-application', enabled: true },
])

// Computed properties
const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') {
    return notifications.value
  } else if (activeFilter.value === 'unread') {
    return notifications.value.filter(n => !n.read)
  } else {
    return notifications.value.filter(n => n.type === activeFilter.value)
  }
})

// Methods
const setFilter = (filter: string) => {
  activeFilter.value = filter
  updateFilterCounts()
}

const updateFilterCounts = () => {
  notificationFilters.value.forEach(filter => {
    if (filter.value === 'all') {
      filter.count = notifications.value.length
    } else if (filter.value === 'unread') {
      filter.count = notifications.value.filter(n => !n.read).length
    } else {
      filter.count = notifications.value.filter(n => n.type === filter.value).length
    }
  })
}

const getNotificationColor = (type: string) => {
  const colors = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
  }
  return colors[type as keyof typeof colors] || 'info'
}

const getNotificationIcon = (type: string) => {
  const icons = {
    info: 'mdi-information',
    success: 'mdi-check-circle',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle',
  }
  return icons[type as keyof typeof icons] || 'mdi-information'
}

const formatTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }
}

const markAsRead = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
    updateFilterCounts()
  }
}

const deleteNotification = (id: string) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
    updateFilterCounts()
  }
}

const openSettings = () => {
  settingsDialog.value = true
}

const updateSetting = (key: string, enabled: boolean) => {
  const setting = notificationSettings.value.find(s => s.key === key)
  if (setting) {
    setting.enabled = enabled
    // Here you would typically save to backend
    console.log(`Updated ${key} setting to ${enabled}`)
  }
}

const loadMoreNotifications = async () => {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Add more sample notifications
  const newNotifications: Notification[] = [
    {
      id: (notifications.value.length + 1).toString(),
      title: 'New Message',
      message: 'You have a new message from the recruitment team',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      read: true,
    },
    {
      id: (notifications.value.length + 2).toString(),
      title: 'Task Completed',
      message: 'Your task "Review Applications" has been completed',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      read: true,
    },
  ]

  notifications.value.push(...newNotifications)
  hasMoreNotifications.value = notifications.value.length < 20 // Limit to 20 notifications
  loading.value = false
  updateFilterCounts()
}

// Lifecycle
onMounted(() => {
  updateFilterCounts()
})
</script>

<style scoped>
.notifications-container {
  max-width: 100%;
}

.notifications-header h3 {
  color: var(--v-primary-base);
}

.notification-item {
  border-bottom: 1px solid var(--v-border-light);
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: var(--v-surface-variant);
}

.notification-item.unread {
  background-color: var(--v-primary-lighten5);
  border-left: 4px solid var(--v-primary-base);
}

.notification-item.unread .v-list-item-title {
  color: var(--v-primary-darken1);
}

.notifications-list .v-list-item:last-child {
  border-bottom: none;
}

.cursor-pointer {
  cursor: pointer;
}

.gap-3 {
  gap: 12px;
}

.gap-2 {
  gap: 8px;
}
</style>
