<!-- components/WorkflowCard.vue -->
<template>
  <v-card class="main-container">
    <v-row>
      <v-col class="title-container" cols="8">
        <div class="d-flex flex-column">
          <div class="text-subtitle-1 font-weight-medium"><span class="text-grey mr-2">#{{ order }}</span>{{ item.title }}</div>
          <div v-if="item.actions?.length" class="d-flex flex-wrap ga-2 mt-2">
            <v-chip
              v-for="action in item.actions"
              :key="action.id"
              size="small"
              variant="outlined"
              color="primary"
              class="mr-2"
            >
              <v-icon :icon="action.icon" size="16" class="mr-1" />
              {{ action.label }}
            </v-chip>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <v-container class="action-container">
          <v-btn class="action-icon" icon @click="emit('add-action', item.id)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <div v-if="item.dropDownActions" class="menu-icon">
            <v-icon>mdi-dots-horizontal</v-icon>
            <v-menu v-model="menu" activator="parent" location="bottom end" offset="4">
              <v-list
                bg-color="surface-light"
                class="d-flex flex-column ga-1 pa-1"
                density="compact"
                rounded="lg"
                variant="text"
                slim
              >
                <v-list-item
                  v-for="(subAction, index) in item.dropDownActions"
                  :key="index"
                  :prepend-icon="subAction.icon"
                  :title="subAction.actionName"
                  link
                  rounded="lg"
                  @click="handleSubAction(subAction)"
                />
              </v-list>
            </v-menu>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-card>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { WorkflowItem, WorkflowItemDropdownAction } from '@/types/interfaces/work-flow-types'

const props = defineProps<{
  item: WorkflowItem
  order: number
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'rename', payload: { id: number; title: string }): void
  (e: 'add-action', id: number): void
  (e: 'move', payload: { id: number; direction: 'up' | 'down' }): void
}>()

const menu = ref(false)

const handleSubAction = (subAction: WorkflowItemDropdownAction) => {
  if (subAction.actionName === 'Delete') {
    emit('delete', props.item.id)
  } else if (subAction.actionName === 'Rename') {
    emit('rename', { id: props.item.id, title: props.item.title })
  } else if (subAction.actionName === 'Move Up') {
    emit('move', { id: props.item.id, direction: 'up' })
  } else if (subAction.actionName === 'Move Down') {
    emit('move', { id: props.item.id, direction: 'down' })
  } else {
    subAction.action?.()
  }
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
