<template>
  <v-app>
    <div class="public-layout">
      <!-- Public Header -->
      <v-app-bar
        color="white"
        elevation="1"
        class="public-header"
        height="80"
      >
        <v-container class="d-flex align-center">
          <!-- Logo/Brand -->
          <div class="d-flex align-center">
            <v-icon size="32" color="primary" class="mr-3">mdi-briefcase</v-icon>
            <h1 class="text-h4 font-weight-bold primary--text mb-0">
              JobPortal
            </h1>
          </div>

          <v-spacer></v-spacer>

          <!-- Navigation Menu -->
          <nav class="d-none d-md-flex align-center">
            <v-btn variant="text" color="grey-darken-1" class="mx-2">
              Browse Jobs
            </v-btn>
            <v-btn variant="text" color="grey-darken-1" class="mx-2">
              Companies
            </v-btn>
            <v-btn variant="text" color="grey-darken-1" class="mx-2">
              Resources
            </v-btn>
            <v-btn variant="text" color="grey-darken-1" class="mx-2">
              About
            </v-btn>
          </nav>

          <!-- Auth Buttons -->
          <div class="d-flex align-center ml-6">
            <v-btn
              variant="outlined"
              color="primary"
              class="mr-3"
              @click="goToLogin"
            >
              Sign In
            </v-btn>
            <v-btn
              color="primary"
              variant="elevated"
              @click="goToSignup"
            >
              Sign Up
            </v-btn>
          </div>
        </v-container>
      </v-app-bar>

      <!-- Main Content -->
      <v-main class="public-main">
        <slot />
      </v-main>

      <!-- Public Footer -->
      <v-footer
        color="grey-darken-4"
        class="public-footer"
        dark
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <div class="mb-4">
                <v-icon size="32" color="primary" class="mr-3">mdi-briefcase</v-icon>
                <span class="text-h5 font-weight-bold">JobPortal</span>
              </div>
              <p class="text-body-2 text-grey-lighten-1">
                Connecting talented professionals with amazing opportunities.
                Find your dream job or hire the perfect candidate.
              </p>
            </v-col>

            <v-col cols="12" md="2">
              <h6 class="text-h6 font-weight-bold mb-3">For Job Seekers</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Browse Jobs
                  </v-btn>
                </li>
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Career Advice
                  </v-btn>
                </li>
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Resume Tips
                  </v-btn>
                </li>
              </ul>
            </v-col>

            <v-col cols="12" md="2">
              <h6 class="text-h6 font-weight-bold mb-3">For Employers</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Post a Job
                  </v-btn>
                </li>
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Pricing
                  </v-btn>
                </li>
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Recruiting Tools
                  </v-btn>
                </li>
              </ul>
            </v-col>

            <v-col cols="12" md="2">
              <h6 class="text-h6 font-weight-bold mb-3">Company</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    About Us
                  </v-btn>
                </li>
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Contact
                  </v-btn>
                </li>
                <li class="mb-2">
                  <v-btn variant="text" color="grey-lighten-1" size="small">
                    Privacy Policy
                  </v-btn>
                </li>
              </ul>
            </v-col>

            <v-col cols="12" md="2">
              <h6 class="text-h6 font-weight-bold mb-3">Connect</h6>
              <div class="d-flex">
                <v-btn icon variant="text" color="grey-lighten-1" class="mr-2">
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon variant="text" color="grey-lighten-1" class="mr-2">
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
                <v-btn icon variant="text" color="grey-lighten-1" class="mr-2">
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
                <v-btn icon variant="text" color="grey-lighten-1">
                  <v-icon>mdi-instagram</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-6"></v-divider>

          <div class="text-center">
            <p class="text-body-2 text-grey-lighten-1 mb-0">
              © 2025 JobPortal. All rights reserved.
            </p>
          </div>
        </v-container>
      </v-footer>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
}
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.public-header {
  border-bottom: 1px solid #e9ecef;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.public-main {
  padding-top: 80px; /* Match the app bar height */
  min-height: calc(100vh - 80px - 400px); /* viewport height - header - footer */
  background-color: transparent;
}

.public-footer {
  margin-top: auto;
}

.list-unstyled {
  list-style: none;
  padding: 0;
}

.primary--text {
  color: #1976d2 !important;
}

/* Override Vuetify default app background */
:deep(.v-application) {
  background-color: transparent !important;
}

:deep(.v-main) {
  background-color: transparent !important;
}

/* Ensure the app bar doesn't interfere with content */
:deep(.v-app-bar) {
  position: fixed !important;
}
</style>
