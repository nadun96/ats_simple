<template>
  <div class="home-view">


    <!-- Main Content Area -->
    <v-main>
      <v-container fluid class="centered-container">
        <v-row no-gutters justify="center">
          <v-col cols="12" md="10" lg="10">
            <v-card flat class="pa-4">
              <v-card-title class="text-h4 text-md-h3 font-weight-bold mb-6">
                Welcome to Simple ATS
              </v-card-title>
              <v-card-text class="text-body-1 text-md-h6 mb-8">
                Streamline your recruitment process with our modern applicant tracking system.
              </v-card-text>

              <v-row class="mb-8" no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  v-for="(action, i) in quickActions"
                  :key="i"
                  class="pa-2"
                >
                  <v-card
                    hover
                    class="h-100 d-flex flex-column pa-3"
                    :color="action.color"
                    variant="outlined"
                  >
                    <v-card-title class="d-flex align-center">
                      <v-icon :icon="action.icon" class="mr-4" size="large" />
                      {{ action.title }}
                    </v-card-title>
                    <v-card-text class="flex-grow-1 py-4">
                      {{ action.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-btn :color="action.color" variant="text" block class="py-2">
                        {{ action.buttonText }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12">
                  <v-card variant="outlined" class="pa-4">
                    <v-card-title>
                      <v-icon icon="mdi-chart-box" class="mr-4" />
                      Quick Stats
                    </v-card-title>
                    <v-card-text>
                      <v-row no-gutters>
                        <v-col cols="6" sm="3" v-for="(stat, i) in stats" :key="i" class="pa-2">
                          <div class="text-center">
                            <div class="text-h4 text-md-h3 font-weight-bold text-primary mb-2">
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
import { ref } from 'vue'
import mockData from '@/assets/mock.json'

const quickActions = ref(mockData.quickActions)
const stats = ref(mockData.stats)
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.centered-container {
  padding: 0 !important;
  width: 100%;
  max-width: 100% !important;
  margin: 0 !important;
}

.v-card {
  padding: 0 !important;
}

@media (max-width: 600px) {
  .v-card-title {
    font-size: 1.1rem !important;
  }
  .text-h4 {
    font-size: 1.5rem !important;
  }
}

@media (601px <= width <= 960px) {
  .v-card-title {
    font-size: 1.25rem !important;
  }
}
</style>
