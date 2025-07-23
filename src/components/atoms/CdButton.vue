<template>
  <v-btn :type="type" color="primary" :variant="variant" class="mt-3" style="text-transform: none">{{
    text
  }}</v-btn>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    text?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
    color?: string
  }>(),
  {
    variant: 'outlined',
  },
)
</script>
