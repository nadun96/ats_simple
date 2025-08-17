<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <span class="text-h5 font-weight-bold">Upload New CV</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="closeDialog"
        />
      </v-card-title>

      <v-card-text class="pa-6 pt-0">
        <v-form ref="form" v-model="isFormValid">
          <!-- Basic Information -->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.name"
                label="Full Name *"
                variant="outlined"
                density="comfortable"
                :rules="[v => !!v || 'Name is required']"
                required
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
              />
            </v-col>
          </v-row>

          <!-- Skills -->
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
              />
            </v-col>
          </v-row>

          <!-- Status -->
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
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.appliedDate"
                label="Applied Date"
                type="date"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <!-- File Upload -->
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
                prepend-icon="mdi-file-document"
                show-size
                counter
              >
                <template v-slot:selection="{ fileNames }">
                  <template v-for="fileName in fileNames" :key="fileName">
                    <v-chip
                      size="small"
                      label
                      variant="outlined"
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
                prepend-icon="mdi-file-document-text"
                show-size
                counter
              />
            </v-col>
          </v-row>

          <!-- Notes -->
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="formData.notes"
                label="Notes"
                variant="outlined"
                density="comfortable"
                rows="3"
                placeholder="Add any additional notes about this candidate..."
              />
            </v-col>
          </v-row>

          <!-- Tags -->
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
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :loading="isUploading"
          :disabled="!isFormValid"
          @click="uploadCV"
        >
          Upload CV
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
const form = ref()
const isFormValid = ref(false)
const isUploading = ref(false)

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

// Methods
const closeDialog = () => {
  dialogVisible.value = false
  resetForm()
}

const resetForm = () => {
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

  if (form.value) {
    form.value.resetValidation()
  }
}

const uploadCV = async () => {
  if (!form.value?.validate()) return

  isUploading.value = true

  try {
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 1000))

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
      tags: formData.value.tags
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
  }
}

// Watch for dialog close to reset form
watch(dialogVisible, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>

<style scoped>
.me-2 {
  margin-right: 8px;
}
</style>
