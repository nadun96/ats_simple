<template>
  <div class="default-layout">
    <!-- <AppHeader /> -->

    <!-- Main Content Area -->
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script setup lang="ts">
// import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
}
</style>
