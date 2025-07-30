<!-- FieldList.vue -->
<template>
  <div>
    <FieldItem
      v-for="field in fields"
      :key="field.id"
      :field="field"
      @update:field="updateField"
      @delete="deleteField"
    />

    <div v-if="addingNew" class="my-4">
      <FieldEditor
        v-model:label="newField.label"
        v-model:required="newField.required"
        v-model:type="newField.type"
        @validate="addField"
        @cancel="cancelAdd"
      />
    </div>

    <v-btn
      v-if="!addingNew"
      class="mt-2"
      color="primary"
      @click="showAddEditor"
    >
      + Add Question
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FieldItem from './FieldItem.vue'
import FieldEditor from './FieldEditor.vue'

interface Field {
  id: number
  label: string
  type: string
  required: boolean
  icon?: string
}

const fields = ref<Field[]>([])
const addingNew = ref(false)

const newField = ref<Omit<Field, 'id'>>({
  label: '',
  type: 'short_text',
  required: false,
})

let idCounter = 1

const showAddEditor = () => {
  addingNew.value = true
  newField.value = {
    label: '',
    type: 'short_text',
    required: false,
  }
}

const addField = () => {
  fields.value.push({
    id: idCounter++,
    ...newField.value,
  })
  addingNew.value = false
}

const cancelAdd = () => {
  addingNew.value = false
}

const updateField = (updatedField: Field) => {
  const index = fields.value.findIndex(f => f.id === updatedField.id)
  if (index !== -1) {
    fields.value[index] = { ...updatedField }
  }
}

const deleteField = (id: number) => {
  fields.value = fields.value.filter(f => f.id !== id)
}
</script>
