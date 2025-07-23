<template>
  <AppSidebar :showSidebar="true" sidebarTitle="Views" :sidebarItems="sidebarItems">
    <template #sidebar-extra="{ isCollapsed }">
      <v-list-item v-if="!isCollapsed" class="mt-4">
        <v-btn block color="primary" variant="outlined" @click="dialogVisible = true">
          + New View
        </v-btn>
      </v-list-item>
      <NewViewDialog v-model:visible="dialogVisible" />
    </template>

    <v-container fluid>
      <RecruitmentFilterHeader />

      <v-container fluid>
        <RecruitmentCard v-for="job in jobs" :key="job.id" :job="job" />
      </v-container>
    </v-container>
  </AppSidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import RecruitmentFilterHeader from '@/components/recruitment/RecruitmentFilterHeader.vue'
import RecruitmentCard from '@/components/recruitment/RecruitmentCard.vue'
import NewViewDialog from '@/components/recruitment/NewViewDialog.vue'

const sidebarItems = [
  {
    name: 'activeRecruitments',
    label: 'Recrutements en cours',
    icon: 'mdi-briefcase-outline',
    to: '/recruitment/active',
  },
  { name: 'favorites', label: 'Favoris', icon: 'mdi-star-outline', to: '/recruitment/favorites' },
  {
    name: 'spontaneousApplications',
    label: 'Candidatures spontanées',
    icon: 'mdi-account-multiple',
    to: '/recruitment/spontaneous',
  },
  { name: 'archived', label: 'Archivés', icon: 'mdi-archive-outline', to: '/recruitment/archived' },
]

const dialogVisible = ref(false)

const jobs = ref([
  {
    id: 1,
    title: 'JAVA Engineer',
    location: 'Freelance - Paris',
    date: 'Jul 2, 2025',
    status: 'Online',
    hired: true,
    type: 'Freelance',
  },
  {
    id: 2,
    title: 'Python Engineer',
    location: 'Freelance - Colombo',
    date: 'Jun 29, 2025',
    status: 'Online',
    hired: true,
    type: 'Freelance',
  },
])
</script>
