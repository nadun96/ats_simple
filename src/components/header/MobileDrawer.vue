<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    width="280"
    class="d-flex d-md-none"
  >
    <v-list>
      <v-list-item class="px-4 py-3">
        <v-list-item-title class="text-h6 font-weight-bold text-primary">
          {{ currentSidebarTitle }}
        </v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item class="px-4 py-2">
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn
              color="success"
              variant="elevated"
              prepend-icon="mdi-plus"
              append-icon="mdi-chevron-down"
              block
              class="text-none"
              v-bind="props"
            >
              Create New
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="item in createItems" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-divider class="my-2" />

      <!-- Dynamic Navigation Items based on current route -->
      <v-list-item
        v-for="item in currentSidebarItems"
        :key="item.title"
        :to="item.to"
        link
        class="mb-1"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-group v-for="group in navGroups" :key="group.title" :value="group.title">
        <template #activator="{ props }">
          <v-list-item v-bind="props" class="my-1">
            <v-list-item-icon>
              <v-icon>{{ group.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ group.title }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item
          v-for="subItem in group.items"
          :key="subItem"
          link
          class="pl-12"
          @click="handleNavItemClick(group.title, subItem)"
        >
          <v-list-item-title>{{ subItem }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createItems, navGroups } from '@/data/navItems'

const router = useRouter()
const route = useRoute()

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': (value: boolean) => void
}>()

const drawer = computed({
  get: () => props.modelValue,
  // TODO: Please fix this. 👇 @MihindumSLiyanage
  // @ts-expect-error - computed setter type issue
  set: (val: boolean) => emit('update:modelValue', val),
})

// Default sidebar items for main pages
const defaultSidebarItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Recruitment', icon: 'mdi-briefcase-outline', to: '/recruitment' },
  { title: 'Candidates', icon: 'mdi-account-group', to: '/candidates' },
  { title: 'Analysis', icon: 'mdi-chart-line', to: '/analysis' },
]

// Profile-specific sidebar items
const profileSidebarItems = [
  { title: 'Profile', icon: 'mdi-account', to: '/profile/information' },
  { title: 'Notifications', icon: 'mdi-bell', to: '/profile/notifications' },
  { title: 'Calendar', icon: 'mdi-calendar', to: '/profile/calendar' },
]

// Recruitment-specific sidebar items
const recruitmentSidebarItems = [
  { title: 'My Recruitments', icon: 'mdi-briefcase', to: '/recruitment' },
  { title: 'Create Job', icon: 'mdi-plus-circle', to: '/job' },
  { title: 'Job Templates', icon: 'mdi-file-document-multiple', to: '/job-templates' },
]

// Candidates-specific sidebar items
const candidatesSidebarItems = [
  { title: 'All Candidates', icon: 'mdi-account-group', to: '/candidates' },
  { title: 'Add Candidate', icon: 'mdi-account-plus', to: '/candidates/create' },
  { title: 'CV Library', icon: 'mdi-file-document', to: '/cv-library' },
]

// Dynamic sidebar content based on current route
const currentSidebarItems = computed(() => {
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
    return 'Simple ATS'
  }
})

const handleNavItemClick = (groupTitle: string, itemTitle: string) => {
  if (groupTitle === 'CV Library' && itemTitle === 'All Profiles') {
    router.push('/candidates')
  } else if (groupTitle === 'Recruitments') {
    // Handle recruitment navigation
    switch (itemTitle) {
      case 'My Recruitments':
        router.push('/recruitment')
        break
      case 'My Applications':
        // TODO: Add route for applications
        console.log('Navigate to applications')
        break
      case 'My Recruitment Requests':
        // TODO: Add route for recruitment requests
        console.log('Navigate to recruitment requests')
        break
    }
  }
}
</script>
