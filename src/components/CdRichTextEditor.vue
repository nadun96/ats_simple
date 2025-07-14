<template>
  <label>
    {{ label }}
    <span v-if="required" class="required-indicator">*</span>
  </label>
  <QuillEditor theme="snow" toolbar="essential" style="height: 300px" />
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { defineProps } from 'vue'

defineProps<{
  label?: string
  required?: boolean
}>()
</script>

<style scoped>
.required-indicator {
  color: #d32f2f;
}
</style>
