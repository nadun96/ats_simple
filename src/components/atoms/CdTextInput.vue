<template>
  <label>
    {{ label }}
    <span v-if="required" class="required-indicator">*</span>
  </label>
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

<style scoped>
.required-indicator {
  color: #d32f2f;
}
</style>
