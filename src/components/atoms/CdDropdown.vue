<template>
  <div class="styled-dropdown">
    <CdLabel v-if="label" :label="label" :required="required" />
    <select
      :value="modelValue"
      @change="
        $emit('update:modelValue', $event.target ? ($event.target as HTMLSelectElement).value : '')
      "
      :disabled="disabled"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.displayValue }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { CdLabel } from '@/components/atoms'

defineProps<{
  options: { value: string; displayValue: string }[]
  modelValue: string
  label?: string
  required?: boolean
  disabled?: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
.styled-dropdown select {
  appearance: none;
  -webkit-appearance: none;
  background-color: #fff;
  border: 1px solid #abbedb;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  color: #1e293b;
  width: 100%;
  outline: none;
  transition: border 0.2s;
  background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
}

.styled-dropdown select:focus {
  border-color: #3b82f6;
}

.styled-dropdown select:disabled {
  background-color: #f1f5f9; /* light gray */
  color: #94a3b8;           /* muted text */
  cursor: not-allowed;
}

.styled-dropdown option {
  padding: 10px;
}

</style>
