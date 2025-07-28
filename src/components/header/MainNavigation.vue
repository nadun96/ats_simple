<template>
  <v-toolbar-items class="d-none d-md-flex">
    <v-btn variant="text" class="text-none">Dashboard</v-btn>

    <v-menu v-for="group in navGroups" :key="group.title" offset-y>
      <template #activator="{ props }">
        <v-btn variant="text" class="text-none" v-bind="props" append-icon="mdi-chevron-down">
          {{ group.title }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="item in group.items"
          :key="item.title"
          @click="goTo(item.path)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn variant="text" class="text-none">Analysis</v-btn>
  </v-toolbar-items>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { NavGroup } from '@/types/navigation'

const router = useRouter()

// ⬇️ updated to include paths
const navGroups: NavGroup[] = [
  {
    title: 'Recruitments',
    items: [
      { title: 'My Recruitments', path: '/recruitment' },
      { title: 'My Applications', path: '/recruitment/applications' },
      { title: 'My Recruitment Requests', path: '/recruitment/requests' },
    ],
  },
  {
    title: 'CV Library',
    items: [
      { title: 'All Profiles', path: '/cv-library' },
    ],
  },
]

// ⬇️ navigation function
function goTo(path: string) {
  router.push(path)
}
</script>
