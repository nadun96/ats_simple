<template>
  <div>
    <label>
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <div class="custom-file-container" :data-upload-id="dropzoneId"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Events, FileUploadWithPreview, type ImageAddedEvent } from 'file-upload-with-preview'
import 'file-upload-with-preview/dist/style.css'

const props = defineProps<{ dropzoneId: string; label?: string; required?: boolean }>()

onMounted(() => {
  new FileUploadWithPreview(props.dropzoneId)
})

window.addEventListener(Events.IMAGE_ADDED, (e: Event) => {
  const { detail } = e as unknown as ImageAddedEvent

  console.log('detail', detail)
})
</script>

<style>
.custom-file-container {
  border: 2px dashed #b0c4de;
  border-radius: 10px;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
}
.custom-file-container .input-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0;
}
.custom-file-container .label-container {
  position: absolute;
  margin: 5px;
  top: 0;
  right: 0;
  z-index: 10;
  background-color: #d32f2f;

  border-radius: 5px;
}

.custom-file-container .label-container label {
  display: none;
}

.custom-file-container .label-container a {
  color: white;
  display: block;
}

.custom-file-container .clear-button {
  height: auto;
}

.custom-file-container .image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.required-indicator {
  color: #d32f2f;
}
</style>
