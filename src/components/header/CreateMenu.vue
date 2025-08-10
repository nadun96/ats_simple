<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn
        color="success"
        variant="elevated"
        prepend-icon="mdi-plus"
        append-icon="mdi-chevron-down"
        class="create-menu-btn"
        size="default"
        v-bind="props"
        elevation="2"
      >
        CREATE
      </v-btn>
    </template>
    <v-list dense class="create-menu-list">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        link
        class="create-menu-item"
        :class="`menu-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`"
        @click="handleItemClick(item.title)"
      >
        <template #prepend>
          <v-icon
            :color="getItemColor(item.title)"
            size="18"
            class="mr-1"
          >
            {{ item.icon }}
          </v-icon>
        </template>
        <v-list-item-title class="text-body-2 font-weight-semibold text-primary-dark">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { MenuItem } from '@/types/navigation'

const router = useRouter()

const menuItems: MenuItem[] = [
  { title: 'New Recruitment', icon: 'mdi-briefcase-outline' },
  { title: 'Add Candidate', icon: 'mdi-account-plus-outline' },
  { title: 'Schedule Interview', icon: 'mdi-calendar-plus' },
]

const getItemColor = (title: string) => {
  switch (title) {
    case 'New Recruitment':
      return 'primary'
    case 'Add Candidate':
      return 'success'
    case 'Schedule Interview':
      return 'info'
    default:
      return 'grey'
  }
}

const handleItemClick = (title: string) => {
  switch (title) {
    case 'New Recruitment':
      router.push('/job')
      break
    case 'Add Candidate':
      router.push('/candidates/create')
      break
    case 'Schedule Interview':
      // TODO: Implement interview scheduling
      console.log('Schedule Interview clicked')
      break
  }
}
</script>

<style scoped>
.create-menu-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 130px;
  padding: 0 24px;
  height: 42px;
  font-weight: 700;
  letter-spacing: 0.6px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.25);
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: 1px solid rgba(34, 197, 94, 0.2);
  backdrop-filter: blur(10px);
  text-transform: none;
}

.create-menu-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(34, 197, 94, 0.35);
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  border-color: rgba(34, 197, 94, 0.3);
}

.create-menu-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
}

.create-menu-list {
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 8px;
  min-width: 220px;
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.98);
  margin-top: 8px;
}

.create-menu-item {
  border-radius: 10px;
  margin: 2px 0;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px 14px;
}

.create-menu-item .v-list-item-title {
  font-size: 0.8rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px;
  color: #1e293b !important;
  line-height: 1.2;
}

.create-menu-item:hover .v-list-item-title {
  color: #0f172a !important;
  transform: scale(1.02);
  transition: all 0.2s ease;
}

.create-menu-item:hover {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.08), rgba(25, 118, 210, 0.12));
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
}

.menu-item-new-recruitment:hover {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.08), rgba(25, 118, 210, 0.12));
}

.menu-item-add-candidate:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.12));
}

.menu-item-schedule-interview:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.12));
}

/* Responsive adjustments */
@media (min-width: 960px) {
  .create-menu-btn {
    min-width: 150px;
    height: 42px;
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .create-menu-btn {
    min-width: 110px;
    height: 38px;
    font-size: 0.875rem;
    padding: 0 20px;
  }
}
</style>
