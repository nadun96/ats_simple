<template>
  <CdLabel :label="label" :required="required" />
  <v-text-field
    v-model="modelValue"
    density="compact"
    :hint="hint"
    :placeholder="placeholder"
    :persistent-hint="persistentHint"
    :variant="variant"
    :required="required"
    :rules="rules"
  />
</template>

<script setup lang="ts">
import { CdLabel } from '.'

const props = withDefaults(
  defineProps<{
    label: string
    hint?: string
    placeholder?: string
    variant?: 'outlined' | 'filled' | 'underlined'
    required?: boolean
    persistentHint?: boolean
    rules?: Array<(value: string) => boolean | string>
    modelValue?: string
  }>(),
  {
    variant: 'outlined',
    persistentHint: false,
  },
)

const emit = defineEmits(['update:modelValue'])

// Use computed to make v-model work
import { computed } from 'vue'

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
