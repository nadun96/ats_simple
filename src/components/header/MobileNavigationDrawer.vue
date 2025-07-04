<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    width="280"
    class="d-flex d-md-none"
  >
    <!-- Header Section -->
    <v-list>
      <v-list-item class="px-4 py-3">
        <v-list-item-title class="text-h6 font-weight-bold text-primary">
          Simple ATS
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>

      <!-- Create Actions - Mobile Only -->
      <v-list-item class="px-4 py-2">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              color="success"
              variant="elevated"
              prepend-icon="mdi-plus"
              append-icon="mdi-chevron-down"
              block
              class="text-none"
              v-bind="props"
            >
              Create New
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-briefcase-outline</v-icon>
              </template>
              <v-list-item-title>New Recruitment</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-account-plus-outline</v-icon>
              </template>
              <v-list-item-title>Add Candidate</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <template v-slot:prepend>
                <v-icon>mdi-calendar-plus</v-icon>
              </template>
              <v-list-item-title>Schedule Interview</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-divider class="my-2"></v-divider>

      <!-- Main Navigation -->
      <v-list-item link class="my-1">
        <v-list-item-title>
          <v-icon class="mr-3">mdi-view-dashboard</v-icon>
          Dashboard
        </v-list-item-title>
      </v-list-item>

      <v-list-group value="recruitment">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" class="my-1">
            <v-list-item-title>
              <v-icon class="mr-3">mdi-account-group</v-icon>
              Recrutements
            </v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item link class="pl-12">
          <v-list-item-title>My Recruitments</v-list-item-title>
        </v-list-item>
        <v-list-item link class="pl-12">
          <v-list-item-title>My Applications</v-list-item-title>
        </v-list-item>
        <v-list-item link class="pl-12">
          <v-list-item-title>My Recruitment Requests</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group value="cv-library">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" class="my-1">
            <v-list-item-title>
              <v-icon class="mr-3">mdi-file-document-multiple</v-icon>
              CV Library
            </v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item link class="pl-12">
          <v-list-item-title>Search CVs</v-list-item-title>
        </v-list-item>
        <v-list-item link class="pl-12">
          <v-list-item-title>Favorite CVs</v-list-item-title>
        </v-list-item>
        <v-list-item link class="pl-12">
          <v-list-item-title>Recent CVs</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item link class="my-1">
        <v-list-item-title>
          <v-icon class="mr-3">mdi-chart-line</v-icon>
          Analysis
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const drawer = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})
</script>
