<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="700px"
    persistent
    class="cv-upload-dialog"
  >
    <v-card class="upload-card">
      <!-- Enhanced Header -->
      <v-card-title class="upload-header pa-6">
        <div class="d-flex align-center">
          <div class="upload-icon-wrapper mr-4">
            <v-icon size="32" color="primary">mdi-file-upload</v-icon>
          </div>
          <div>
            <h2 class="text-h4 font-weight-bold mb-1">Upload New CV</h2>
            <p class="text-body-1 text-grey-darken-1 mb-0">Add a new candidate to your talent pool</p>
          </div>
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="large"
          @click="closeDialog"
          class="close-btn"
        />
      </v-card-title>

      <!-- Progress Steps -->
      <v-stepper v-model="currentStep" class="upload-stepper">
        <v-stepper-header class="stepper-header">
          <template v-for="(step, index) in steps" :key="step.title">
            <v-stepper-item
              :value="index + 1"
              :title="step.title"
              :rules="step.rules"
              class="stepper-item"
            />
            <v-divider v-if="index < steps.length - 1" />
          </template>
        </v-stepper-header>

        <v-stepper-window v-model="currentStep">
          <!-- Step 1: Basic Information -->
          <v-stepper-window-item :value="1">
            <div class="step-content pa-6">
              <div class="step-header mb-4">
                <h3 class="text-h5 font-weight-bold mb-2">Basic Information</h3>
                <p class="text-body-2 text-grey-darken-1">Tell us about the candidate</p>
              </div>

              <v-form ref="basicForm" v-model="isBasicFormValid">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.name"
                      label="Full Name *"
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Name is required']"
                      required
                      class="form-field"
                      prepend-inner-icon="mdi-account"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email *"
                      type="email"
                      variant="outlined"
                      density="comfortable"
                      :rules="[
                        v => !!v || 'Email is required',
                        v => /.+@.+\..+/.test(v) || 'Email must be valid'
                      ]"
                      required
                      class="form-field"
                      prepend-inner-icon="mdi-email"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.phone"
                      label="Phone Number"
                      variant="outlined"
                      density="comfortable"
                      class="form-field"
                      prepend-inner-icon="mdi-phone"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.experience"
                      label="Experience Level *"
                      :items="experienceOptions"
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Experience level is required']"
                      required
                      class="form-field"
                      prepend-inner-icon="mdi-account-star"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.location"
                      label="Location"
                      variant="outlined"
                      density="comfortable"
                      class="form-field"
                      prepend-inner-icon="mdi-map-marker"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.source"
                      label="Source *"
                      :items="sourceOptions"
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Source is required']"
                      required
                      class="form-field"
                      prepend-inner-icon="mdi-source-branch"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-stepper-window-item>

          <!-- Step 2: Skills and Status -->
          <v-stepper-window-item :value="2">
            <div class="step-content pa-6">
              <div class="step-header mb-4">
                <h3 class="text-h5 font-weight-bold mb-2">Skills & Status</h3>
                <p class="text-body-2 text-grey-darken-1">Define candidate skills and current status</p>
              </div>

              <v-form ref="skillsForm" v-model="isSkillsFormValid">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="formData.skills"
                      label="Skills *"
                      :items="skillOptions"
                      variant="outlined"
                      density="comfortable"
                      multiple
                      chips
                      closable-chips
                      :rules="[v => v.length > 0 || 'At least one skill is required']"
                      required
                      class="form-field"
                      prepend-inner-icon="mdi-tools"
                      hint="Select or type skills relevant to the candidate"
                      persistent-hint
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.status"
                      label="Status *"
                      :items="statusOptions"
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Status is required']"
                      required
                      class="form-field"
                      prepend-inner-icon="mdi-flag"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.appliedDate"
                      label="Applied Date"
                      type="date"
                      variant="outlined"
                      density="comfortable"
                      class="form-field"
                      prepend-inner-icon="mdi-calendar"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-stepper-window-item>

          <!-- Step 3: Files and Additional Info -->
          <v-stepper-window-item :value="3">
            <div class="step-content pa-6">
              <div class="step-header mb-4">
                <h3 class="text-h5 font-weight-bold mb-2">Files & Additional Info</h3>
                <p class="text-body-2 text-grey-darken-1">Upload documents and add notes</p>
              </div>

              <v-form ref="filesForm" v-model="isFilesFormValid">
                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      v-model="formData.resumeFile"
                      label="Resume/CV File *"
                      variant="outlined"
                      density="comfortable"
                      accept=".pdf,.doc,.docx"
                      :rules="[v => !!v || 'Resume file is required']"
                      required
                      class="form-field"
                      prepend-inner-icon="mdi-file-document"
                      show-size
                      counter
                      :loading="isProcessingFile"
                    >
                      <template v-slot:selection="{ fileNames }">
                        <template v-for="fileName in fileNames" :key="fileName">
                          <v-chip
                            size="small"
                            label
                            variant="outlined"
                            color="primary"
                            class="me-2"
                          >
                            {{ fileName }}
                          </v-chip>
                        </template>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      v-model="formData.coverLetterFile"
                      label="Cover Letter (Optional)"
                      variant="outlined"
                      density="comfortable"
                      accept=".pdf,.doc,.docx"
                      class="form-field"
                      prepend-inner-icon="mdi-file-document-text"
                      show-size
                      counter
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.notes"
                      label="Notes"
                      variant="outlined"
                      density="comfortable"
                      rows="3"
                      placeholder="Add any additional notes about this candidate..."
                      class="form-field"
                      prepend-inner-icon="mdi-note-text"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="formData.tags"
                      label="Tags"
                      :items="tagOptions"
                      variant="outlined"
                      density="comfortable"
                      multiple
                      chips
                      closable-chips
                      clearable
                      class="form-field"
                      prepend-inner-icon="mdi-tag"
                      hint="Add tags to categorize the candidate"
                      persistent-hint
                    />
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>

      <!-- Enhanced Footer Actions -->
      <v-card-actions class="upload-actions pa-6">
        <div class="d-flex justify-space-between align-center w-100">
          <v-btn
            v-if="currentStep > 1"
            variant="outlined"
            @click="previousStep"
            :disabled="isUploading"
            class="nav-btn"
          >
            <v-icon start>mdi-chevron-left</v-icon>
            Previous
          </v-btn>
          <div v-else></div>

          <div class="d-flex gap-3">
            <v-btn
              variant="outlined"
              @click="closeDialog"
              :disabled="isUploading"
              class="cancel-btn"
            >
              Cancel
            </v-btn>

            <v-btn
              v-if="currentStep < steps.length"
              color="primary"
              variant="elevated"
              @click="nextStep"
              :disabled="!canProceedToNext"
              class="next-btn"
            >
              Next
              <v-icon end>mdi-chevron-right</v-icon>
            </v-btn>

            <v-btn
              v-else
              color="primary"
              variant="elevated"
              :loading="isUploading"
              :disabled="!canProceedToNext"
              @click="uploadCV"
              class="upload-submit-btn"
            >
              <v-icon start>mdi-upload</v-icon>
              Upload CV
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useCVLibraryStore } from '@/stores/cvLibrary'
import type { CV } from '@/stores/cvLibrary'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'cv-uploaded', cv: CV): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const cvLibraryStore = useCVLibraryStore()
const currentStep = ref(1)
const isUploading = ref(false)
const isProcessingFile = ref(false)

// Form refs
const basicForm = ref()
const skillsForm = ref()
const filesForm = ref()

// Form validation states
const isBasicFormValid = ref(false)
const isSkillsFormValid = ref(false)
const isFilesFormValid = ref(false)

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  experience: '',
  location: '',
  source: '',
  skills: [] as string[],
  status: '',
  appliedDate: new Date().toISOString().split('T')[0],
  resumeFile: null as File | null,
  coverLetterFile: null as File | null,
  notes: '',
  tags: [] as string[]
})

// Stepper configuration
const steps = [
  {
    title: 'Basic Info',
    rules: [() => isBasicFormValid.value]
  },
  {
    title: 'Skills & Status',
    rules: [() => isSkillsFormValid.value]
  },
  {
    title: 'Files & Notes',
    rules: [() => isFilesFormValid.value]
  }
]

// Options
const experienceOptions = [
  'Entry Level',
  'Junior',
  'Mid Level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Executive'
]

const sourceOptions = [
  'Career Site',
  'LinkedIn',
  'Indeed',
  'Glassdoor',
  'Referral',
  'Job Board',
  'Direct Application'
]

const statusOptions = [
  'New',
  'CV Selected',
  'Phone Evaluated',
  'Interview Scheduled',
  'Interview Completed',
  'Hired',
  'Rejected'
]

const skillOptions = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'PHP',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Kubernetes',
  'HTML',
  'CSS',
  'Git',
  'Agile',
  'Scrum'
]

const tagOptions = [
  'Frontend',
  'Backend',
  'Full-stack',
  'DevOps',
  'Mobile',
  'Data Science',
  'AI/ML',
  'Cloud',
  'Security',
  'Testing'
]

// Computed
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const canProceedToNext = computed(() => {
  switch (currentStep.value) {
    case 1:
      return isBasicFormValid.value
    case 2:
      return isSkillsFormValid.value
    case 3:
      return isFilesFormValid.value
    default:
      return false
  }
})

// Methods
const closeDialog = () => {
  dialogVisible.value = false
  resetForm()
}

const resetForm = () => {
  currentStep.value = 1
  formData.value = {
    name: '',
    email: '',
    phone: '',
    experience: '',
    location: '',
    source: '',
    skills: [],
    status: '',
    appliedDate: new Date().toISOString().split('T')[0],
    resumeFile: null,
    coverLetterFile: null,
    notes: '',
    tags: []
  }

  // Reset validation
  if (basicForm.value) basicForm.value.resetValidation()
  if (skillsForm.value) skillsForm.value.resetValidation()
  if (filesForm.value) filesForm.value.resetValidation()
}

const nextStep = async () => {
  // Validate current step before proceeding
  let isValid = false

  switch (currentStep.value) {
    case 1:
      isValid = await basicForm.value?.validate()
      break
    case 2:
      isValid = await skillsForm.value?.validate()
      break
    case 3:
      isValid = await filesForm.value?.validate()
      break
  }

  if (isValid && currentStep.value < steps.length) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const uploadCV = async () => {
  // Validate all forms
  const basicValid = await basicForm.value?.validate()
  const skillsValid = await skillsForm.value?.validate()
  const filesValid = await filesForm.value?.validate()

  if (!basicValid || !skillsValid || !filesValid) {
    return
  }

  isUploading.value = true
  isProcessingFile.value = true

  try {
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    isProcessingFile.value = false

    // Create CV data
    const cvData = {
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      experience: formData.value.experience,
      location: formData.value.location,
      source: formData.value.source,
      skills: formData.value.skills,
      status: formData.value.status,
      appliedDate: formData.value.appliedDate + 'T00:00:00Z',
      resume: formData.value.resumeFile?.name || 'resume.pdf',
      coverLetter: formData.value.coverLetterFile?.name || null,
      notes: formData.value.notes,
      tags: formData.value.tags,
      avatar: null
    }

    // Add CV to store
    const newCV = await cvLibraryStore.addCV(cvData)

    if (newCV) {
      emit('cv-uploaded', newCV)
      closeDialog()
    }
  } catch (error) {
    console.error('Upload failed:', error)
  } finally {
    isUploading.value = false
    isProcessingFile.value = false
  }
}

// Watch for dialog close to reset form
watch(dialogVisible, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})

// Watch for step changes to trigger validation
watch(currentStep, () => {
  // Trigger validation for current step
  nextTick(() => {
    switch (currentStep.value) {
      case 1:
        basicForm.value?.validate()
        break
      case 2:
        skillsForm.value?.validate()
        break
      case 3:
        filesForm.value?.validate()
        break
    }
  })
})
</script>

<style scoped>
.cv-upload-dialog {
  border-radius: 16px;
}

.upload-card {
  border-radius: 16px;
  overflow: hidden;
}

/* Header Styles */
.upload-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
}

.upload-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 16px;
  backdrop-filter: blur(10px);
}

.close-btn {
  color: white;
  position: absolute;
  top: 16px;
  right: 16px;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Stepper Styles */
.upload-stepper {
  background: transparent;
}

.stepper-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.stepper-item {
  padding: 16px 24px;
}

/* Step Content */
.step-content {
  min-height: 400px;
}

.step-header {
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.step-header h3 {
  color: #2c3e50;
}

/* Form Fields */
.form-field {
  border-radius: 12px;
}

.form-field :deep(.v-field) {
  border-radius: 12px;
}

.form-field :deep(.v-field__outline) {
  border-radius: 12px;
}

/* Actions */
.upload-actions {
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}

.nav-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
}

.cancel-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
}

.next-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
}

.upload-submit-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
}

.upload-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

/* Responsive Design */
@media (max-width: 600px) {
  .cv-upload-dialog {
    margin: 16px;
  }

  .upload-header {
    padding: 24px 16px;
  }

  .step-content {
    padding: 16px;
  }

  .upload-actions {
    padding: 24px 16px;
  }

  .stepper-item {
    padding: 12px 16px;
  }
}

/* Utility Classes */
.w-100 {
  width: 100%;
}

.gap-3 {
  gap: 12px;
}

.me-2 {
  margin-right: 8px;
}

/* Animation Classes */
.v-stepper-window-item {
  transition: all 0.3s ease;
}

.v-stepper-window-item--active {
  transform: translateX(0);
  opacity: 1;
}

.v-stepper-window-item--inactive {
  transform: translateX(20px);
  opacity: 0;
}

/* Focus States */
.form-field:focus-within {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Loading States */
.v-file-input--loading {
  opacity: 0.7;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .upload-submit-btn:hover,
  .form-field:focus-within {
    transform: none;
    transition: none;
  }
}
</style>
