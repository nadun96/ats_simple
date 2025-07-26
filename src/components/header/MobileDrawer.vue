<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    width="280"
    class="d-flex d-md-none"
  >
    <v-list>
      <v-list-item class="px-4 py-3">
        <v-list-item-title class="text-h6 font-weight-bold text-primary">
          Simple ATS
        </v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item class="px-4 py-2">
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn
              color="success"
              variant="elevated"
              prepend-icon="mdi-plus"
              append-icon="mdi-chevron-down"
              block
              class="text-none"
              v-bind="props"
            >
              Create New
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="item in createItems" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-item v-for="item in navItems" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-list-group v-for="group in navGroups" :key="group.title" :value="group.title">
        <template #activator="{ props }">
          <v-list-item v-bind="props" class="my-1">
            <v-list-item-icon>
              <v-icon>{{ group.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ group.title }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item v-for="subItem in group.items" :key="subItem" link class="pl-12">
          <v-list-item-title>{{ subItem }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createItems, navItems, navGroups } from '@/data/navItems'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const drawer = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})
</script>
