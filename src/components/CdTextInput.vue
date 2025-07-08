<template>
  <v-text-field
    :label="label"
    :hint="hint"
    :persistent-hint="persistentHint"
    :variant="variant"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  hint?: string
  variant?: 'outlined' | 'filled' | 'underlined'
  persistentHint?: boolean
}>(), {
  variant: 'outlined',
  persistentHint: false,
})
defineEmits(['update:modelValue'])
</script>
