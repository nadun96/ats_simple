<template>
  <v-row class="pa-4" dense>
    <v-col
      v-for="(label, index) in labels"
      :key="index"
      :cols="12 / labels.length" 
      class="d-flex justify-center"
    >
      <v-card class="pa-3 text-center w-100" color="blue-grey lighten-5">
        <h2 class="text-h6 mb-1">0</h2>
        <div class="text-caption">{{ label }}</div>
      </v-card>
    </v-col>
  </v-row>

  <v-card class="ma-2 pa-2 text-center">
    <v-icon size="48" color="blue">mdi-account</v-icon>
    <h3 class="mt-2 text-h6">No candidate</h3>
    <div class="text-body-2 mb-4">
      Not enough candidates? Post your ad to our partners
    </div>
    <v-btn color="primary">Promote</v-btn>
  </v-card>
</template>

<script setup lang="ts">
const labels = [
  'Nouveau',
  'CV sélectionné',
  'Téléphone',
  'Entretien passé',
  'Offre faite',
  'Embauché',
  'Refusé'
]
</script>
