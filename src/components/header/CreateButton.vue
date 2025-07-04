<template>
  <!-- Create Button with Dropdown -->
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        color="success"
        variant="elevated"
        prepend-icon="mdi-plus"
        append-icon="mdi-chevron-down"
        class="text-none mr-2 create-btn"
        size="small"
        v-bind="props"
      >
        Create
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-briefcase-outline</v-icon>
        </template>
        <v-list-item-title>New Recruitment</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-account-plus-outline</v-icon>
        </template>
        <v-list-item-title>Add Candidate</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-calendar-plus</v-icon>
        </template>
        <v-list-item-title>Schedule Interview</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
// Modern Vue 3 Composition API
</script>

<style scoped>
.create-btn {
  transition: all 0.2s ease;
  min-width: auto;
  padding: 0 16px !important;
}

/* Ensure consistent sizing on all screen sizes where it's visible (md+) */
@media (min-width: 960px) {
  .create-btn {
    min-width: 100px;
  }
}
</style>
