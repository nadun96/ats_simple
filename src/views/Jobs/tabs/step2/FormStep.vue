<template>
  <div class="wizard-actions d-flex justify-space-between">
    <v-btn @click="$emit('prev')" variant="outlined" color="primary"
      >Previous</v-btn
    >
    <v-btn @click="$emit('next')" color="primary">Next</v-btn>
  </div>
</template>
