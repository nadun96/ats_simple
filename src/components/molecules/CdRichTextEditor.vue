<template>
  <div class="mb-1">
    <CdLabel v-if="label" :label="label" :required="required" />
  </div>
  <QuillEditor
    theme="snow"
    toolbar="essential"
    style="height: 300px"
    :rules="rules"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { defineProps } from 'vue'
import { CdLabel } from '../atoms'

defineProps<{
  label?: string
  required?: boolean
  rules?: Array<(value: string) => boolean | string>
}>()
</script>
