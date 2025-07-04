<template>
  <div class="home-view">
    <HeaderView />

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid class="pa-0">
        <!-- Mobile-responsive content -->
        <v-row no-gutters>
          <v-col cols="12">
            <v-card flat class="pa-4 pa-md-6">
              <v-card-title class="text-h4 text-md-h3 font-weight-bold mb-4">
                Welcome to Simple ATS
              </v-card-title>

              <v-card-text class="text-body-1 text-md-h6 mb-6">
                Streamline your recruitment process with our modern applicant tracking system.
              </v-card-text>

              <!-- Action Cards - Responsive Grid -->
              <v-row class="mb-6">
                <v-col cols="12" sm="6" md="4" v-for="(action, index) in quickActions" :key="index">
                  <v-card
                    hover
                    class="h-100 d-flex flex-column"
                    :color="action.color"
                    variant="outlined"
                  >
                    <v-card-title class="d-flex align-center">
                      <v-icon :icon="action.icon" class="mr-3" size="large"></v-icon>
                      {{ action.title }}
                    </v-card-title>
                    <v-card-text class="flex-grow-1">
                      {{ action.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-btn :color="action.color" variant="text" block>
                        {{ action.buttonText }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Statistics Section - Mobile responsive -->
              <v-row>
                <v-col cols="12">
                  <v-card variant="outlined">
                    <v-card-title>
                      <v-icon icon="mdi-chart-box" class="mr-2"></v-icon>
                      Quick Stats
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="6" sm="3" v-for="(stat, index) in stats" :key="index">
                          <div class="text-center">
                            <div class="text-h4 text-md-h3 font-weight-bold text-primary">
                              {{ stat.value }}
                            </div>
                            <div class="text-caption text-md-body-2 text-grey-darken-1">
                              {{ stat.label }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import HeaderView from '@/views/HeaderView.vue';
import { ref } from 'vue'

const quickActions = ref([
  {
    title: 'New Recruitment',
    description: 'Start a new recruitment process and post job openings.',
    icon: 'mdi-account-plus',
    color: 'primary',
    buttonText: 'Create Job'
  },
  {
    title: 'Browse CVs',
    description: 'Search and review candidate profiles in your CV library.',
    icon: 'mdi-file-document-multiple',
    color: 'success',
    buttonText: 'Browse CVs'
  },
  {
    title: 'View Analytics',
    description: 'Track your recruitment performance and metrics.',
    icon: 'mdi-chart-line',
    color: 'info',
    buttonText: 'View Reports'
  }
])

const stats = ref([
  { value: '24', label: 'Active Jobs' },
  { value: '156', label: 'Candidates' },
  { value: '12', label: 'Interviews' },
  { value: '8', label: 'Offers' }
])
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

/* Mobile-specific adjustments */
@media (max-width: 600px) {
  .v-card-title {
    font-size: 1.1rem !important;
  }

  .text-h4 {
    font-size: 1.5rem !important;
  }
}

/* Tablet adjustments */
@media (min-width: 601px) and (max-width: 960px) {
  .v-card-title {
    font-size: 1.25rem !important;
  }
}
</style>
