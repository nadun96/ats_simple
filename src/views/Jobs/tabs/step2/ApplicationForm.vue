<template>
  <v-container>
    <!-- Form Header Section -->
    <div class="mb-6">
      <h2 class="text-h5 font-weight-bold mb-3">Creating the application form</h2>
      <p class="text-body-1 text-grey-darken-1 mb-4">
        Choose which fields you want to display on the application form and make them mandatory or not depending on your needs and preferences.
      </p>
    </div>

    <!-- Simplified Application Toggle -->
    <v-card variant="outlined" class="mb-6 pa-4">
      <v-row align="center">
        <v-col cols="1">
          <v-icon icon="mdi-rocket-launch" color="primary" size="large" />
        </v-col>
        <v-col cols="8">
          <div>
            <div class="text-subtitle-1 font-weight-medium">Simplified application</div>
            <div class="text-caption text-grey-darken-1">
              Candidates simply submit their CV and we collect the contact information (last name, first name, telephone and e-mail)
            </div>
          </div>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-switch
            v-model="simplifiedApplication"
            color="primary"
            hide-details
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- Form Template Selection -->
    <div class="mb-4">
      <CdDropdown
        label="Classic Form Template"
        :options="templateOptions"
        v-model="selectedTemplate"
        class="mb-4"
      />
    </div>

    <!-- Tips Section -->
    <v-card variant="outlined" class="mb-6 pa-3" color="amber-lighten-5">
      <div class="d-flex align-start">
        <v-icon icon="mdi-lightbulb" color="amber-darken-2" class="mr-3 mt-1" />
        <div>
          <div class="text-subtitle-2 font-weight-medium text-amber-darken-2 mb-1">Tips</div>
          <div class="text-body-2">
            <strong>Disqualifying answer:</strong>
            <span class="text-grey-darken-1">
              Never use this answer and mark it as less favourite answers! with a
              <span class="text-primary cursor-pointer">Hey, Find out more</span>
            </span>
          </div>
          <div class="text-body-2 mt-2">
            <strong>Build your form:</strong>
            <span class="text-grey-darken-1">
              The fewer the questions, the more applications. Prefer closed questions to facilitate decision-making.
            </span>
          </div>
        </div>
      </div>
    </v-card>

        <!-- Form Fields List -->
    <div class="mb-6">
      <v-list class="pa-0">
        <v-list-item
          v-for="(field, index) in formFields"
          :key="field.id"
          class="pa-4 mb-2 position-relative"
          :class="[
            field.enabled ? 'bg-grey-lighten-5' : 'bg-grey-lighten-3',
            draggedIndex === index ? 'dragging' : '',
            dragOverIndex === index ? 'drag-over' : ''
          ]"
          draggable="true"
          @dragstart="(event: DragEvent) => handleDragStart(index, event)"
          @dragover.prevent="(event: DragEvent) => handleDragOver(index, event)"
          @dragenter.prevent="handleDragEnter(index)"
          @dragleave="handleDragLeave"
          @drop.prevent="(event: DragEvent) => handleDrop(index, event)"
          @dragend="handleDragEnd"
        >
          <template #prepend>
            <v-icon
              icon="mdi-drag-vertical"
              class="mr-3 text-grey drag-handle"
              style="cursor: grab;"
            />
          </template>

          <v-list-item-title>
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <span class="mr-2">{{ field.label }}</span>
                <v-chip
                  v-if="field.required"
                  size="x-small"
                  color="error"
                  variant="outlined"
                >
                  *
                </v-chip>
                <v-chip
                  v-else
                  size="x-small"
                  color="info"
                  variant="outlined"
                  class="ml-2"
                >
                  Optional
                </v-chip>
              </div>

              <div class="d-flex align-center">
                <v-btn
                  v-if="field.type === 'dropdown' || field.customizable"
                  icon="mdi-cog"
                  size="small"
                  variant="text"
                  @click="editField(index)"
                  class="mr-2"
                />
                <v-switch
                  v-model="field.enabled"
                  color="primary"
                  hide-details
                  density="compact"
                />
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>

    <!-- Custom Questions Section -->
    <div class="mb-6">
      <div class="d-flex align-center justify-space-between mb-4">
        <h3 class="text-h6 font-weight-medium">Custom Questions</h3>
        <CdButton
          text="Add a question"
          prepend-icon="mdi-plus"
          variant="outlined"
          @click="addCustomQuestion"
        />
      </div>

      <!-- Custom Questions List -->
      <div v-if="customQuestions.length > 0">
        <v-card
          v-for="(question, index) in customQuestions"
          :key="question.id"
          variant="outlined"
          class="mb-4 pa-4"
        >
          <v-row>
            <v-col cols="8">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Question
              </div>
              <div class="text-body-1 mb-3">{{ question.question }}</div>

              <div class="text-subtitle-2 mb-2">
                <span class="text-primary">Linked property: {{ question.linkedProperty }}</span>
                <v-btn icon="mdi-pencil" size="x-small" variant="text" class="ml-2" @click="editQuestion(index)" />
              </div>

              <v-checkbox
                v-model="question.required"
                label="Required"
                color="primary"
                hide-details
                density="compact"
                class="mt-2"
              />

              <div class="text-subtitle-1 font-weight-medium mt-4 mb-2">Answer type</div>
              <CdDropdown
                :options="answerTypeOptions"
                v-model="question.answerType"
                class="mb-3"
              />

              <div class="text-subtitle-1 font-weight-medium mb-2">Reply</div>
              <div v-if="question.answerType === 'single_choice'">
                <v-card variant="outlined" class="pa-3">
                  <div v-for="(option, optIndex) in question.options" :key="optIndex" class="mb-2">
                    <div class="d-flex align-center">
                      <v-radio
                        :value="optIndex"
                        disabled
                        hide-details
                        density="compact"
                        class="mr-3"
                      />
                      <span>{{ option }}</span>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-col>
            <v-col cols="4" class="text-right">
              <v-btn
                icon="mdi-delete"
                color="error"
                variant="outlined"
                size="small"
                @click="deleteQuestion(index)"
              />
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>

    <!-- Question Editor Dialog -->
    <v-dialog v-model="questionDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          {{ editingQuestionIndex !== -1 ? 'Edit Question' : 'Add Question' }}
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <CdTextInput
                  label="Question"
                  v-model="currentQuestion.question"
                  :required="true"
                  placeholder="Enter your question"
                />
              </v-col>
              <v-col cols="12">
                <CdTextInput
                  label="Linked Property"
                  v-model="currentQuestion.linkedProperty"
                  placeholder="e.g., Salary • Experience"
                />
              </v-col>
              <v-col cols="12">
                <CdDropdown
                  label="Answer Type"
                  :options="answerTypeOptions"
                  v-model="currentQuestion.answerType"
                />
              </v-col>
              <v-col cols="12" v-if="currentQuestion.answerType === 'single_choice'">
                <div class="text-subtitle-2 mb-2">Options (one per line)</div>
                <v-textarea
                  v-model="optionsText"
                  placeholder="5 000 to 10 000 € gross annual&#10;10 000 to 15 000 € gross annual&#10;15 000 to 20 000 € gross annual"
                  rows="5"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="currentQuestion.required"
                  label="Required question"
                  color="primary"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <CdButton text="Cancel" @click="closeQuestionDialog" />
          <CdButton text="Validate" @click="saveQuestion" variant="elevated" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CdButton, CdTextInput, CdDropdown } from '@/components/atoms'

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'file' | 'dropdown'
  required: boolean
  enabled: boolean
  customizable?: boolean
}

interface CustomQuestion {
  id: string
  question: string
  linkedProperty: string
  answerType: string
  required: boolean
  options?: string[]
}

// Form configuration
const simplifiedApplication = ref(false)
const selectedTemplate = ref('classic')

// Predefined form fields
const formFields = ref<FormField[]>([
  {
    id: 'fullname',
    label: 'Fullname',
    type: 'text',
    required: true,
    enabled: true
  },
  {
    id: 'email',
    label: 'E-mail',
    type: 'email',
    required: true,
    enabled: true
  },
  {
    id: 'phone',
    label: 'Phone number',
    type: 'tel',
    required: true,
    enabled: true
  },
  {
    id: 'social_links',
    label: 'Social links',
    type: 'text',
    required: false,
    enabled: false
  },
  {
    id: 'cover_text',
    label: 'Cover text',
    type: 'textarea',
    required: false,
    enabled: false
  },
  {
    id: 'resume',
    label: 'Resume',
    type: 'file',
    required: true,
    enabled: true
  },
  {
    id: 'education_level',
    label: 'Your education level',
    type: 'dropdown',
    required: false,
    enabled: false,
    customizable: true
  },
  {
    id: 'availability',
    label: 'Your availability',
    type: 'dropdown',
    required: false,
    enabled: false,
    customizable: true
  }
])

// Custom questions
const customQuestions = ref<CustomQuestion[]>([
  {
    id: 'salary_question',
    question: 'Salary wanted (per year)',
    linkedProperty: 'Salary • Edit',
    answerType: 'single_choice',
    required: false,
    options: [
      '5 000 to 10 000 € gross annual',
      '10 000 to 15 000 € gross annual',
      '15 000 to 20 000 € gross annual',
      '20 000 to 25 000 € gross annual',
      '25 000 to 30 000 € gross annual'
    ]
  }
])

// Dialog states
const questionDialog = ref(false)
const editingQuestionIndex = ref(-1)
const optionsText = ref('')

// Drag and drop states
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

// Current question being edited
const currentQuestion = ref<CustomQuestion>({
  id: '',
  question: '',
  linkedProperty: '',
  answerType: 'single_choice',
  required: false,
  options: []
})

// Options for dropdowns
const templateOptions = [
  { value: 'classic', displayValue: 'Classic Form Template' },
  { value: 'modern', displayValue: 'Modern Form Template' },
  { value: 'minimal', displayValue: 'Minimal Form Template' }
]

const answerTypeOptions = [
  { value: 'single_choice', displayValue: 'Single choice drop-down menu' },
  { value: 'multiple_choice', displayValue: 'Multiple choice' },
  { value: 'text', displayValue: 'Text input' },
  { value: 'textarea', displayValue: 'Long text' },
  { value: 'number', displayValue: 'Number' },
  { value: 'date', displayValue: 'Date' }
]

let questionIdCounter = 1

// Methods
const editField = (index: number) => {
  const field = formFields.value[index]
  console.log('Editing field:', field.label)
  // TODO: Implement field editing dialog for customizable fields
}

const addCustomQuestion = () => {
  currentQuestion.value = {
    id: `question_${questionIdCounter++}`,
    question: '',
    linkedProperty: '',
    answerType: 'single_choice',
    required: false,
    options: []
  }
  editingQuestionIndex.value = -1
  optionsText.value = ''
  questionDialog.value = true
}

const editQuestion = (index: number) => {
  editingQuestionIndex.value = index
  currentQuestion.value = { ...customQuestions.value[index] }

  if (currentQuestion.value.options) {
    optionsText.value = currentQuestion.value.options.join('\n')
  }

  questionDialog.value = true
}

const deleteQuestion = (index: number) => {
  customQuestions.value.splice(index, 1)
}

const saveQuestion = () => {
  if (!currentQuestion.value.question.trim()) {
    alert('Please enter a question')
    return
  }

  // Process options for single_choice
  if (currentQuestion.value.answerType === 'single_choice') {
    const options = optionsText.value
      .split('\n')
      .map(opt => opt.trim())
      .filter(opt => opt.length > 0)
    currentQuestion.value.options = options
  }

  if (editingQuestionIndex.value !== -1) {
    customQuestions.value[editingQuestionIndex.value] = { ...currentQuestion.value }
  } else {
    customQuestions.value.push({ ...currentQuestion.value })
  }

  closeQuestionDialog()
}

const closeQuestionDialog = () => {
  questionDialog.value = false
  editingQuestionIndex.value = -1
  optionsText.value = ''
}

// Drag and Drop Methods
const handleDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', index.toString())
  }
}

const handleDragOver = (index: number, event: DragEvent) => {
  event.preventDefault()
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    dragOverIndex.value = index
  }
}

const handleDragEnter = (index: number) => {
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    dragOverIndex.value = index
  }
}

const handleDragLeave = () => {
  dragOverIndex.value = null
}

const handleDrop = (dropIndex: number, event: DragEvent) => {
  event.preventDefault()

  if (draggedIndex.value !== null && draggedIndex.value !== dropIndex) {
    const draggedItem = formFields.value[draggedIndex.value]

    // Remove the dragged item from its original position
    formFields.value.splice(draggedIndex.value, 1)

    // Insert the dragged item at the new position
    const newIndex = draggedIndex.value < dropIndex ? dropIndex - 1 : dropIndex
    formFields.value.splice(newIndex, 0, draggedItem)
  }

  // Reset drag states
  draggedIndex.value = null
  dragOverIndex.value = null
}

const handleDragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}
</script>

<style scoped>
.drag-handle:hover {
  color: #1976d2 !important;
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.dragging {
  opacity: 0.5;
  transform: rotate(2deg);
  transition: transform 0.2s ease;
}

.drag-over {
  border: 2px dashed #1976d2 !important;
  background-color: rgba(25, 118, 210, 0.1) !important;
}

.v-list-item {
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.v-list-item:hover .drag-handle {
  color: #1976d2;
}
.border {
  border: 1px solid #e0e0e0;
}
</style>
