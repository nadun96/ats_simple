<template>
        <div class="d-flex align-center">
        <v-btn icon variant="text" class="mr-2">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon variant="text" class="mr-2">
          <v-icon>mdi-email-outline</v-icon>
        </v-btn>

        <v-btn icon variant="text" class="mr-2">
          <v-badge
            color="error"
            content="3"
            overlap
          >
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              variant="text"
              v-bind="props"
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HeaderRightSideIcons',
});
</script>

<style scoped>
</style>
