<template>
  <AppSidebar :showSidebar="true" sidebarTitle="Profile" :sidebarItems="sidebarItems">
    <v-container fluid class="pa-4 pa-md-6">
      <div class="profile-header d-flex align-center mb-4">
        <v-icon size="28" class="mr-2" color="primary">mdi-account-circle</v-icon>
        <h2 class="mb-0">Profile</h2>
      </div>

      <v-tabs
        v-model="tab"
        color="primary"
        class="mb-6 profile-tabs rounded-lg small-tabs"
        bg-color="white"
        elevation="2"
        density="compact"
      >
        <v-tab v-for="item in tabs" :key="item.name" :to="{ name: item.name }" class="text-none">
          {{ item.label }}
        </v-tab>
      </v-tabs>

      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </AppSidebar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const route = useRoute()

const tabs = [
  { name: 'information', label: 'My Information' },
  { name: 'signature', label: 'My Signature' },
  { name: 'security', label: 'Security' },
]

const sidebarItems = [
  { name: 'information', label: 'Profile', icon: 'mdi-account', to: '/profile/information' },
  { name: 'notifications', label: 'Notifications', icon: 'mdi-bell', to: '/notifications' },
  { name: 'calendar', label: 'Calendar', icon: 'mdi-calendar', to: '/calendar' },
]

const tab = ref(route.name)

watch(
  () => route.name,
  (newVal) => {
    tab.value = newVal
  },
)
</script>

<style scoped>
.profile-header {
  font-weight: 600;
  font-size: 1.5rem;
}

.profile-tabs {
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.small-tabs .v-tab {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  transition: color 0.3s ease;
  padding: 0 12px !important;
  min-height: 32px !important;
  font-size: 0.85rem;
  line-height: 32px !important;
  min-width: 100px;
  max-width: 150px;
  white-space: nowrap;
  flex: 0 0 auto;
}

.v-tab--active {
  background-color: var(--vt-c-primary);
  color: white !important;
  border-radius: 6px;
}
</style>
