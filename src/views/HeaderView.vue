<template>
  <!-- Main App Bar -->
  <AppBarMain @toggle-drawer="drawer = !drawer"/>
  <!-- Mobile Navigation Drawer -->
  <MobileNavigationDrawer v-model="drawer" />
</template>

<script setup lang="ts">

import { ref } from 'vue'
import MobileNavigationDrawer from '@/components/header/MobileNavigationDrawer.vue';
import AppBarMain from '@/components/header/AppBarMain.vue';

const drawer = ref(false)

</script>

<style scoped>
.v-toolbar-title {
  font-size: 1.5rem;
}

.v-btn {
  text-transform: none;
}
</style>
