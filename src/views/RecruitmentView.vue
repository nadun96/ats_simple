<template>
  <v-container fluid>
    <RecruitmentFilterHeader />

    <v-container fluid>
      <RecruitmentCard v-for="job in jobs" :key="job.id" :job="job" />
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RecruitmentFilterHeader from '@/components/recruitment/RecruitmentFilterHeader.vue'
import RecruitmentCard from '@/components/recruitment/RecruitmentCard.vue'
import NewViewDialog from '@/components/recruitment/NewViewDialog.vue'
import { jobService, type Job } from '@/services/jobService'

const dialogVisible = ref(false)
const jobs = ref<Job[]>([])

onMounted(() => {
  jobs.value = jobService.getAllJobs()
})
</script>
