<template>
  <v-app-bar color="primary" app elevation="2" height="56">
    <v-container fluid class="d-flex align-center px-2 px-md-4">
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" class="d-flex d-md-none mr-2" />
      <AppTitle class="mr-4" />
      <CreateMenu v-if="isDesktop" class="mr-4" />
      <MainNavigation class="d-none d-md-flex" />
      <v-spacer />
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
