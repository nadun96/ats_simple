<template>
  <div class="signup-container">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="signup-card" elevation="8">
            <v-card-title class="text-center text-h4 font-weight-bold primary--text py-6">
              Create Account
            </v-card-title>

            <v-card-text class="px-6">
              <v-form @submit.prevent="handleSignup" v-model="isFormValid">
                <v-row>
                  <v-col cols="12" sm="6">
                    <CdTextInput
                      v-model="firstName"
                      label="First Name"
                      placeholder="Enter first name"
                      required
                      :rules="nameRules"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <CdTextInput
                      v-model="lastName"
                      label="Last Name"
                      placeholder="Enter last name"
                      required
                      :rules="nameRules"
                    />
                  </v-col>
                </v-row>

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
                  placeholder="Create a password"
                  type="password"
                  required
                  :rules="passwordRules"
                />

                <CdTextInput
                  v-model="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  required
                  :rules="confirmPasswordRules"
                />

                <div class="mt-4 mb-4">
                  <v-checkbox
                    v-model="agreeToTerms"
                    label="I agree to the Terms of Service and Privacy Policy"
                    color="primary"
                    required
                    :rules="[(v: boolean) => !!v || 'You must agree to the terms']"
                  />
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
                  Create Account
                </v-btn>
              </v-form>

              <v-divider class="my-4"></v-divider>

              <div class="text-center">
                <span class="text-body-2 text-medium-emphasis">
                  Already have an account?
                </span>
                <v-btn
                  variant="text"
                  color="primary"
                  @click="goToLogin"
                  class="ml-2"
                >
                  Sign In
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
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const isFormValid = ref(false)

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length >= 2 || 'Name must be at least 2 characters'
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
  (v: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) || 'Password must contain uppercase, lowercase, and number'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Please confirm your password',
  (v: string) => v === password.value || 'Passwords do not match'
]

// Computed
const isLoading = computed(() => authStore.isLoading)

// Methods
const handleSignup = async () => {
  if (!isFormValid.value) return

  try {
    await authStore.signup({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    })

    // Redirect to dashboard after successful signup
    router.push('/')
  } catch (error) {
    console.error('Signup failed:', error)
    // TODO: Show error message to user
    alert('Signup failed. Please try again.')
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.signup-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.primary--text {
  color: #1976d2 !important;
}
</style>
