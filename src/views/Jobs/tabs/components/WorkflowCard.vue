<!-- components/WorkflowCard.vue -->
<template>
  <v-card class="main-container">
    <v-row>
      <v-col class="title-container" cols="8">
        <div>{{ item.title }}</div>
      </v-col>
      <v-col cols="4">
        <v-container class="action-container">
          <v-btn class="action-icon" icon @click="item.mainAction?.()">
            <v-icon>mdi-lightning-bolt</v-icon>
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
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'rename', payload: { id: number; title: string }): void
}>()

const menu = ref(false)

const handleSubAction = (subAction: WorkflowItemDropdownAction) => {
  if (subAction.actionName === 'Delete') {
    emit('delete', props.item.id)
  } else if (subAction.actionName === 'Rename') {
    emit('rename', { id: props.item.id, title: props.item.title })
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
