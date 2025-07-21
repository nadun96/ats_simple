<template>
  <div class="d-flex align-center">
    <v-btn icon variant="text" class="mr-2">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon variant="text" class="mr-2">
      <v-icon>mdi-email-outline</v-icon>
    </v-btn>
    <v-btn icon variant="text" class="mr-2">
      <v-badge color="error" content="3" overlap>
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon variant="text" v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$router.push('/profile/information')">Profile</v-list-item>
        <v-list-item v-for="item in profileOptions" :key="item">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
const profileOptions = ['Logout']
</script>
