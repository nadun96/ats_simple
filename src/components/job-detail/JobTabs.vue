<!-- File: src/components/job-detail/JobTabs.vue -->
<template>
  <div class="job-tabs-container">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
      class="job-tabs"
      color="primary"
      height="64"
    >
      <v-tab
        value="applications"
        class="tab-item"
        :ripple="false"
      >
        <v-icon start size="20" class="mr-2">mdi-account-multiple</v-icon>
        Applications
        <v-badge
          :content="applicationsCount"
          :model-value="applicationsCount > 0"
          color="error"
          class="ml-2"
        />
      </v-tab>

      <v-tab
        value="promote"
        class="tab-item"
        :ripple="false"
      >
        <v-icon start size="20" class="mr-2">mdi-rocket</v-icon>
        Promote
      </v-tab>

      <v-tab
        value="reporting"
        class="tab-item"
        :ripple="false"
      >
        <v-icon start size="20" class="mr-2">mdi-chart-line</v-icon>
        Reporting
      </v-tab>

      <v-tab
        value="activities"
        class="tab-item"
        :ripple="false"
      >
        <v-icon start size="20" class="mr-2">mdi-clock-outline</v-icon>
        Activities
      </v-tab>
    </v-tabs>

    <!-- Tab indicator line -->
    <div class="tab-indicator"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ selectedTab: string }>()
const emit = defineEmits(['update-tab'])

const tab = ref(props.selectedTab)

// Mock applications count - in real app this would come from props or store
const applicationsCount = ref(12)

// ✅ Emit tab change to parent
watch(tab, (val) => {
  emit('update-tab', val)
})

// ✅ Keep tab in sync when parent changes selectedTab
watch(() => props.selectedTab, (newVal) => {
  if (tab.value !== newVal) {
    tab.value = newVal
  }
})
</script>

<style scoped>
.job-tabs-container {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  margin: 0 24px;
}

.job-tabs {
  background: transparent;
}

.tab-item {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  margin: 0 4px;
}

.tab-item:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.tab-item.v-tab--selected {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1976d2;
  font-weight: 700;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  border-radius: 2px;
}

/* Custom tab styling */
:deep(.v-tab) {
  min-width: 120px;
  height: 64px;
  font-size: 0.875rem;
}

:deep(.v-tab__content) {
  padding: 12px 16px;
}

:deep(.v-tab--selected .v-tab__content) {
  background: rgba(25, 118, 210, 0.1);
  border-radius: 8px 8px 0 0;
}

:deep(.v-tab__content:hover) {
  background-color: rgba(25, 118, 210, 0.05);
}

/* Badge styling */
:deep(.v-badge__badge) {
  font-size: 0.75rem;
  font-weight: 600;
  height: 20px;
  min-width: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .job-tabs-container {
    margin: 0 16px;
  }

  .tab-item {
    min-width: 80px;
    font-size: 0.75rem;
  }

  :deep(.v-tab) {
    min-width: 80px;
    height: 56px;
  }

  :deep(.v-tab__content) {
    padding: 8px 12px;
  }
}
</style>
