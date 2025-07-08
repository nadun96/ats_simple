<template>
  <v-row class="align-center mb-4 px-2">
    <v-col cols="12" md="6" class="d-flex align-center">
      
      <v-chip class="ml-2">Filter (1)</v-chip>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-end align-center">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        label="Search"
        hide-details
        dense
        variant="outlined"
      />
      <v-select
        class="ml-2"
        :items="['Newest', 'Oldest']"
        label="Sort by"
        hide-details
        dense
        variant="outlined"
      />
      <v-btn icon class="ml-2"><v-icon>mdi-view-list</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-view-grid</v-icon></v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
// You can add reactive sorting/filtering logic here
</script>
