<template>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn variant="text" class="text-none">
          Dashboard
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              class="text-none"
              v-bind="props"
              append-icon="mdi-chevron-down"
            >
              Recrutements
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>My Recruitments</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>My Applications</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>My Recruitment Requests</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              class="text-none"
              v-bind="props"
              append-icon="mdi-chevron-down"
            >
              CV Library
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>All Profiles</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn variant="text" class="text-none">
          Analyse
        </v-btn>
      </v-toolbar-items>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'NavigationItems',
});
</script>

<style scoped>
</style>
