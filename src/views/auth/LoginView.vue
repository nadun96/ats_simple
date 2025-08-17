<template>
  <div class="login-container">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="login-card" elevation="8">
            <v-card-title class="text-center text-h4 font-weight-bold primary--text py-6">
              Welcome Back
            </v-card-title>

            <v-card-text class="px-6">
              <v-form @submit.prevent="handleLogin" v-model="isFormValid">
                <CdTextInput
                  v-model="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  required
                  :rules="emailRules"
                />

                <CdTextInput
                  v-model="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  required
                  :rules="passwordRules"
                />

                <div class="d-flex justify-space-between align-center mt-2 mb-4">
                  <v-checkbox
                    v-model="rememberMe"
                    label="Remember me"
                    color="primary"
                    hide-details
                  />
                  <v-btn
                    variant="text"
                    color="primary"
                    @click="forgotPassword"
                    class="text-caption"
                  >
                    Forgot Password?
                  </v-btn>
                </div>

                <v-btn
                  type="submit"
                  color="primary"
                  variant="elevated"
                  size="large"
                  block
                  :loading="isLoading"
                  :disabled="!isFormValid"
                  class="mb-4"
                >
                  Sign In
                </v-btn>
              </v-form>

              <v-divider class="my-4"></v-divider>

              <div class="text-center">
                <span class="text-body-2 text-medium-emphasis">
                  Don't have an account?
                </span>
                <v-btn
                  variant="text"
                  color="primary"
                  @click="goToSignup"
                  class="ml-2"
                >
                  Sign Up
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CdTextInput } from '@/components/atoms'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isFormValid = ref(false)

// Validation rules
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
]

// Computed
const isLoading = computed(() => authStore.isLoading)

// Methods
const handleLogin = async () => {
  if (!isFormValid.value) return

  try {
    await authStore.login(email.value, password.value)

    // Redirect to dashboard after successful login
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    // TODO: Show error message to user
    alert('Login failed. Please check your credentials and try again.')
  }
}

const forgotPassword = () => {
  // TODO: Implement forgot password functionality
  console.log('Forgot password clicked')
  alert('Forgot password functionality coming soon!')
}

const goToSignup = () => {
  router.push('/signup')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.primary--text {
  color: #1976d2 !important;
}
</style>
