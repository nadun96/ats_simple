<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5 font-weight-bold primary--text">
        Apply for {{ job?.title }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitApplication" v-model="isFormValid" ref="form">
          <v-row>
            <v-col cols="12" sm="6">
              <CdTextInput
                v-model="application.firstName"
                label="First Name"
                placeholder="Enter your first name"
                required
                :rules="nameRules"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <CdTextInput
                v-model="application.lastName"
                label="Last Name"
                placeholder="Enter your last name"
                required
                :rules="nameRules"
              />
            </v-col>
          </v-row>

          <CdTextInput
            v-model="application.email"
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            required
            :rules="emailRules"
          />

          <CdTextInput
            v-model="application.phone"
            label="Phone Number (Optional)"
            placeholder="Enter your phone number"
            type="tel"
          />

          <v-file-input
            v-model="application.resume"
            label="Resume/CV *"
            accept=".pdf,.doc,.docx"
            :rules="resumeRules"
            prepend-icon="mdi-file-document"
            show-size
            counter
            required
          />

          <v-textarea
            v-model="application.coverLetter"
            label="Cover Letter (Optional)"
            placeholder="Tell us why you're interested in this position..."
            rows="4"
            variant="outlined"
            auto-grow
          />

          <v-text-field
            v-model="application.portfolioUrl"
            label="Portfolio URL (Optional)"
            placeholder="https://your-portfolio.com"
            variant="outlined"
            prepend-inner-icon="mdi-link"
          />

          <div class="mt-4">
            <v-checkbox
              v-model="application.agreeToTerms"
              label="I agree to the Terms of Service and Privacy Policy"
              color="primary"
              required
              :rules="[(v: boolean) => !!v || 'You must agree to the terms']"
            />
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          @click="closeDialog"
          :disabled="isSubmitting"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="submitApplication"
          :loading="isSubmitting"
          :disabled="!isFormValid || isSubmitting"
        >
          Submit Application
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CdTextInput } from '@/components/atoms'
import { publicJobService, type PublicJob, type JobApplication } from '@/services/publicJobService'

interface Props {
  modelValue: boolean
  job: PublicJob | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'application-submitted', application: JobApplication): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form validation
const form = ref()
const isFormValid = ref(false)
const isSubmitting = ref(false)

// Application data
const application = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  resume: null as File | null,
  coverLetter: '',
  portfolioUrl: '',
  agreeToTerms: false
})

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length >= 2 || 'Name must be at least 2 characters'
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const resumeRules = [
  (v: File | null) => !!v || 'Resume is required',
  (v: File | null) => !v || v.size <= 5 * 1024 * 1024 || 'File size must be less than 5MB'
]

// Computed
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
const submitApplication = async () => {
  if (!props.job || !isFormValid.value) return

  isSubmitting.value = true

  try {
    // Convert File to base64 string for storage (in real app, upload to server)
    const resumeBase64 = await fileToBase64(application.value.resume!)

    const applicationData = {
      candidateName: `${application.value.firstName} ${application.value.lastName}`,
      candidateEmail: application.value.email,
      candidatePhone: application.value.phone || undefined,
      resume: resumeBase64,
      coverLetter: application.value.coverLetter || undefined,
      portfolioUrl: application.value.portfolioUrl || undefined,
      source: 'Career Site'
    }

    const submittedApplication = publicJobService.applyToJob(props.job.id, applicationData)

    // Emit success event
    emit('application-submitted', submittedApplication)

    // Close dialog and reset form
    closeDialog()
    resetForm()

    // Show success message
    // TODO: Add toast notification system
    console.log('Application submitted successfully!')

  } catch (error) {
    console.error('Failed to submit application:', error)
    // TODO: Show error message to user
  } finally {
    isSubmitting.value = false
  }
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

const resetForm = () => {
  application.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    portfolioUrl: '',
    agreeToTerms: false
  }

  if (form.value) {
    form.value.reset()
  }
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

// Watch for dialog close to reset form
watch(dialog, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>

<style scoped>
.primary--text {
  color: #1976d2 !important;
}
</style>
