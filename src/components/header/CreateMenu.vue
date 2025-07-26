<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn
        color="success"
        variant="elevated"
        prepend-icon="mdi-plus"
        append-icon="mdi-chevron-down"
        class="create-menu-btn"
        size="small"
        v-bind="props"
      >
        Create
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item v-for="item in menuItems" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types/navigation'

const menuItems: MenuItem[] = [
  { title: 'New Recruitment', icon: 'mdi-briefcase-outline' },
  { title: 'Add Candidate', icon: 'mdi-account-plus-outline' },
  { title: 'Schedule Interview', icon: 'mdi-calendar-plus' },
]
</script>

<style scoped>
.create-menu-btn {
  transition: all 0.2s ease;
  min-width: auto;
  padding: 0 16px;
}

@media (min-width: 960px) {
  .create-menu-btn {
    min-width: 100px;
  }
}
</style>
