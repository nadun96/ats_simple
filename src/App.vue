<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style>
/* Global responsive styles */
.v-application {
  font-family: 'Roboto', sans-serif;
}

/* Mobile-first responsive utilities */
@media (max-width: 600px) {
  .mobile-hidden {
    display: none !important;
  }
}

@media (min-width: 960px) {
  .desktop-hidden {
    display: none !important;
  }
}
</style>
