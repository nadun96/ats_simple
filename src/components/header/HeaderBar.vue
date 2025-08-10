<template>
  <v-app-bar
    color="primary"
    app
    elevation="0"
    height="64"
    class="modern-header"
  >
    <v-container fluid class="d-flex align-center px-4 px-md-6">
      <!-- Mobile menu button -->
      <v-app-bar-nav-icon
        @click="$emit('toggle-drawer')"
        class="d-flex d-md-none mr-4 mobile-menu-btn"
      />

      <!-- App Title -->
      <AppTitle class="mr-8" />

      <!-- Create Menu -->
      <CreateMenu v-if="isDesktop" class="mr-12" />

      <!-- Main Navigation -->
      <MainNavigation class="d-none d-md-flex" />

      <v-spacer />

      <!-- User Actions -->
      <UserActions class="d-none d-sm-flex" />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppTitle from './AppTitle.vue'
import CreateMenu from './CreateMenu.vue'
import MainNavigation from './MainNavigation.vue'
import UserActions from './UserActions.vue'

defineEmits(['toggle-drawer'])

const isDesktop = ref(window.innerWidth >= 1024)

function updateScreenSize() {
  isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => window.addEventListener('resize', updateScreenSize))
onUnmounted(() => window.removeEventListener('resize', updateScreenSize))
</script>

<style scoped>
.modern-header {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.mobile-menu-btn {
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
}

.mobile-menu-btn:hover {
  color: white;
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .modern-header {
    height: 56px;
  }
}
</style>
