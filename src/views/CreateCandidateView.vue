<template>
  <div class="create-candidate-page">
    <div class="create-candidate-container">
        <!-- Header Section -->
        <div class="page-header">
          <div class="header-content">
            <h1 class="text-h4 font-weight-bold text-grey-darken-3 mb-2">
              Add New Candidate
            </h1>
            <p class="text-body-1 text-grey-darken-1 mb-6">
              Create a new candidate profile and add them to your CV library
            </p>
          </div>
          <v-btn
            variant="outlined"
            prepend-icon="mdi-arrow-left"
            @click="goBack"
            class="back-btn"
          >
            Back to Candidates
          </v-btn>
        </div>

        <!-- Form Section -->
        <v-card class="form-card">
          <v-card-text class="pa-6">
            <v-form ref="form" v-model="isValid">
              <v-row>
                <!-- First Name -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.firstName"
                    label="First name"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required]"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Last Name -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.lastName"
                    label="Last name"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required]"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Email -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required, rules.email]"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Phone -->
                <v-col cols="12" md="6">
                  <div class="phone-field">
                    <v-select
                      v-model="formData.countryCode"
                      :items="countryCodes"
                      variant="outlined"
                      density="compact"
                      class="country-code-select"
                      hide-details="auto"
                    />
                    <v-text-field
                      v-model="formData.phone"
                      label="Phone number"
                      variant="outlined"
                      density="compact"
                      :rules="[rules.required]"
                      hide-details="auto"
                      class="phone-input"
                    />
                  </div>
                </v-col>

                <!-- Experience -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="formData.experience"
                    label="Years of experience"
                    type="number"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required, rules.positive]"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Study Level -->
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.studyLevel"
                    :items="studyLevelOptions"
                    label="Study level"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required]"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Location -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.location"
                    label="Location"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required]"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Availability -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.availability"
                    label="Availability"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required]"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Salary Section -->
                <v-col cols="12">
                  <div class="salary-section">
                    <label class="salary-label mb-3">Salary expectations</label>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="formData.salary.min"
                          label="Minimum salary"
                          type="number"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required, rules.positive]"
                          hide-details="auto"
                          class="form-field"
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="formData.salary.max"
                          label="Maximum salary"
                          type="number"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required, rules.positive]"
                          hide-details="auto"
                          class="form-field"
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="formData.salary.currency"
                          :items="['EUR', 'USD', 'GBP']"
                          label="Currency"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          hide-details="auto"
                          class="form-field"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-col>

                <!-- Talent Pools -->
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.talentPools"
                    :items="talentPoolOptions"
                    label="Talent pools"
                    variant="outlined"
                    density="compact"
                    multiple
                    chips
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Applied Jobs -->
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.appliedJobs"
                    :items="jobOptions"
                    label="Applied jobs"
                    variant="outlined"
                    density="compact"
                    multiple
                    chips
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>

                <!-- Notes -->
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.notes"
                    label="Notes"
                    variant="outlined"
                    density="compact"
                    rows="4"
                    hide-details="auto"
                    class="form-field"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <!-- Action Buttons -->
          <v-card-actions class="pa-6 pt-0">
            <v-spacer />
            <v-btn
              variant="outlined"
              @click="goBack"
              class="cancel-btn mr-3"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              variant="elevated"
              @click="createCandidate"
              :loading="isLoading"
              :disabled="!isValid"
              class="create-btn"
            >
              Create Candidate
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import type { CreateCandidateData, Candidate } from '@/types/interfaces/candidate-types'
import { CandidateStatus } from '@/types/interfaces/candidate-types'

const router = useRouter()
const form = ref()
const isValid = ref(false)
const isLoading = ref(false)

const formData = ref<CreateCandidateData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  countryCode: '+33',
  experience: 0,
  studyLevel: '',
  location: '',
  availability: '',
  salary: {
    min: 0,
    max: 0,
    currency: 'EUR'
  },
  talentPools: [],
  appliedJobs: [],
  notes: ''
})

const rules = {
  required: (v: string | number | boolean) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
  positive: (v: number) => v >= 0 || 'Value must be positive'
}

const countryCodes = [
  { title: '🇫🇷 +33', value: '+33' },
  { title: '🇺🇸 +1', value: '+1' },
  { title: '🇬🇧 +44', value: '+44' },
  { title: '🇩🇪 +49', value: '+49' },
  { title: '🇪🇸 +34', value: '+34' },
  { title: '🇮🇹 +39', value: '+39' }
]

const talentPoolOptions = [
  'Sourcing',
  'Active',
  'Passive',
  'Rejected',
  'Hired'
]

const jobOptions = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager',
  'UI/UX Designer'
]

const studyLevelOptions = [
  'No diploma',
  'High School',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Other'
]

const goBack = () => {
  router.push('/candidates')
}

const createCandidate = async () => {
  if (!form.value?.validate()) return

  isLoading.value = true

  try {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const candidate: Candidate = {
      id: Date.now().toString(),
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      phone: formData.value.phone,
      countryCode: formData.value.countryCode,
      age: 25,
      experience: formData.value.experience,
      studyLevel: formData.value.studyLevel,
      location: formData.value.location,
      availability: formData.value.availability,
      salary: formData.value.salary,
      status: CandidateStatus.NEW,
      appliedJobs: [],
      talentPools: formData.value.talentPools,
      tags: [],
      rating: 0,
      notes: formData.value.notes,
      cvUrl: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Redirect to candidates page after successful creation
    router.push('/candidates')
  } catch (error) {
    console.error('Error creating candidate:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.create-candidate-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.create-candidate-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.header-content {
  flex: 1;
}

.back-btn {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateX(-2px);
}

.form-card {
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-field {
  border-radius: 8px;
}

.phone-field {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.country-code-select {
  flex-shrink: 0;
  min-width: 120px;
}

.phone-input {
  flex: 1;
}

.salary-section {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.02);
}

.salary-label {
  display: block;
  font-weight: 500;
  color: var(--color-text);
}

.cancel-btn {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  transform: translateY(-1px);
}

.create-btn {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .create-candidate-container {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .back-btn {
    align-self: flex-start;
  }
}

@media (max-width: 600px) {
  .phone-field {
    flex-direction: column;
    gap: 8px;
  }

  .country-code-select {
    max-width: 100%;
  }
}
</style>
