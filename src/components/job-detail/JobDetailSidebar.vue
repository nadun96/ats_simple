<!-- File: src/components/job-detail/JobDetailSidebar.vue -->
<template>
  <v-navigation-drawer :permanent="true" :width="collapsed ? 60 : 300" class="pa-2">
    <v-btn icon @click="$emit('toggle-collapse')">
      <v-icon>{{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
    </v-btn>

    <v-list dense>
      <v-list-item
        v-for="job in jobs"
        :key="job.id"
        :value="job.id"
        :active="modelValue === job.id"
        @click="$emit('update:selectedJobId', job.id)"
      >
        <v-list-item-icon>
          <v-icon color="green">mdi-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="!collapsed">
          <v-list-item-title>{{ job.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ job.type }} • {{ job.location }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
defineProps<{
  jobs: Array<{ id: number; title: string; type: string; location: string }>
  modelValue: number
  collapsed: boolean
}>()

defineEmits(['update:selectedJobId', 'toggle-collapse'])
</script>
