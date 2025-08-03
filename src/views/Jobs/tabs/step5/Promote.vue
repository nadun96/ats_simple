<template>
  <v-container>
    <v-card elevation="2" class="pa-4 rounded-lg">
      <div class="text-h6 font-weight-bold mb-4">Job Promotion Settings</div>
      <v-divider class="my-2"></v-divider>

      <!-- Publication Settings -->
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-medium mb-3">Publication Settings</div>
        <v-row>
          <v-col cols="6">
            <CdDropdown
              label="Publication Status"
              :options="publicationStatusOptions"
              v-model="promotionSettings.publicationStatus"
              :required="true"
            />
          </v-col>
          <v-col cols="6">
            <CdTextInput
              label="Publication Date"
              type="date"
              v-model="promotionSettings.publicationDate"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <CdTextInput
              label="Application Deadline"
              type="date"
              v-model="promotionSettings.applicationDeadline"
            />
          </v-col>
          <v-col cols="6">
            <CdDropdown
              label="Job Duration"
              :options="durationOptions"
              v-model="promotionSettings.duration"
            />
          </v-col>
        </v-row>
      </div>

      <!-- Promotion Channels -->
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-medium mb-3">Promotion Channels</div>
        <v-card variant="outlined" class="pa-4">
          <v-row>
            <v-col cols="6" v-for="channel in promotionChannels" :key="channel.id">
              <v-card class="pa-3 mb-3" :color="channel.enabled ? 'primary' : 'grey-lighten-4'" variant="outlined">
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-icon :icon="channel.icon" class="mr-3" :color="channel.enabled ? 'white' : 'grey'" />
                    <div>
                      <div class="text-body-2 font-weight-medium" :class="channel.enabled ? 'text-white' : 'text-grey'">
                        {{ channel.name }}
                      </div>
                      <div class="text-caption" :class="channel.enabled ? 'text-white' : 'text-grey'">
                        {{ channel.description }}
                      </div>
                    </div>
                  </div>
                  <v-switch
                    v-model="channel.enabled"
                    color="white"
                    hide-details
                    @change="toggleChannel(channel.id)"
                  />
                </div>
                <div v-if="channel.enabled && channel.settings" class="mt-3">
                  <v-divider :color="channel.enabled ? 'white' : 'grey'" class="mb-2" />
                  <div v-for="setting in channel.settings" :key="setting.key" class="mb-2">
                    <CdTextInput
                      :label="setting.label"
                      :placeholder="setting.placeholder"
                      v-model="setting.value"
                      density="compact"
                    />
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </div>

      <!-- SEO Settings -->
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-medium mb-3">SEO Settings</div>
        <v-row>
          <v-col cols="12">
            <CdTextInput
              label="Meta Title"
              placeholder="Job title - Company name"
              v-model="seoSettings.metaTitle"
              hint="Recommended: 50-60 characters"
              persistent-hint
            />
          </v-col>
          <v-col cols="12">
            <CdTextInput
              label="Meta Description"
              placeholder="Brief description of the job opportunity"
              v-model="seoSettings.metaDescription"
              hint="Recommended: 150-160 characters"
              persistent-hint
            />
          </v-col>
          <v-col cols="12">
            <CdTextInput
              label="Keywords"
              placeholder="job title, skills, location (comma separated)"
              v-model="seoSettings.keywords"
              hint="Separate keywords with commas"
              persistent-hint
            />
          </v-col>
        </v-row>
      </div>

      <!-- Promotion Analytics -->
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium mb-3">Analytics & Tracking</div>
        <v-row>
          <v-col cols="6">
            <v-checkbox
              v-model="analyticsSettings.enableTracking"
              label="Enable application source tracking"
              color="primary"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="analyticsSettings.enableConversionTracking"
              label="Enable conversion tracking"
              color="primary"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <CdTextInput
              label="UTM Campaign"
              placeholder="job-posting-2024"
              v-model="analyticsSettings.utmCampaign"
              hint="For tracking marketing campaigns"
              persistent-hint
            />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CdButton, CdTextInput, CdDropdown } from '@/components/atoms'

interface PromotionChannel {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  settings?: {
    key: string
    label: string
    placeholder: string
    value: string
  }[]
}

const promotionSettings = ref({
  publicationStatus: 'draft',
  publicationDate: '',
  applicationDeadline: '',
  duration: ''
})

const seoSettings = ref({
  metaTitle: '',
  metaDescription: '',
  keywords: ''
})

const analyticsSettings = ref({
  enableTracking: true,
  enableConversionTracking: false,
  utmCampaign: ''
})

const publicationStatusOptions = [
  { value: 'draft', displayValue: 'Draft' },
  { value: 'scheduled', displayValue: 'Scheduled' },
  { value: 'published', displayValue: 'Published' },
  { value: 'paused', displayValue: 'Paused' },
  { value: 'closed', displayValue: 'Closed' }
]

const durationOptions = [
  { value: '', displayValue: 'Select Duration' },
  { value: '30', displayValue: '30 days' },
  { value: '60', displayValue: '60 days' },
  { value: '90', displayValue: '90 days' },
  { value: 'indefinite', displayValue: 'Until filled' }
]

const promotionChannels = ref<PromotionChannel[]>([
  {
    id: 'company_website',
    name: 'Company Website',
    description: 'Post on your company careers page',
    icon: 'mdi-web',
    enabled: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Share on LinkedIn company page',
    icon: 'mdi-linkedin',
    enabled: false,
    settings: [
      {
        key: 'companyPage',
        label: 'Company Page URL',
        placeholder: 'https://linkedin.com/company/your-company',
        value: ''
      }
    ]
  },
  {
    id: 'indeed',
    name: 'Indeed',
    description: 'Post to Indeed job board',
    icon: 'mdi-briefcase-search',
    enabled: false,
    settings: [
      {
        key: 'budget',
        label: 'Daily Budget',
        placeholder: '$10',
        value: ''
      }
    ]
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    description: 'Promote on Glassdoor',
    icon: 'mdi-office-building',
    enabled: false
  },
  {
    id: 'social_media',
    name: 'Social Media',
    description: 'Share on social platforms',
    icon: 'mdi-share-variant',
    enabled: false,
    settings: [
      {
        key: 'platforms',
        label: 'Platforms',
        placeholder: 'Twitter, Facebook, Instagram',
        value: ''
      }
    ]
  },
  {
    id: 'email',
    name: 'Email Newsletter',
    description: 'Send to email subscribers',
    icon: 'mdi-email',
    enabled: false,
    settings: [
      {
        key: 'emailList',
        label: 'Email List',
        placeholder: 'Select email list',
        value: ''
      }
    ]
  }
])

const toggleChannel = (channelId: string) => {
  const channel = promotionChannels.value.find(c => c.id === channelId)
  if (channel) {
    console.log(`${channel.name} ${channel.enabled ? 'enabled' : 'disabled'}`)
  }
}
</script>
