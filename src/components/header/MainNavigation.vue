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
        <v-list-item v-for="item in group.items" :key="item">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn variant="text" class="text-none">Analysis</v-btn>
  </v-toolbar-items>
</template>

<script setup lang="ts">
import type { NavGroup } from '@/types/navigation'

const navGroups: NavGroup[] = [
  {
    title: 'Recruitments',
    items: ['My Recruitments', 'My Applications', 'My Recruitment Requests'],
  },
  {
    title: 'CV Library',
    items: ['All Profiles'],
  },
]
</script>
