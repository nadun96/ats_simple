<template>
  <v-app>
    <AppHeader @toggle-drawer="drawer = !drawer" />
    <MobileDrawer v-model="drawer" />

    <v-main>
      <v-container class="page-container">
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
.page-container {
  max-width: 1200px;
}
</style>
