<!-- File: src/components/job-detail/JobDetailHeader.vue -->
<template>
  <div class="d-flex justify-space-between align-center pa-4">
    <div>
      <h2 class="text-h5 font-weight-bold">{{ job.title }}</h2>
      <div class="text-caption">
        <v-icon size="14" class="mr-1">mdi-briefcase-outline</v-icon>{{ job.type }}
        <v-icon size="14" class="ml-4 mr-1">mdi-map-marker</v-icon>{{ job.location }}
      </div>
    </div>
    <div class="d-flex align-center gap-3">
      <v-chip color="green" size="small">Online</v-chip>
      <v-chip color="blue-grey lighten-2" size="small">Public</v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  job: { title: string; type: string; location: string }
}>()
</script>
