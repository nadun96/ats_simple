<template>
  <div class="profile-container">
    <div class="profile-header d-flex align-center mb-4">
      <v-icon size="28" class="mr-2" color="primary">mdi-account-circle</v-icon>
      <h2 class="mb-0">Profile</h2>
    </div>

    <v-tabs
      v-model="activeTab"
      color="primary"
      class="mb-6 profile-tabs rounded-lg small-tabs"
      bg-color="white"
      elevation="2"
      density="compact"
    >
      <v-tab
        v-for="item in tabs"
        :key="item.name"
        :value="item.name"
        @click="navigateToTab(item.name)"
        class="text-none"
      >
        {{ item.label }}
      </v-tab>
    </v-tabs>

    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <router-view />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

console.log('ProfileView script setup executed')

onBeforeMount(() => {
  console.log('ProfileView onBeforeMount')
})

onMounted(() => {
  console.log('ProfileView onMounted, route path:', route.path)
  console.log('ProfileView onMounted, route name:', route.name)
  console.log('ProfileView onMounted, route params:', route.params)
  console.log('ProfileView onMounted, route query:', route.query)

  // Set active tab based on current route
  const currentPath = route.path
  if (currentPath.includes('/profile/')) {
    const tabName = currentPath.split('/profile/')[1]
    if (tabName && tabs.some(tab => tab.name === tabName)) {
      activeTab.value = tabName
      console.log('Active tab set to:', tabName)
    }
  }
})

const tabs = [
  { name: 'information', label: 'My Information' },
  { name: 'signature', label: 'My Signature' },
  { name: 'security', label: 'Security' },
  { name: 'notifications', label: 'Notifications' },
  { name: 'calendar', label: 'Calendar' },
]

const activeTab = ref('information')

const navigateToTab = (tabName: string) => {
  console.log('Navigating to tab:', tabName)
  const targetPath = `/profile/${tabName}`
  console.log('Target path:', targetPath)
  router.push(targetPath).then(() => {
    console.log('Tab navigation successful')
  }).catch((error) => {
    console.error('Tab navigation failed:', error)
  })
}

watch(
  () => route.path,
  (newPath) => {
    console.log('Route path changed to:', newPath)
    if (newPath.includes('/profile/')) {
      const tabName = newPath.split('/profile/')[1]
      if (tabName && tabs.some(tab => tab.name === tabName)) {
        activeTab.value = tabName
        console.log('Active tab updated to:', tabName)
      }
    }
  },
)

watch(
  () => route.name,
  (newName) => {
    console.log('Route name changed to:', newName)
  },
)
</script>

<style scoped>
.profile-container {
  padding: 24px;
}

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
