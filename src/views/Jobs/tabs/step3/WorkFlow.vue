<template>
  <v-container>
    <CdButton text="Add New" @click="handleAddWorkflow" />
  </v-container>

  <WorkflowCard
    v-for="(item, index) in workflowItems"
    :key="index"
    :item="item"
    :order="index + 1"
    @delete="handleDeleteWorkflow"
    @rename="handleRenameWorkflow"
    @add-action="openAddActionDialog"
    @move="handleMove"
  />
  <div class="wizard-actions d-flex justify-space-between">
    <v-btn @click="$emit('prev')" variant="outlined" color="primary"
      >Previous</v-btn
    >
    <v-btn @click="$emit('next')" color="primary">Next</v-btn>
  </div>
  <v-dialog v-model="renameDialogVisible" persistent max-width="400px">
    <v-card>
      <v-card-title>Rename the step</v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-col>
          <CdTextInput label="Step name" :required="true" v-model="newTitle" />
        </v-col>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <CdButton text="Cancel" @click="renameDialogVisible = false" />
          <CdButton text="Save" variant="elevated" @click="applyRename" />
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
  <!-- Add Action Dialog -->
  <v-dialog v-model="addActionDialogVisible" persistent max-width="520px">
    <v-card>
      <v-card-title class="text-h6">Add a scheduled action</v-card-title>
      <v-divider />
      <v-card-text>
        <div class="text-body-2 mb-2">
          It is triggered each time a candidate arrives in the defined step.
        </div>
        <v-list density="comfortable">
          <v-list-subheader>Contact</v-list-subheader>
          <v-list-item
            v-for="option in actionOptions.contact"
            :key="option.type"
            :prepend-icon="option.icon"
            :title="option.label"
            @click="selectAction(option)"
          />
          <v-list-subheader>Quality</v-list-subheader>
          <v-list-item
            v-for="option in actionOptions.quality"
            :key="option.type"
            :prepend-icon="option.icon"
            :title="option.label"
            @click="selectAction(option)"
          />
        </v-list>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="addActionDialogVisible = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Configure Email Action Dialog -->
  <v-dialog v-model="emailConfigDialogVisible" persistent max-width="720px">
    <v-card>
      <v-card-title class="text-h6">Send an email</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CdDropdown label="When the candidate arrives in the step" :options="stepOptions" v-model="emailForm.stepId" />
          </v-col>
          <v-col cols="12">
            <CdDropdown label="Sender" :options="senderOptions" v-model="emailForm.senderId" />
          </v-col>
          <v-col cols="12">
            <CdTextInput label="Subject" v-model="emailForm.subject" :required="true" />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="emailForm.body" label="E-mail" rows="8" variant="outlined" />
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="emailAttachments"
              label="Attachments (PDF, DOC, DOCX)"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              multiple
              prepend-icon="mdi-paperclip"
            />
          </v-col>
          <v-col cols="12">
            <CdDropdown label="Delay before sending" :options="delayOptions" v-model="emailForm.delay" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <CdButton text="Cancel" @click="emailConfigDialogVisible = false" />
        <CdButton text="Save" variant="elevated" @click="saveEmailConfig" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Configure SMS Action Dialog -->
  <v-dialog v-model="smsConfigDialogVisible" persistent max-width="720px">
    <v-card>
      <v-card-title class="text-h6">Send an SMS</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CdDropdown label="When the candidate arrives in the step" :options="stepOptions" v-model="smsForm.stepId" />
          </v-col>
          <v-col cols="12">
            <CdDropdown label="Sender" :options="senderOptions" v-model="smsForm.senderId" />
          </v-col>
          <v-col cols="12">
            <CdTextInput label="Subject (optional)" v-model="smsForm.subject" />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="smsForm.body" label="Message" rows="6" variant="outlined" />
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="smsAttachments"
              label="Attachments (PDF, DOC, DOCX)"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              multiple
              prepend-icon="mdi-paperclip"
            />
          </v-col>
          <v-col cols="12">
            <CdDropdown label="Delay before sending" :options="delayOptions" v-model="smsForm.delay" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <CdButton text="Cancel" @click="smsConfigDialogVisible = false" />
        <CdButton text="Save" variant="elevated" @click="saveSmsConfig" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Configure Video Interview Action Dialog -->
  <v-dialog v-model="videoConfigDialogVisible" persistent max-width="840px">
    <v-card>
      <v-card-title class="text-h6">Send a pre-recorded video interview</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <CdDropdown label="When the candidate arrives in the step" :options="stepOptions" v-model="videoForm.stepId" />
          </v-col>
          <v-col cols="12" md="6">
            <CdDropdown label="Delay before sending" :options="delayOptions" v-model="videoForm.delay" />
          </v-col>
          <v-col cols="12">
            <CdTextInput label="Title" v-model="videoForm.title" />
          </v-col>
          <v-col cols="12">
            <div class="mb-2">Record a video</div>
            <div class="d-flex align-center ga-3">
              <v-btn color="primary" :disabled="isRecording" @click="startRecording">
                <v-icon start>mdi-record-rec</v-icon> Record
              </v-btn>
              <v-btn color="error" :disabled="!isRecording" @click="stopRecording">
                <v-icon start>mdi-stop</v-icon> Stop
              </v-btn>
              <v-btn :disabled="!videoURL" @click="reRecord">
                <v-icon start>mdi-restart</v-icon> Re-record
              </v-btn>
            </div>
            <video v-if="videoURL" :src="videoURL" class="mt-3 w-100" controls></video>
            <div v-else class="text-caption mt-3">No recording yet.</div>
          </v-col>
          <v-col cols="12">
            <v-divider class="my-4" />
            <div class="mb-2">Or upload a pre-recorded video file</div>
            <v-file-input v-model="videoFile" label="Upload video" accept="video/*" prepend-icon="mdi-video" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <CdButton text="Cancel" @click="cancelVideo" />
        <CdButton text="Save" variant="elevated" :disabled="!videoURL && !videoFile" @click="saveVideoConfig" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Configure Request Evaluation Action Dialog -->
  <v-dialog v-model="evaluationConfigDialogVisible" persistent max-width="840px">
    <v-card>
      <v-card-title class="text-h6">Request an evaluation</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <CdDropdown label="Step" :options="stepOptions" v-model="evaluationForm.stepId" />
          </v-col>
          <v-col cols="12" md="6">
            <CdTextInput label="Meeting link" v-model="evaluationForm.meetingLink" />
          </v-col>
          <v-col cols="12">
            <CdTextInput label="Interview panel (emails, comma-separated)" v-model="panelString" />
          </v-col>
          <v-col cols="12" md="6">
            <CdTextInput label="Candidate email subject" v-model="evaluationForm.candidateEmailSubject" />
            <v-textarea label="Candidate email body" v-model="evaluationForm.candidateEmailBody" rows="6" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <CdTextInput label="Panel email subject" v-model="evaluationForm.panelEmailSubject" />
            <v-textarea label="Panel email body" v-model="evaluationForm.panelEmailBody" rows="6" variant="outlined" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <CdButton text="Cancel" @click="evaluationConfigDialogVisible = false" />
        <CdButton text="Save" variant="elevated" @click="saveEvaluationConfig" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { CdButton, CdTextInput, CdDropdown } from '@/components/atoms'
import type { WorkflowItem, WorkflowAction, WorkflowActionType } from '@/types/interfaces/work-flow-types'
import { ref, computed, reactive } from 'vue'
import WorkflowCard from '../components/WorkflowCard.vue'
const renameDialogVisible = ref(false)
const renameTarget = ref<{ id: number; title: string } | null>(null)
const newTitle = ref('')

let idCounter = 1
let actionIdCounter = 1

const addActionDialogVisible = ref(false)
const addActionTargetStepId = ref<number | null>(null)
const emailConfigDialogVisible = ref(false)
const smsConfigDialogVisible = ref(false)
const videoConfigDialogVisible = ref(false)

const workflowItems = ref<WorkflowItem[]>([
  {
    id: idCounter++,
    title: 'Workflow 1',
    mainAction: () => console.log('Action for Workflow 1'),
    actions: [],
    dropDownActions: [
      { icon: 'mdi-pencil', actionName: 'Rename' },
      { icon: 'mdi-delete', actionName: 'Delete' },
      { icon: 'mdi-arrow-up', actionName: 'Move Up' },
      { icon: 'mdi-arrow-down', actionName: 'Move Down' },
    ],
  },
  {
    id: idCounter++,
    title: 'Workflow 2',
    mainAction: () => console.log('Action for Workflow 2'),
    actions: [],
    dropDownActions: [
      {
        icon: 'mdi-pencil',
        actionName: 'Rename',
        action: () => console.log('Rename Workflow 2'),
      },
      {
        icon: 'mdi-delete',
        actionName: 'Delete',
        action: () => console.log('Delete Workflow 2'),
      },
      { icon: 'mdi-arrow-up', actionName: 'Move Up' },
      { icon: 'mdi-arrow-down', actionName: 'Move Down' },
    ],
  },
])

const handleAddWorkflow = () => {
  const id = idCounter++
  workflowItems.value.push({
    id,
    title: `New Workflow`,
    mainAction: () => console.log(`Main action for Workflow ${id}`),
    actions: [],
    dropDownActions: [
      {
        icon: 'mdi-pencil',
        actionName: 'Rename',
        action: () => console.log(`Rename Workflow ${id}`),
      },
      {
        icon: 'mdi-delete',
        actionName: 'Delete',
      },
      { icon: 'mdi-arrow-up', actionName: 'Move Up' },
      { icon: 'mdi-arrow-down', actionName: 'Move Down' },
    ],
  })
}

const handleDeleteWorkflow = (id: number) => {
  workflowItems.value = workflowItems.value.filter((item) => item.id !== id)
}

const handleRenameWorkflow = (payload: { id: number; title: string }) => {
  renameTarget.value = payload
  newTitle.value = payload.title
  renameDialogVisible.value = true
}

const applyRename = () => {
  if (renameTarget.value) {
    const item = workflowItems.value.find((i) => i.id === renameTarget.value?.id)
    if (item) {
      item.title = newTitle.value
    }
  }
  renameDialogVisible.value = false
}

const handleMove = (payload: { id: number; direction: 'up' | 'down' }) => {
  const currentIndex = workflowItems.value.findIndex((i) => i.id === payload.id)
  if (currentIndex === -1) return
  const targetIndex = payload.direction === 'up' ? currentIndex - 1 : currentIndex + 1
  if (targetIndex < 0 || targetIndex >= workflowItems.value.length) return
  const list = workflowItems.value
  const [moved] = list.splice(currentIndex, 1)
  list.splice(targetIndex, 0, moved)
}

// Add Action support
const actionOptions: Record<'contact' | 'quality', { type: WorkflowActionType; label: string; icon: string }[]> = {
  contact: [
    { type: 'email', label: 'Send an e-mail', icon: 'mdi-email' },
    { type: 'sms', label: 'Send an SMS', icon: 'mdi-message-text' },
  ],
  quality: [
    { type: 'add_tag', label: 'Add a tag', icon: 'mdi-tag-plus-outline' },
    { type: 'update_property', label: 'Update a property', icon: 'mdi-cog-outline' },
    { type: 'video_interview', label: 'Send a pre-recorded video interview', icon: 'mdi-video-outline' },
    { type: 'request_evaluation', label: 'Request an evaluation', icon: 'mdi-star-outline' },
    { type: 'associate_pool', label: 'Associate with a pool', icon: 'mdi-pool' },
  ],
}

const openAddActionDialog = (stepId: number) => {
  addActionTargetStepId.value = stepId
  addActionDialogVisible.value = true
}

const selectAction = (option: { type: WorkflowActionType; label: string; icon: string }) => {
  if (addActionTargetStepId.value == null) return
  const item = workflowItems.value.find((i) => i.id === addActionTargetStepId.value)
  if (!item) return
  const newAction: WorkflowAction = {
    id: actionIdCounter++,
    type: option.type,
    label: option.label,
    icon: option.icon,
  }
  if (!item.actions) item.actions = []
  item.actions.push(newAction)
  addActionDialogVisible.value = false
  if (option.type === 'email') {
    // Preselect form values
    emailForm.stepId = addActionTargetStepId.value
    emailConfigDialogVisible.value = true
  } else if (option.type === 'sms') {
    smsForm.stepId = addActionTargetStepId.value
    smsConfigDialogVisible.value = true
  } else if (option.type === 'video_interview') {
    videoForm.stepId = addActionTargetStepId.value
    videoConfigDialogVisible.value = true
  } else if (option.type === 'request_evaluation') {
    evaluationForm.stepId = addActionTargetStepId.value
    evaluationConfigDialogVisible.value = true
  }
}

// Email config form state
const stepOptions = computed(() => workflowItems.value.map((s) => ({ value: s.id, displayValue: s.title })))
const senderOptions = [
  { value: 'me', displayValue: 'Me' },
  { value: 'hr', displayValue: 'HR Team' },
]
const delayOptions = [
  { value: '10m', displayValue: '10 minutes' },
  { value: '1h', displayValue: '1 hour' },
  { value: '1d', displayValue: '1 day' },
]

const emailForm = reactive({ stepId: 0 as number, senderId: 'me' as string, subject: '', body: '', delay: '10m' as string })
const emailAttachments = ref<File[] | null>(null)

const saveEmailConfig = () => {
  // Persist on the action if needed later; for now, we just close the dialog
  emailConfigDialogVisible.value = false
}

// SMS config
const smsForm = reactive({ stepId: 0 as number, senderId: 'me' as string, subject: '', body: '', delay: '10m' as string })
const smsAttachments = ref<File[] | null>(null)
const saveSmsConfig = () => {
  smsConfigDialogVisible.value = false
}

// Video config + recording
const videoForm = reactive({ stepId: 0 as number, title: '', delay: '10m' as string })
const isRecording = ref(false)
let mediaStream: MediaStream | null = null
let mediaRecorder: MediaRecorder | null = null
let recordedChunks: BlobPart[] = []
const videoURL = ref<string | null>(null)
const videoFile = ref<File | null>(null)

const startRecording = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    recordedChunks = []
    mediaRecorder = new MediaRecorder(mediaStream)
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data)
    }
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      videoURL.value = URL.createObjectURL(blob)
      if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop())
      mediaStream = null
    }
    mediaRecorder.start()
    isRecording.value = true
  } catch (err) {
    console.error('Recording error', err)
  }
}

const stopRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop()
    isRecording.value = false
  }
}

const reRecord = () => {
  videoURL.value = null
}

const cancelVideo = () => {
  if (isRecording.value) stopRecording()
  videoConfigDialogVisible.value = false
}

const saveVideoConfig = () => {
  videoConfigDialogVisible.value = false
}

// Request Evaluation dialog
const evaluationConfigDialogVisible = ref(false)
const evaluationForm = reactive({
  stepId: 0 as number,
  interviewPanel: [] as string[],
  meetingLink: '',
  candidateEmailSubject: '',
  candidateEmailBody: '',
  panelEmailSubject: '',
  panelEmailBody: '',
})

const saveEvaluationConfig = () => {
  evaluationForm.interviewPanel = panelString
    .split(',')
    .map((s) => s.trim())
    .filter((s) => !!s)
  evaluationConfigDialogVisible.value = false
}

const panelString = ref('')
</script>

<style scoped>
.main-container {
  background: #f7f9fc;
  padding-inline: 10px;
  border-radius: 5px;
  margin-block: 10px;
}
.title-container {
  display: flex;
  align-items: center;
}
.action-container {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;
}
.menu-icon {
  height: 30px;
}
</style>
