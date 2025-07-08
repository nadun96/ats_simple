<template>
  <div class="default-layout">
    <HeaderView />

    <!-- Main Content Area -->
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import HeaderView from '@/views/HeaderView.vue';
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
}
</style>
