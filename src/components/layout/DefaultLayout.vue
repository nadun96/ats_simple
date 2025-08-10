<template>
  <v-app>
    <AppHeader @toggle-drawer="drawer = !drawer" />
    <MobileDrawer v-model="drawer" />

    <v-main>
      <div class="layout-container">
        <!-- Dynamic Sidebar -->
        <aside :class="['sidebar', { 'sidebar-collapsed': isSidebarCollapsed }]">
          <div class="sidebar-header d-flex align-center justify-space-between pa-4">
            <h3 v-if="!isSidebarCollapsed" class="text-h6 font-weight-bold">{{ currentSidebarTitle }}</h3>
            <v-btn
              icon
              size="small"
              variant="text"
              @click="toggleSidebar"
              class="sidebar-toggle-btn"
            >
              <v-icon>{{ isSidebarCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
            </v-btn>
          </div>

          <v-list dense nav class="sidebar-nav">
            <template v-for="item in currentSidebarItems" :key="item.title || item.type">
              <!-- Divider -->
              <v-divider v-if="item.type === 'divider'" class="my-3" />

              <!-- Section Header -->
              <v-list-item v-else-if="item.type === 'section-header'" class="sidebar-section-header">
                <template #prepend>
                  <v-icon color="primary" class="mr-2">mdi-view-dashboard</v-icon>
                </template>
                <v-list-item-title v-if="!isSidebarCollapsed" class="text-caption font-weight-bold text-primary text-uppercase">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>

              <!-- Regular Navigation Item -->
              <v-list-item
                v-else-if="!item.isButton && item.to"
                :to="item.to"
                :class="[
                  'sidebar-nav-item',
                  'rounded-lg',
                  'mb-2',
                  { 'sidebar-nav-item-active': $route.path === item.to || $route.path.startsWith(item.to) }
                ]"
              >
                <template #prepend>
                  <v-icon :color="$route.path === item.to || $route.path.startsWith(item.to) ? 'primary' : 'grey'" class="mr-2">
                    {{ item.icon }}
                  </v-icon>
                </template>
                <v-list-item-title v-if="!isSidebarCollapsed" class="text-body-2 font-weight-medium">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>

              <!-- Button Item -->
              <v-list-item
                v-else-if="item.isButton && item.title"
                :class="[
                  'sidebar-button-item',
                  'rounded-lg',
                  'mb-2'
                ]"
                @click="handleNewView"
              >
                <template #prepend>
                  <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title v-if="!isSidebarCollapsed" class="text-body-2 font-weight-semibold text-primary">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </aside>

        <!-- Main Content -->
        <main :class="['main-content', { 'main-content-expanded': isSidebarCollapsed }]">
          <v-container class="page-container">
            <router-view />
          </v-container>
        </main>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import MobileDrawer from '@/components/header/MobileDrawer.vue'

interface SidebarItem {
  title?: string
  icon?: string
  to?: string
  type?: 'divider' | 'section-header'
  isButton?: boolean
}

const route = useRoute()
const drawer = ref(false)
const isSidebarCollapsed = ref(false)

// Default sidebar items for main pages
const defaultSidebarItems: SidebarItem[] = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Recruitment', icon: 'mdi-briefcase-outline', to: '/recruitment' },
  { title: 'Candidates', icon: 'mdi-account-group', to: '/candidates' },
  { title: 'Analysis', icon: 'mdi-chart-line', to: '/analysis' },
]

// Profile-specific sidebar items
const profileSidebarItems: SidebarItem[] = [
  { title: 'Profile', icon: 'mdi-account', to: '/profile/information' },
  { title: 'Notifications', icon: 'mdi-bell', to: '/profile/notifications' },
  { title: 'Calendar', icon: 'mdi-calendar', to: '/profile/calendar' },
]

// Recruitment-specific sidebar items
const recruitmentSidebarItems: SidebarItem[] = [
  { title: 'My Recruitments', icon: 'mdi-briefcase', to: '/recruitment' },
  { title: 'Create Job', icon: 'mdi-plus-circle', to: '/job' },
  { title: 'Job Templates', icon: 'mdi-file-document-multiple', to: '/job-templates' },
  { type: 'divider' },
  { type: 'section-header', title: 'Views' },
  { title: 'Recrutements en cours', icon: 'mdi-briefcase-outline', to: '/recruitment/active' },
  { title: 'Favoris', icon: 'mdi-star-outline', to: '/recruitment/favorites' },
  { title: 'Spontaneous Applications', icon: 'mdi-account-multiple-outline', to: '/recruitment/spontaneous' },
  { title: 'Archived', icon: 'mdi-archive-outline', to: '/recruitment/archived' },
  { type: 'divider' },
  { title: 'NEW VIEW', icon: 'mdi-plus', to: '/recruitment/new-view', isButton: true },
]

// Candidates-specific sidebar items
const candidatesSidebarItems: SidebarItem[] = [
  { title: 'All Candidates', icon: 'mdi-account-group', to: '/candidates' },
  { title: 'Add Candidate', icon: 'mdi-account-plus', to: '/candidates/create' },
  { title: 'CV Library', icon: 'mdi-file-document', to: '/cv-library' },
]

// Dynamic sidebar content based on current route
const currentSidebarItems = computed((): SidebarItem[] => {
  if (route.path.startsWith('/profile')) {
    return profileSidebarItems
  } else if (route.path.startsWith('/recruitment')) {
    return recruitmentSidebarItems
  } else if (route.path.startsWith('/candidates')) {
    return candidatesSidebarItems
  } else if (route.path.startsWith('/analysis')) {
    return [
      { title: 'Overview', icon: 'mdi-chart-line', to: '/analysis' },
      { title: 'Reports', icon: 'mdi-file-chart', to: '/analysis/reports' },
      { title: 'Metrics', icon: 'mdi-chart-box', to: '/analysis/metrics' },
    ]
  } else {
    return defaultSidebarItems
  }
})

// Dynamic sidebar title based on current route
const currentSidebarTitle = computed(() => {
  if (route.path.startsWith('/profile')) {
    return 'Profile'
  } else if (route.path.startsWith('/recruitment')) {
    return 'Recruitment'
  } else if (route.path.startsWith('/candidates')) {
    return 'Candidates'
  } else if (route.path.startsWith('/analysis')) {
    return 'Analysis'
  } else {
    return 'Navigation'
  }
})

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const handleNewView = () => {
  // This function is for the button item that triggers a new view.
  // In a real application, you would navigate to a new view route.
  // For now, we'll just log a message.
  console.log('New View clicked!')
  // Example: router.push('/recruitment/new-view')
}
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100%;
}

.sidebar {
  width: 280px;
  background-color: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-collapsed {
  width: 64px;
}

.sidebar-header {
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
}

.sidebar-toggle-btn {
  color: #666;
}

.sidebar-nav {
  padding: 16px;
}

.sidebar-nav-item {
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.sidebar-nav-item:hover {
  background-color: rgba(25, 118, 210, 0.08);
  transform: translateX(4px);
}

.sidebar-nav-item-active {
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
}

.sidebar-section-header {
  margin-top: 16px;
  margin-bottom: 8px;
}

.sidebar-button-item {
  background-color: rgba(25, 118, 210, 0.08);
  transition: all 0.2s ease;
  cursor: pointer;
}

.sidebar-button-item:hover {
  background-color: rgba(25, 118, 210, 0.12);
  transform: translateX(4px);
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
}

.main-content-expanded {
  margin-left: 0;
}

.page-container {
  max-width: 1200px;
  padding: 24px;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 64px;
    height: calc(100vh - 64px);
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.show {
    transform: translateX(0);
  }
}
</style>
