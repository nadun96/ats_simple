<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-stepper prev-text="Previous" next-text="Next" :items="['Step 1', 'Step 2', 'Step 3']">
    <template v-slot:item.1>
      <v-card title="Step One" flat
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti consequatur repellat
        aliquam, culpa quisquam saepe maiores natus aspernatur dolorum, nam dignissimos inventore
        molestias ut, doloribus sint recusandae eos autem incidunt.</v-card
      >
    </template>

    <template v-slot:item.2>
      <v-card title="Step Two" flat
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti consequatur repellat
        aliquam, culpa quisquam saepe maiores natus aspernatur dolorum, nam dignissimos inventore
        molestias ut, doloribus sint recusandae eos autem incidunt.</v-card
      >
    </template>

    <template v-slot:item.3>
      <v-card title="Step Three" flat
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti consequatur repellat
        aliquam, culpa quisquam saepe maiores natus aspernatur dolorum, nam dignissimos inventore
        molestias ut, doloribus sint recusandae eos autem incidunt.</v-card
      >
    </template>
  </v-stepper>
</template>

<script setup lang="ts"></script>
