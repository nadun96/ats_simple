<template>
  <div class="activities-tab">
    <h3>Activities</h3>

    <!-- Input Section -->
    <div class="activity-input-box">
      <textarea
        v-model="commentText"
        placeholder="Write a comment..."
        rows="3"
        class="activity-textarea"
      ></textarea>

      <!-- Attached files preview -->
      <div class="attachments">
        <div
          v-for="(file, index) in attachedFiles"
          :key="index"
          class="file-tag"
        >
          {{ file.name }}
          <span class="remove" @click="removeAttachment(index)">×</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="actions">
        <div>
          <button @click="triggerFileUpload" class="icon-button">@</button>
          <button @click="triggerEmojiPicker" class="icon-button">😊</button>
          <button @click="triggerFileUpload" class="icon-button">📎</button>
        </div>

        <input
          type="file"
          ref="fileInput"
          multiple
          style="display: none"
          @change="handleFileChange"
        />
        <button @click="submitComment" class="send-button">Send</button>
      </div>
    </div>

    <!-- Activity List -->
    <div class="activity-feed">
      <ActivityCommentItem
        v-for="(item, index) in activityList"
        :key="index"
        :comment="item"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ActivityCommentItem from './ActivityCommentItem.vue'
defineOptions({ name: 'ActivitiesTab' }) // Optional but good for debugging

// Reactive state
const commentText = ref('')
const attachedFiles = ref([])
const fileInput = ref(null)

const activityList = ref([
  {
    user: 'Shamika',
    action: 'joined recruiting',
    date: 'Jul 12, 2025',
  },
  {
    user: 'Nadun',
    action: 'created the recruitment',
    date: 'Jul 12, 2025',
  },
])

// Methods
const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  attachedFiles.value.push(...files)
  event.target.value = null // Reset file input
}

const removeAttachment = (index) => {
  attachedFiles.value.splice(index, 1)
}

const triggerEmojiPicker = () => {
  alert('Emoji picker not implemented.')
}

const submitComment = () => {
  if (!commentText.value.trim()) return

  const newComment = {
    user: 'You',
    action: commentText.value,
    date: new Date().toDateString(),
    attachments: attachedFiles.value.map((f) => f.name),
  }

  activityList.value.unshift(newComment)
  commentText.value = ''
  attachedFiles.value = []
}
</script>

<style scoped>
.activities-tab {
  padding: 20px;
}
.activity-input-box {
  background: #f9fbfd;
  border: 1px solid #d9e2ec;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.activity-textarea {
  width: 100%;
  resize: none;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #cbd5e1;
}
.attachments {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.file-tag {
  background-color: #e2e8f0;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  display: flex;
  align-items: center;
}
.file-tag .remove {
  margin-left: 8px;
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.icon-button {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-right: 15px;
}
.send-button {
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.activity-feed {
  margin-top: 20px;
}
</style>
