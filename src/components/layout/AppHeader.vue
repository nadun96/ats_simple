<template>
  <HeaderBar @toggle-drawer="$emit('toggle-drawer')" />
</template>

<script setup lang="ts">
import HeaderBar from '@/components/header/HeaderBar.vue'
defineEmits(['toggle-drawer'])
</script>
