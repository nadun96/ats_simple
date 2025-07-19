<template>
  <v-navigation-drawer
    :permanent="true"
    :rail="isCollapsed"
    app
    width="250"
    class="pt-2"
  >
    <!-- Header: Title + Collapse Button -->
    <v-list-item class="d-flex justify-space-between align-center px-4">
      <v-list-item-title v-if="!isCollapsed" class="text-subtitle-1 font-weight-bold">
        Views
      </v-list-item-title>
      <v-btn icon size="small" @click="toggleCollapse">
        <v-icon>{{ isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </v-list-item>

    <!-- + New View Button -->
    <v-list-item v-if="!isCollapsed">
      <v-btn
        block
        color="primary"
        variant="outlined"
        @click="dialogVisible = true"
      >
        + New View
      </v-btn>
    </v-list-item>

    <v-divider class="my-2" />

    <!-- View Items -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="view in views"
        :key="view.id"
        :value="view.id"
        :class="{ 'bg-blue-lighten-5': selectedView === view.id }"
        @click="selectView(view.id)"
      >
        <v-list-item-icon>
          <v-icon>{{ view.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-if="!isCollapsed">{{ view.name }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Popup -->
    <NewViewDialog
      v-model:visible="dialogVisible"
      @create="handleCreate"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NewViewDialog from './NewViewDialog.vue'

interface View {
  id: number
  name: string
  icon: string
}

const views = ref<View[]>([
  { id: 1, name: 'Recrutements en cours', icon: 'mdi-briefcase-outline' },
  { id: 2, name: 'Favoris', icon: 'mdi-star-outline' },
  { id: 3, name: 'Candidatures spontanées', icon: 'mdi-account-multiple' },
  { id: 4, name: 'Archivés', icon: 'mdi-archive-outline' }
])

const selectedView = ref<number>(1)
const dialogVisible = ref(false)
const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const selectView = (id: number) => {
  selectedView.value = id
}

const handleCreate = (name: string) => {
  console.log('the new view created:', name)
  views.value.push({
    id: Date.now(),
    name,
    icon: 'mdi-eye' // Default icon for new views
  })
}
</script>

<style scoped>
.v-list-item:hover {
  cursor: pointer;
}
</style>
