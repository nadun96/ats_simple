<!-- File: src/components/job-detail/JobTabs.vue -->
<template>
  <v-tabs v-model="tab" background-color="transparent" grow>
    <v-tab value="applications">Applications</v-tab>
    <v-tab value="promote">Promote</v-tab>
    <v-tab value="reporting">Reporting</v-tab>
    <v-tab value="activities">Activities</v-tab>
  </v-tabs>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ selectedTab: string }>()
const emit = defineEmits(['update-tab'])

const tab = ref(props.selectedTab)

// Sync local tab value when prop changes
watch(() => props.selectedTab, (newVal) => {
  tab.value = newVal
})

// Emit event when local tab changes
watch(tab, (val) => {
  emit('update-tab', val)
})
</script>

