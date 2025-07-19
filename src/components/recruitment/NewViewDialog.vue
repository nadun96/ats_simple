<template>
  <v-dialog v-model="localVisible" max-width="400">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        New View
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newName"
          label="Name"
          variant="outlined"
          required
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="create">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible', 'create'])

const newName = ref('')
const localVisible = ref(props.visible)

watch(() => props.visible, val => localVisible.value = val)
watch(localVisible, val => emit('update:visible', val))

const cancel = () => {
  localVisible.value = false
  newName.value = ''
}

const create = () => {
  if (newName.value.trim()) {
    emit('create', newName.value.trim())
    localVisible.value = false
    newName.value = ''
  }
}
</script>

<script lang="ts">
export default {
  name: 'NewViewDialog'
}
</script>
