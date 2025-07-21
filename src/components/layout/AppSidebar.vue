<template>
  <v-app>
    <MobileDrawer v-if="showDrawer" v-model="drawer" />

    <v-main>
      <div class="layout-with-sidebar">
        <aside v-if="showSidebar" class="sidebar-content">
          <slot name="sidebar" />
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
}>()

const drawer = ref(false)
</script>

<style scoped>
.layout-with-sidebar {
  display: flex;
}

.sidebar-content {
  width: 240px;
  padding: 16px;
  background-color: #f9f9f9;
  border-right: 1px solid #eee;
}

.main-content {
  flex: 1;
  padding: 24px;
}
</style>
