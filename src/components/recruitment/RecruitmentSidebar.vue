<template>
  <v-navigation-drawer :permanent="true" :width="collapsed ? 64 : 260">
    <!-- Header Row: + New View and Collapse Button -->
    <div class="d-flex align-center justify-space-between pa-2">
      <v-btn
        prepend-icon="mdi-plus"
        variant="outlined"
        class="text-none mr-2"
        v-if="!collapsed"
      >
        New View
      </v-btn>

      <v-btn icon @click="$emit('update:collapsed', !collapsed)">
        <v-icon>{{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </div>

    <v-divider class="my-2" />

    <!-- Sidebar Folder List -->
    <v-list dense nav>
      <v-list-item title="Recruitments en cours (5)" prepend-icon="mdi-folder" />
      <v-list-item title="Favoris" prepend-icon="mdi-star-outline" />
      <v-list-item title="Candidatures spontanées" prepend-icon="mdi-account" />
      <v-list-item title="Archivés" prepend-icon="mdi-archive-outline" />
      <v-list-item title="Test" prepend-icon="mdi-folder-outline" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
defineProps<{ collapsed: boolean }>()
defineEmits(['update:collapsed'])
</script>
