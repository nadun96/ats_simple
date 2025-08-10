<template>
  <div class="analysis-view">
    <v-container fluid>
      <!-- Page Header -->
      <v-row class="mb-6">
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h1 class="text-h3 font-weight-bold primary--text mb-2">Analytics Dashboard</h1>
              <p class="text-subtitle-1 text-medium-emphasis">Track your recruitment performance and insights</p>
            </div>
            <v-btn color="primary" prepend-icon="mdi-calendar-range">
              Last 30 Days
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Key Metrics Cards -->
      <v-row class="mb-6">
        <v-col cols="12" sm="6" md="3">
          <v-card class="metric-card" elevation="2">
            <v-card-text class="text-center pa-4">
              <v-icon size="48" color="primary" class="mb-3">mdi-account-multiple</v-icon>
              <div class="text-h4 font-weight-bold primary--text">{{ metrics.totalCandidates }}</div>
              <div class="text-subtitle-2 text-medium-emphasis">Total Candidates</div>
              <div class="text-caption success--text mt-2">
                <v-icon size="16" color="success">mdi-trending-up</v-icon>
                +12% from last month
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card class="metric-card" elevation="2">
            <v-card-text class="text-center pa-4">
              <v-icon size="48" color="success" class="mb-3">mdi-briefcase</v-icon>
              <div class="text-h4 font-weight-bold success--text">{{ metrics.activeJobs }}</div>
              <div class="text-subtitle-2 text-medium-emphasis">Active Jobs</div>
              <div class="text-caption success--text mt-2">
                <v-icon size="16" color="success">mdi-trending-up</v-icon>
                +8% from last month
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card class="metric-card" elevation="2">
            <v-card-text class="text-center pa-4">
              <v-icon size="48" color="warning" class="mb-3">mdi-clock-outline</v-icon>
              <div class="text-h4 font-weight-bold warning--text">{{ metrics.avgTimeToHire }}</div>
              <div class="text-subtitle-2 text-medium-emphasis">Avg. Time to Hire</div>
              <div class="text-caption error--text mt-2">
                <v-icon size="16" color="error">mdi-trending-down</v-icon>
                -5% from last month
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card class="metric-card" elevation="2">
            <v-card-text class="text-center pa-4">
              <v-icon size="48" color="info" class="mb-3">mdi-percent</v-icon>
              <div class="text-h4 font-weight-bold info--text">{{ metrics.hireRate }}%</div>
              <div class="text-subtitle-2 text-medium-emphasis">Hire Rate</div>
              <div class="text-caption success--text mt-2">
                <v-icon size="16" color="success">mdi-trending-up</v-icon>
                +3% from last month
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Charts Row -->
      <v-row class="mb-6">
        <v-col cols="12" lg="8">
          <v-card elevation="2">
            <v-card-title class="d-flex align-center justify-space-between">
              <span>Applications Over Time</span>
              <v-btn-toggle v-model="selectedTimeframe" mandatory>
                <v-btn value="week">Week</v-btn>
                <v-btn value="month">Month</v-btn>
                <v-btn value="quarter">Quarter</v-btn>
              </v-btn-toggle>
            </v-card-title>
            <v-card-text>
              <div class="chart-container" style="height: 300px;">
                <canvas ref="applicationsChart"></canvas>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card elevation="2">
            <v-card-title>Top Job Categories</v-card-title>
            <v-card-text>
              <div class="chart-container" style="height: 300px;">
                <canvas ref="categoriesChart"></canvas>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Data Tables Row -->
      <v-row class="mb-6">
        <v-col cols="12" lg="6">
          <v-card elevation="2">
            <v-card-title>Recent Applications</v-card-title>
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="application in recentApplications" :key="application.id">
                    <td>
                      <div class="d-flex align-center">
                        <v-avatar size="32" class="mr-3">
                          <v-img :src="application.avatar" :alt="application.name"></v-img>
                        </v-avatar>
                        {{ application.name }}
                      </div>
                    </td>
                    <td>{{ application.position }}</td>
                    <td>
                      <v-chip :color="getStatusColor(application.status)" size="small">
                        {{ application.status }}
                      </v-chip>
                    </td>
                    <td>{{ formatDate(application.date) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="6">
          <v-card elevation="2">
            <v-card-title>Performance by Department</v-card-title>
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Hires</th>
                    <th>Avg. Time</th>
                    <th>Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dept in departmentPerformance" :key="dept.name">
                    <td>{{ dept.name }}</td>
                    <td>{{ dept.hires }}</td>
                    <td>{{ dept.avgTime }} days</td>
                    <td>
                      <v-progress-linear
                        :model-value="dept.successRate"
                        :color="getSuccessRateColor(dept.successRate)"
                        height="20"
                        rounded
                      >
                        <template v-slot:default>
                          {{ dept.successRate }}%
                        </template>
                      </v-progress-linear>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Insights Row -->
      <v-row>
        <v-col cols="12">
          <v-card elevation="2">
            <v-card-title>Key Insights</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4" v-for="insight in insights" :key="insight.id">
                  <div class="d-flex align-start">
                    <v-icon :color="insight.color" class="mr-3 mt-1">{{ insight.icon }}</v-icon>
                    <div>
                      <h4 class="text-h6 mb-2">{{ insight.title }}</h4>
                      <p class="text-body-2 text-medium-emphasis">{{ insight.description }}</p>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'

// Reactive data
const selectedTimeframe = ref('month')
const applicationsChart = ref<HTMLCanvasElement>()
const categoriesChart = ref<HTMLCanvasElement>()

// Dummy data
const metrics = ref({
  totalCandidates: 1247,
  activeJobs: 23,
  avgTimeToHire: 18,
  hireRate: 78
})

const recentApplications = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    status: 'Interview',
    date: '2024-01-15',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Product Manager',
    status: 'Applied',
    date: '2024-01-14',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    status: 'Hired',
    date: '2024-01-13',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'Backend Developer',
    status: 'Rejected',
    date: '2024-01-12',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    position: 'Marketing Specialist',
    status: 'Phone Screen',
    date: '2024-01-11',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
])

const departmentPerformance = ref([
  { name: 'Engineering', hires: 15, avgTime: 16, successRate: 85 },
  { name: 'Sales', hires: 8, avgTime: 12, successRate: 92 },
  { name: 'Marketing', hires: 6, avgTime: 20, successRate: 75 },
  { name: 'HR', hires: 3, avgTime: 14, successRate: 88 },
  { name: 'Finance', hires: 4, avgTime: 18, successRate: 80 }
])

const insights = ref([
  {
    id: 1,
    title: 'Engineering Hiring Surge',
    description: 'Engineering positions are seeing 40% more applications this month compared to last month.',
    icon: 'mdi-trending-up',
    color: 'success'
  },
  {
    id: 2,
    title: 'Time to Hire Optimization',
    description: 'Sales roles are being filled 25% faster due to improved screening processes.',
    icon: 'mdi-clock-check',
    color: 'info'
  },
  {
    id: 3,
    title: 'Quality Improvement',
    description: 'Hire rate has increased by 8% while maintaining the same interview-to-offer ratio.',
    icon: 'mdi-chart-line',
    color: 'primary'
  }
])

// Utility functions
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Applied': 'info',
    'Phone Screen': 'warning',
    'Interview': 'primary',
    'Hired': 'success',
    'Rejected': 'error'
  }
  return colors[status] || 'default'
}

const getSuccessRateColor = (rate: number) => {
  if (rate >= 90) return 'success'
  if (rate >= 80) return 'primary'
  if (rate >= 70) return 'warning'
  return 'error'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

// Chart initialization
onMounted(async () => {
  await nextTick()

  if (applicationsChart.value) {
    new Chart(applicationsChart.value, {
      type: 'line',
      data: {
        labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29'],
        datasets: [{
          label: 'Applications',
          data: [45, 52, 38, 67, 58],
          borderColor: '#2049bd',
          backgroundColor: 'rgba(32, 73, 189, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }

  if (categoriesChart.value) {
    new Chart(categoriesChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'],
        datasets: [{
          data: [35, 25, 20, 12, 8],
          backgroundColor: [
            '#2049bd',
            '#4caf50',
            '#ff9800',
            '#9c27b0',
            '#f44336'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.analysis-view {
  padding: 20px;
  background-color: #f5f5f5;
}

.metric-card {
  transition: transform 0.2s ease-in-out;
}

.metric-card:hover {
  transform: translateY(-2px);
}

.chart-container {
  position: relative;
}

.v-card {
  border-radius: 12px;
}

.v-card-title {
  font-weight: 600;
  color: #333;
}

.primary--text {
  color: #2049bd !important;
}

.success--text {
  color: #4caf50 !important;
}

.warning--text {
  color: #ff9800 !important;
}

.info--text {
  color: #2196f3 !important;
}
</style>
