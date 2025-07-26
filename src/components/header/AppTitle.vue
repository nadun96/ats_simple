<template>
  <v-toolbar-title class="text-h6 font-weight-bold text-truncate">
    <router-link to="/" class="text-decoration-none text-white">
      <span class="d-none d-sm-inline">Simple ATS</span>
    </router-link>
  </v-toolbar-title>
</template>

<script setup lang="ts"></script>

<style scoped>
.v-toolbar-title {
  max-width: 200px;
}

@media (max-width: 600px) {
  .v-toolbar-title {
    max-width: 100px;
    font-size: 1.1rem;
  }
}
</style>
