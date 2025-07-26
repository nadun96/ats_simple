<template>
  <v-container>
    <CdButton text="Add New" @click="handleAddWorkflow" />
  </v-container>

  <WorkflowCard
    v-for="(item, index) in workflowItems"
    :key="index"
    :item="item"
    @delete="handleDeleteWorkflow"
    @rename="handleRenameWorkflow"
  />
  <div class="mt-4 d-flex justify-space-between">
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
</template>

<script setup lang="ts">
import { CdButton, CdTextInput } from '@/components/atoms'
import type { WorkflowItem } from '@/types/interfaces/work-flow-types'
import { ref } from 'vue'
import WorkflowCard from '../components/WorkflowCard.vue'
const renameDialogVisible = ref(false)
const renameTarget = ref<{ id: number; title: string } | null>(null)
const newTitle = ref('')

let idCounter = 1

const workflowItems = ref<WorkflowItem[]>([
  {
    id: idCounter++,
    title: 'Workflow 1',
    mainAction: () => console.log('Action for Workflow 1'),
  },
  {
    id: idCounter++,
    title: 'Workflow 2',
    mainAction: () => console.log('Action for Workflow 2'),
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
    ],
  },
])

const handleAddWorkflow = () => {
  const id = idCounter++
  workflowItems.value.push({
    id,
    title: `New Workflow`,
    mainAction: () => console.log(`Main action for Workflow ${id}`),
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
