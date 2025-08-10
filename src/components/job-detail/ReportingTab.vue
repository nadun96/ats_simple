<!-- File: src/components/job-detail/ReportingTab.vue -->
<template>
  <v-card class="ma-4 pa-4 text-center">
    <v-icon size="48" color="primary">mdi-chart-box-outline</v-icon>
    <h3 class="mt-2 text-h6">Reporting Coming Soon</h3>
    <p class="text-body-2">This section will include analytics about job performance.</p>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Job } from '@/services/jobService'

interface Props {
  jobData?: Job
}

const props = defineProps<Props>()

interface Metric {
  label: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
}

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
  }[]
}

// Generate dynamic metrics based on job data
const metrics = computed(() => {
  if (!props.jobData) return []

  return [
    {
      label: 'Total Applications',
      value: props.jobData.applications,
      change: '+12%',
      trend: 'up' as const
    },
    {
      label: 'Active Candidates',
      value: props.jobData.applicationsList?.filter(app => app.status !== 'Rejected').length || 0,
      change: '+8%',
      trend: 'up' as const
    },
    {
      label: 'Days Active',
      value: Math.floor((Date.now() - new Date(props.jobData.createdDate).getTime()) / (1000 * 60 * 60 * 24)),
      change: '0%',
      trend: 'neutral' as const
    },
    {
      label: 'Conversion Rate',
      value: '15.2%',
      change: '+2.1%',
      trend: 'up' as const
    }
  ]
})

// Generate dynamic chart data based on applications
const chartData = computed(() => {
  if (!props.jobData?.applicationsList) {
    return {
      labels: ['New', 'CV Selected', 'Phone Evaluated', 'Interview Passed', 'Offer Made', 'Hired'],
      datasets: [{
        label: 'Applications by Stage',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)'
      }]
    }
  }

  const stageCounts = {
    'New': 0,
    'CV Selected': 0,
    'Phone Evaluated': 0,
    'Interview Passed': 0,
    'Offer Made': 0,
    'Hired': 0
  }

  props.jobData.applicationsList.forEach(app => {
    if (stageCounts.hasOwnProperty(app.status)) {
      stageCounts[app.status as keyof typeof stageCounts]++
    }
  })

  return {
    labels: Object.keys(stageCounts),
    datasets: [{
      label: 'Applications by Stage',
      data: Object.values(stageCounts),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)'
    }]
  }
})
</script>
