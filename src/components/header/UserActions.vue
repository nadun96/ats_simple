<template>
  <div class="user-actions">
    <!-- Search Button -->
    <v-btn
      icon
      variant="text"
      class="action-btn search-btn"
      size="small"
    >
      <v-icon size="20">mdi-magnify</v-icon>
    </v-btn>

    <!-- Messages Button -->
    <v-btn
      icon
      variant="text"
      class="action-btn messages-btn"
      size="small"
    >
      <v-icon size="20">mdi-email-outline</v-icon>
    </v-btn>

    <!-- Notifications Button -->
    <v-btn
      icon
      variant="text"
      class="action-btn notifications-btn"
      size="small"
    >
      <v-badge
        color="error"
        content="3"
        overlap
        class="notification-badge"
      >
        <v-icon size="20">mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

    <!-- User Profile Menu -->
    <v-menu v-model="profileMenuOpen" offset-y>
      <template #activator="{ props }">
        <v-btn
          icon
          variant="text"
          v-bind="props"
          class="action-btn profile-btn"
          size="small"
        >
          <v-icon size="24">mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list class="profile-dropdown">
        <v-list-item
          @click="navigateToProfile"
          class="profile-dropdown-item"
        >
          <template #prepend>
            <v-icon size="18" color="primary" class="mr-3">mdi-account</v-icon>
          </template>
          <v-list-item-title class="text-body-2 font-weight-medium">
            Profile
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="item in profileOptions"
          :key="item"
          @click="handleProfileAction(item)"
          class="profile-dropdown-item"
        >
          <template #prepend>
            <v-icon size="18" color="grey" class="mr-3">mdi-logout</v-icon>
          </template>
          <v-list-item-title class="text-body-2 font-weight-medium">
            {{ item }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profileMenuOpen = ref(false)
const profileOptions = ['Logout']

const navigateToProfile = () => {
  console.log('Navigating to profile...')
  profileMenuOpen.value = false
  console.log('Current route before navigation:', router.currentRoute.value.path)
  router.push('/profile/information').then(() => {
    console.log('Navigation successful, new route:', router.currentRoute.value.path)
  }).catch((error) => {
    console.error('Navigation failed:', error)
  })
}

const handleProfileAction = (action: string) => {
  profileMenuOpen.value = false
  if (action === 'Logout') {
    // Handle logout logic here
    console.log('Logout clicked')
  }
}
</script>

<style scoped>
.user-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  min-width: 40px;
  height: 40px;
}

.action-btn:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.action-btn:active {
  transform: scale(0.95);
}

.search-btn:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.messages-btn:hover {
  background-color: rgba(34, 197, 94, 0.1);
}

.notifications-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.profile-btn:hover {
  background-color: rgba(25, 118, 210, 0.1);
}

.notification-badge {
  --v-badge-height: 18px;
  --v-badge-min-width: 18px;
}

.profile-dropdown {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px;
  min-width: 180px;
}

.profile-dropdown-item {
  border-radius: 8px;
  margin: 2px 0;
  transition: all 0.2s ease;
  padding: 12px 16px;
}

.profile-dropdown-item:hover {
  background-color: rgba(25, 118, 210, 0.08);
  transform: translateX(4px);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .action-btn {
    min-width: 36px;
    height: 36px;
  }

  .user-actions {
    gap: 2px;
  }
}
</style>
