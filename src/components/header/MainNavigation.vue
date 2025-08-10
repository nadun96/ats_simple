<template>
  <div class="main-navigation">
    <v-btn
      variant="text"
      class="nav-btn text-none"
      :class="{ 'active': $route.path === '/dashboard' }"
      @click="router.push('/')"
    >
      Dashboard
    </v-btn>

    <v-menu
      v-for="group in navGroups"
      :key="group.title"
      offset-y
      class="nav-menu"
    >
      <template #activator="{ props }">
        <v-btn
          variant="text"
          class="nav-btn text-none"
          v-bind="props"
          append-icon="mdi-chevron-down"
          :class="{ 'active': isActiveGroup(group.title) }"
        >
          {{ group.title }}
        </v-btn>
      </template>
      <v-list class="nav-dropdown">
        <v-list-item
          v-for="item in group.items"
          :key="item"
          class="nav-dropdown-item"
          :class="`nav-item-${item.toLowerCase().replace(/\s+/g, '-')}`"
          @click="handleNavItemClick(group.title, item)"
        >
          <v-list-item-title class="text-body-2 font-weight-medium">
            {{ item }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      variant="text"
      class="nav-btn text-none"
      :class="{ 'active': $route.path === '/analysis' }"
      @click="router.push('/analysis')"
    >
      Analysis
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { NavGroup } from '@/types/navigation'

const router = useRouter()

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

const isActiveGroup = (groupTitle: string) => {
  const currentPath = window.location.pathname
  return currentPath.includes(groupTitle.toLowerCase())
}

const handleNavItemClick = (groupTitle: string, itemTitle: string) => {
  if (groupTitle === 'CV Library' && itemTitle === 'All Profiles') {
    router.push('/candidates')
  } else if (groupTitle === 'Recruitments') {
    // Handle recruitment navigation
    switch (itemTitle) {
      case 'My Recruitments':
        router.push('/recruitment')
        break
      case 'My Applications':
        // TODO: Add route for applications
        console.log('Navigate to applications')
        break
      case 'My Recruitment Requests':
        // TODO: Add route for recruitment requests
        console.log('Navigate to recruitment requests')
        break
    }
  }
}
</script>

<style scoped>
.main-navigation {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-left: 8px;
}

.nav-btn {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  padding: 10px 20px;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  min-height: 42px;
  text-transform: none;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.nav-btn.active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.nav-btn.active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: linear-gradient(90deg, #64b5f6, #42a5f5);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(100, 181, 246, 0.4);
}

.nav-dropdown {
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px;
  min-width: 220px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
}

.nav-dropdown-item {
  border-radius: 12px;
  margin: 4px 0;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 14px 18px;
}

.nav-dropdown-item:hover {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.08), rgba(25, 118, 210, 0.12));
  transform: translateX(6px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .main-navigation {
    gap: 12px;
  }

  .nav-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
    min-height: 42px;
  }
}

@media (max-width: 960px) {
  .main-navigation {
    gap: 8px;
  }

  .nav-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
    min-height: 42px;
  }
}
</style>
