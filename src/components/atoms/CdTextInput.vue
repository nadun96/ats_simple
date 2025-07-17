<template>
  <CdLabel :label="label" :required="required" />
  <v-text-field
    density="compact"
    :hint="hint"
    :placeholder="placeholder"
    :persistent-hint="persistentHint"
    :variant="variant"
    :required="required"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { CdLabel } from '.'

withDefaults(
  defineProps<{
    label: string
    hint?: string
    placeholder?: string
    variant?: 'outlined' | 'filled' | 'underlined'
    required?: boolean
    persistentHint?: boolean
  }>(),
  {
    variant: 'outlined',
    persistentHint: false,
  },
)
defineEmits(['update:modelValue'])
</script>
