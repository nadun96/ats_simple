<template>
  <v-app>
    <AppHeader @toggle-drawer="drawer = !drawer" />
    <MobileDrawer v-model="drawer" />

    <v-main>
      <v-container fluid class="full-width-container">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import MobileDrawer from '@/components/header/MobileDrawer.vue'

const drawer = ref(false)
</script>

<style scoped>
.full-width-container {
  padding: 0 !important;
  width: 100%;
  max-width: 100% !important;
  margin: 0 !important;
}

v-main {
  padding: 0 !important;
}
</style>
