<template>
  <v-app>
    <v-main>
      <div class="ad-hero">
        <div class="ad-hero__content">
          <h1 class="ad-title">{{ job.companyName || 'Your Company' }} — {{ job.title || 'Open Position' }}</h1>
          <p class="ad-location">{{ job.location || 'Remote / Flexible' }}</p>
          <v-btn color="primary" class="mt-4">Apply now</v-btn>
        </div>
      </div>

      <v-container class="ad-container">
        <v-row>
          <v-col cols="12" md="8">
            <v-card class="pa-6">
              <h2 class="section-title">About the job</h2>
              <div class="prose" v-html="job.description || defaultDescription" />

              <h2 class="section-title mt-8">Responsibilities</h2>
              <ul class="prose">
                <li v-for="(item, i) in responsibilities" :key="i">{{ item }}</li>
              </ul>

              <h2 class="section-title mt-8">Qualifications</h2>
              <ul class="prose">
                <li v-for="(item, i) in qualifications" :key="i">{{ item }}</li>
              </ul>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-6 sticky-card">
              <div class="text-subtitle-1 font-weight-medium mb-2">Job details</div>
              <div class="detail-row"><span>Employment</span><span>{{ job.employmentType || 'Full-time' }}</span></div>
              <div class="detail-row"><span>Seniority</span><span>{{ job.level || 'Mid' }}</span></div>
              <div class="detail-row"><span>Salary</span><span>{{ job.salary || 'Competitive' }}</span></div>
              <v-divider class="my-4" />
              <v-btn block color="primary">Apply now</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const job = ref<{ companyName?: string; title?: string; location?: string; description?: string; employmentType?: string; level?: string; salary?: string }>({})

const defaultDescription = `We are seeking a passionate professional to join our team and help build delightful experiences. You will collaborate with cross-functional partners to deliver high-quality outcomes.`

const responsibilities = [
  'Own and deliver features end-to-end',
  'Collaborate with designers and PMs',
  'Write clean, maintainable code',
]

const qualifications = [
  '2+ years of relevant experience',
  'Strong communication skills',
  'A passion for learning and growth',
]

onMounted(() => {
  // In a real app, fetch from store/API. For now, try to hydrate from localStorage if available
  try {
    const stored = localStorage.getItem('jobDescriptionForm')
    if (stored) {
      const data = JSON.parse(stored)
      job.value = {
        companyName: data?.companyName,
        title: data?.jobTitle,
        location: data?.location,
        description: data?.description,
        employmentType: data?.employmentType,
        level: data?.level,
        salary: data?.salary,
      }
    }
  } catch {}
})
</script>

<style scoped>
/* Remove any stray lines/margins from default layout; standalone clean page */
.ad-hero {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
  padding: 56px 16px;
}

.ad-hero__content {
  max-width: 960px;
  margin: 0 auto;
}

.ad-title {
  margin: 0 0 8px 0;
}

.ad-location {
  opacity: 0.9;
}

.ad-container {
  max-width: 1100px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 12px;
}

.prose {
  color: #374151;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  color: #374151;
}

.sticky-card {
  position: sticky;
  top: 24px;
}
</style>

