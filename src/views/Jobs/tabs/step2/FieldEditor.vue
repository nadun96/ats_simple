<!-- FieldEditor.vue -->
<template>
  <v-card flat>
    <v-text-field
      v-model="label"
      label="Question"
      variant="outlined"
      density="compact"
      class="mb-3"
    />

    <v-checkbox
      v-model="required"
      label="Required"
      class="mb-3"
    />

    <v-select
      v-model="type"
      :items="answerTypes"
      label="Answer type"
      variant="outlined"
      density="compact"
      class="mb-4"
    />

    <div class="d-flex justify-space-between align-center">
      <v-btn variant="text" color="error" @click="$emit('delete')">
        Delete
      </v-btn>
      <div>
        <v-btn variant="text" @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="primary" class="ml-2" @click="$emit('validate')">Validate</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
// ✅ Explicitly type each defineModel binding
const label = defineModel<string>('label', { required: true })
const required = defineModel<boolean>('required', { required: true })
const type = defineModel<string>('type', { required: true })

defineEmits(['validate', 'cancel', 'delete'])

const answerTypes = ['short_text', 'long_text', '123', 'email', 'share', 'subject']
</script>
