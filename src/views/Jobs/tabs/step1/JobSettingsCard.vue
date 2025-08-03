<template>
  <v-card elevation="2" class="mt-6 pa-4 rounded-lg">
    <div class="text-h6 font-weight-bold">Job settings</div>
    <v-divider class="my-2"></v-divider>
    <v-container>
      <v-row>
        <v-col cols="8">
          <CdDropdown
            label="Visibility of the job"
            :required="true"
            :options="visibilityOptions"
            v-model="formData.visibility"
          />
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-2 my-5">
            Internal Reference
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <CdTextInput
            label="Internal Reference"
            placeholder="Enter internal reference"
            v-model="formData.internalReference"
          />
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-2 my-5">
            Tag
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-divider class="my-4"></v-divider>
          <div class="text-subtitle-1 font-weight-medium mb-2">
            Schedule an action
          </div>
          <v-row>
            <v-col cols="6">
              <v-checkbox
                v-model="formData.scheduleAction"
                label="Schedule an action"
                color="primary"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <!-- Empty column for spacing -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CdTextInput, CdDropdown } from '@/components/atoms'

const formData = ref({
  visibility: 'public',
  internalReference: '',
  scheduleAction: false
})

const visibilityOptions = [
  { value: 'public', displayValue: 'Public' },
  { value: 'private', displayValue: 'Private' },
  { value: 'internal', displayValue: 'Internal' }
]
</script>
