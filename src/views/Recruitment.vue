<template>
  <v-container fluid class="pa-0 d-flex">
    <!-- Sidebar -->
    <RecruitmentSidebar v-model:collapsed="sidebarCollapsed" class="sidebar" />

    <!-- Main Content -->
    <v-main class="recruitment-main">
      <RecruitmentFilterHeader />

      <v-container fluid>
        <RecruitmentCard
          v-for="job in jobs"
          :key="job.id"
          :job="job"
        />
      </v-container>
    </v-main>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RecruitmentSidebar from '@/components/recruitment/RecruitmentSidebar.vue'
import RecruitmentFilterHeader from '@/components/recruitment/RecruitmentFilterHeader.vue'
import RecruitmentCard from '@/components/recruitment/RecruitmentCard.vue'

const sidebarCollapsed = ref(false)

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
  // Add more...
])
</script>

<style scoped>
.sidebar {
  width: 260px;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 64px;
}

.recruitment-main {
  flex: 1;
  padding: 16px;
  background: #f9fbfc;
}
</style>
