<!-- FieldItem.vue -->
<template>
  <v-card class="mb-3" outlined>
    <v-card-text
      class="d-flex justify-space-between align-center"
      @click="isEditing = true"
      style="cursor: pointer;"
      v-if="!isEditing"
    >
      <div class="d-flex align-center">
        <!-- <v-img :src="dragIcon" width="20" class="mr-2" /> -->
        <v-img width="20" class="mr-2" />
        <span>
          {{ fieldData.label }}
          <span v-if="fieldData.required" class="text-red font-weight-bold">*</span>
        </span>
      </div>
      <div class="text-grey">{{ fieldData.type }}</div>
    </v-card-text>

    <v-expand-transition>
      <div v-if="isEditing" class="px-4 pb-4">
        <FieldEditor
          v-model:label="localField.label"
          v-model:required="localField.required"
          v-model:type="localField.type"
          @validate="onValidate"
          @cancel="onCancel"
          @delete="onDelete"
        />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FieldEditor from './FieldEditor.vue'

const props = defineProps<{
  field: {
    id: number
    label: string
    type: string
    required: boolean
    icon?: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:field', updated: typeof props.field): void
  (e: 'delete', id: number): void
}>()

const isEditing = ref(false)
//const dragIcon = new URL('@/assets/icons/drag.png', import.meta.url).href

const localField = ref({ ...props.field })
const fieldData = ref({ ...props.field })

const onValidate = () => {
  fieldData.value = { ...localField.value }
  emit('update:field', fieldData.value)
  isEditing.value = false
  console.log('✅ Field updated:', fieldData.value)
}

const onCancel = () => {
  isEditing.value = false
  localField.value = { ...fieldData.value }
}

const onDelete = () => {
  emit('delete', props.field.id)
}
</script>
