<template>
  <v-card class="mb-4 pa-2" variant="outlined">
    <!-- Top Row: Status, Title, Buttons -->
    <v-row class="justify-space-between align-center">
      <v-col cols="auto" class="d-flex align-center">
        <!-- Status Dropdown -->
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              size="small"
              color="success"
              variant="flat"
              class="text-capitalize"
            >
              {{ job.status }}
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="updateStatus('Suspend')">
              <v-list-item-title>Suspend</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus('Archive')">
              <v-list-item-title>Archive</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Favorite Star -->
        <v-icon
          color="warning"
          class="ml-2 mr-2"
          @click="toggleFavorite"
          :icon="isFavorite ? 'mdi-star' : 'mdi-star-outline'"
        />

        <!-- Job title and location -->
        <div>
          <div class="font-weight-bold text-body-1 text-truncate job-title">
            {{ job.title }}
          </div>
          <div class="text-caption text-grey-darken-1">{{ job.location }}</div>
        </div>
      </v-col>

      <!-- Right Buttons: Tag, Promote, More -->
      <v-col cols="auto" class="d-flex align-center">
        <v-btn size="small" variant="text" icon>
          <v-icon>mdi-tag</v-icon>
        </v-btn>
        <v-btn size="small" variant="outlined" class="ml-1">
          Promote
        </v-btn>

        <!-- 3-dot Menu -->
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn size="small" variant="text" icon v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list class="px-1 py-0">
            <v-list-item @click="handleAction('edit')" class="menu-item">
              <v-icon start size="20">mdi-pencil</v-icon>
              <v-list-item-title>Edit job</v-list-item-title>
            </v-list-item>

            <v-list-item @click="handleAction('duplicate')" class="menu-item">
              <v-icon start size="20">mdi-content-copy</v-icon>
              <v-list-item-title>Duplicate the job</v-list-item-title>
            </v-list-item>

            <v-list-item @click="handleAction('view')" class="menu-item">
              <v-icon start size="20">mdi-eye-outline</v-icon>
              <v-list-item-title>View job</v-list-item-title>
            </v-list-item>

            <v-list-item @click="handleAction('share')" class="menu-item">
              <v-icon start size="20">mdi-share-variant</v-icon>
              <v-list-item-title>Share the offer</v-list-item-title>
            </v-list-item>

            <v-list-item @click="handleAction('download')" class="menu-item">
              <v-icon start size="20">mdi-download</v-icon>
              <v-list-item-title>Download the offer in PDF</v-list-item-title>
            </v-list-item>

            <v-list-item @click="handleAction('invite')" class="menu-item">
              <v-icon start size="20">mdi-account-plus</v-icon>
              <v-list-item-title>Invite collaborators</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Progress Labels Row -->
    <v-row class="py-2 flex-nowrap overflow-x-auto no-gutters progress-labels">
      <v-col
        v-for="(label, index) in progressLabels"
        :key="index"
        cols="auto"
        class="d-flex justify-center"
      >
        <v-btn
          size="small"
          variant="text"
          class="text-capitalize px-2"
          @click="onLabelClick(label)"
        >
          <div class="text-subtitle-2 text-grey-darken-2">-</div>
          <div class="text-caption">{{ label }}</div>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Visibility Text -->
    <v-card-subtitle class="text-caption text-grey px-4">
      Visible on your career site.
      <a href="#" class="ml-1 font-weight-medium">Promote now</a>
    </v-card-subtitle>

    <!-- Footer: icons and date -->
    <v-card-actions class="px-4 pt-2 d-flex justify-space-between">
      <div></div>
      <div class="d-flex align-center text-caption text-grey-darken-1">
        <v-btn icon size="small" class="mr-1">
          <v-icon>mdi-message-outline</v-icon>
        </v-btn>
        0

        <v-btn icon size="small" class="ml-4 mr-1">
          <v-icon>mdi-account-group-outline</v-icon>
        </v-btn>
        0

        <v-icon class="ml-4 mr-1" size="18">mdi-clock-outline</v-icon>
        {{ job.date }}
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  job: {
    title: string
    location: string
    date: string
    status: string
    hired: boolean
    type: string
  }
}>()

const isFavorite = ref(false)

const updateStatus = (status: string) => {
  console.log('Status changed to', status)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const handleAction = (action: string) => {
  console.log(`${action} clicked`)
}

const progressLabels = [
  'Nouveau',
  'CV sélectionné',
  'Evalué par téléphone',
  'Entretien passé',
  'Offre faite',
  'Embauché'
]

const onLabelClick = (label: string) => {
  console.log('Clicked label:', label)
}
</script>

<style scoped>
.job-title {
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flex-nowrap {
  flex-wrap: nowrap !important;
}

.overflow-x-auto {
  overflow-x: auto !important;
}

.progress-labels {
  padding-left: 16px;
  padding-right: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
