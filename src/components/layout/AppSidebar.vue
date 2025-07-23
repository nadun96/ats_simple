<template>
  <v-app>
    <MobileDrawer v-if="showDrawer" v-model="drawer" />

    <v-main>
      <div class="layout-with-sidebar">
        <aside :class="['sidebar-content', { collapsed: isCollapsed }]">
          <v-list-item class="d-flex justify-space-between align-center px-1 mb-2">
            <v-list-item-title v-if="!isCollapsed" class="text-subtitle-1 font-weight-bold">
              {{ sidebarTitle }}
            </v-list-item-title>
            <v-btn icon size="small" @click="toggleCollapse">
              <v-icon>{{ isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
            </v-btn>
          </v-list-item>

          <v-list dense nav>
            <v-list-item
              v-for="item in sidebarItems"
              :key="item.name"
              :to="item.to"
              :class="[
                'rounded-lg',
                'd-flex align-center',
                { 'bg-blue-lighten-5': $route.name === item.name },
              ]"
            >
              <v-icon class="mr-3">{{ item.icon }}</v-icon>
              <span v-if="!isCollapsed">{{ item.label }}</span>
            </v-list-item>
          </v-list>

          <slot name="sidebar-extra" :is-collapsed="isCollapsed" />
        </aside>

        <section class="main-content">
          <slot />
        </section>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MobileDrawer from '@/components/header/MobileDrawer.vue'

defineProps<{
  showSidebar?: boolean
  showDrawer?: boolean
  sidebarTitle: string
  sidebarItems: { name: string; label: string; icon: string; to: string }[]
}>()

const drawer = ref(false)
const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.layout-with-sidebar {
  display: flex;
}

.sidebar-content {
  background-color: white;
  border-right: 1px solid #ddd;
  padding: 16px;
  width: 260px;
  transition:
    width 0.3s ease,
    padding 0.3s ease;
}

.sidebar-content.collapsed {
  width: 64px;
  padding: 16px 8px;
}

.main-content {
  flex: 1;
  padding: 24px;
  background-color: #f9fbfc;
}
</style>
