<template>
  <v-dialog
    v-model="dialog"
    max-width="800px"
    persistent
    class="create-candidate-dialog"
  >
    <v-card class="dialog-card">
      <v-card-title class="dialog-header">
        <div class="header-content">
          <h2 class="text-h5 font-weight-bold text-grey-darken-3">
            Create a candidate
          </h2>
          <p class="text-body-2 text-grey-darken-1 mt-1">
            Add a new candidate to your CV library
          </p>
        </div>
        <v-btn
          icon
          variant="text"
          @click="closeDialog"
          class="close-btn"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="dialog-content pa-6">
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
            <v-col cols="12">
              <v-text-field
                v-model="formData.email"
                label="E-mail"
                type="email"
                variant="outlined"
                density="compact"
                :rules="[rules.required, rules.email]"
                hide-details="auto"
                class="form-field"
              />
            </v-col>

            <!-- Phone -->
            <v-col cols="12">
              <div class="phone-field">
                <v-select
                  v-model="formData.countryCode"
                  :items="countryCodes"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="country-code-select"
                  style="max-width: 120px"
                />
                <v-text-field
                  v-model="formData.phone"
                  label="Phone"
                  variant="outlined"
                  density="compact"
                  :rules="[rules.required]"
                  hide-details="auto"
                  class="phone-input"
                />
              </div>
            </v-col>

            <!-- Link to a talent pool -->
            <v-col cols="12">
              <v-select
                v-model="formData.talentPools"
                :items="talentPoolOptions"
                label="Link to a talent pool"
                variant="outlined"
                density="compact"
                multiple
                chips
                :rules="[rules.required]"
                hide-details="auto"
                class="form-field"
              />
            </v-col>

            <!-- Link to a job -->
            <v-col cols="12">
              <v-select
                v-model="formData.appliedJobs"
                :items="jobOptions"
                label="Link to a job"
                variant="outlined"
                density="compact"
                multiple
                chips
                hide-details="auto"
                class="form-field"
              />
            </v-col>

            <!-- Choose a step -->
            <v-col cols="12">
              <v-select
                v-model="formData.step"
                :items="recruitmentSteps"
                label="Choose a step"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
                hide-details="auto"
                class="form-field"
              />
            </v-col>

            <!-- Experience -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formData.experience"
                label="Experience (years)"
                type="number"
                variant="outlined"
                density="compact"
                :rules="[rules.required, rules.positive]"
                hide-details="auto"
                class="form-field"
                min="0"
                max="50"
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
                hide-details="auto"
                class="form-field"
                placeholder="e.g., Jul 16, 2025"
              />
            </v-col>

            <!-- Salary Range -->
            <v-col cols="12">
              <div class="salary-section">
                <label class="salary-label text-body-2 text-grey-darken-2 mb-2">
                  Salary Range (€)
                </label>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="formData.salary.min"
                      label="Minimum"
                      type="number"
                      variant="outlined"
                      density="compact"
                      :rules="[rules.required, rules.positive]"
                      hide-details="auto"
                      class="form-field"
                      min="0"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="formData.salary.max"
                      label="Maximum"
                      type="number"
                      variant="outlined"
                      density="compact"
                      :rules="[rules.required, rules.positive]"
                      hide-details="auto"
                      class="form-field"
                      min="0"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-col>

            <!-- Notes -->
            <v-col cols="12">
              <v-textarea
                v-model="formData.notes"
                label="Notes"
                variant="outlined"
                density="compact"
                rows="3"
                hide-details="auto"
                class="form-field"
                placeholder="Additional notes about the candidate..."
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <!-- Add Document Button -->
      <v-card-actions class="document-section pa-6 pt-0">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-file-plus"
          @click="addDocument"
          class="add-document-btn"
        >
          Add document
        </v-btn>
      </v-card-actions>

      <!-- Action Buttons -->
      <v-card-actions class="dialog-actions pa-6 pt-0">
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="closeDialog"
          class="cancel-btn"
        >
          Cancel
        </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          @click="createAndAddAnother"
          class="create-another-btn"
        >
          Create and add another
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="createCandidate"
          :loading="isLoading"
          :disabled="!isValid"
          class="create-btn"
        >
          Create a candidate
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CreateCandidateData, Candidate } from '@/types/interfaces/candidate-types'
import { CandidateStatus } from '@/types/interfaces/candidate-types'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'candidate-created', candidate: Candidate): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref()
const isValid = ref(false)
const isLoading = ref(false)

const formData = ref<CreateCandidateData & { step: string }>({
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
  notes: '',
  step: ''
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

const recruitmentSteps = [
        'New',
      'CV Selected',
      'Phone Evaluated',
      'Interview Passed',
      'Offer Made'
]

const studyLevelOptions = [
  'No diploma',
  'High School',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Other'
]

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
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
    notes: '',
    step: ''
  }
  form.value?.resetValidation()
}

const addDocument = () => {
  // TODO: Implement document upload functionality
  console.log('Add document clicked')
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
      age: 25, // TODO: Calculate from birth date
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

    emit('candidate-created', candidate)
    closeDialog()
  } catch (error) {
    console.error('Error creating candidate:', error)
  } finally {
    isLoading.value = false
  }
}

const createAndAddAnother = async () => {
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

    emit('candidate-created', candidate)
    resetForm()
    form.value?.resetValidation()
  } catch (error) {
    console.error('Error creating candidate:', error)
  } finally {
    isLoading.value = false
  }
}

// Reset form when dialog opens
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    resetForm()
  }
})
</script>

<style scoped>
.create-candidate-dialog {
  border-radius: 16px;
}

.dialog-card {
  border-radius: 16px;
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px 24px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-content h2 {
  margin: 0;
  color: var(--color-heading);
}

.close-btn {
  color: var(--color-text);
}

.dialog-content {
  max-height: 70vh;
  overflow-y: auto;
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
}

.document-section {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.add-document-btn {
  border-radius: 8px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  color: var(--color-primary);
}

.add-document-btn:hover {
  border-color: var(--color-primary);
  background-color: rgba(25, 118, 210, 0.04);
}

.dialog-actions {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background-color: rgba(0, 0, 0, 0.02);
}

.cancel-btn {
  border-radius: 8px;
}

.create-another-btn {
  border-radius: 8px;
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
@media (max-width: 600px) {
  .dialog-header {
    padding: 20px 20px 12px 20px;
  }

  .dialog-content {
    padding: 20px;
  }

  .phone-field {
    flex-direction: column;
    gap: 8px;
  }

  .country-code-select {
    max-width: 100%;
  }

  .dialog-actions {
    flex-direction: column;
    gap: 12px;
  }

  .dialog-actions .v-btn {
    width: 100%;
  }
}
</style>
