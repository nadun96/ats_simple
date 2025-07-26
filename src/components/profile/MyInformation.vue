<template>
  <v-card flat class="pa-6">
    <v-card-text>
      <v-row> 
        <v-col cols="12" class="d-flex flex-column align-center mb-6">
          <v-avatar size="80" color="grey-lighten-2" class="mb-2">
            <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" />
            <v-icon v-else size="40">mdi-account</v-icon>
          </v-avatar>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="onFileChange"
            style="display: none"
          />

          <v-btn icon color="primary" size="small" variant="text" @click="triggerFileInput">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <p class="text-caption text-grey-darken-1 mt-2">Maximum size 5 MB.</p>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstName"
            label="First name"
            variant="outlined"
            density="compact"
          />
          <v-text-field v-model="innko" label="INNKO" variant="outlined" density="compact" />
          <v-select
            v-model="timeZone"
            label="Time zone"
            :items="timeZones"
            variant="outlined"
            density="compact"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column justify-space-between"
          style="min-height: 300px"
        >
          <div>
            <v-text-field
              v-model="lastName"
              label="Last name"
              variant="outlined"
              density="compact"
            />
            <v-text-field
              v-model="phone"
              label="Phone"
              variant="outlined"
              density="compact"
              prefix="+33"
              type="tel"
            />
            <v-select
              v-model="language"
              label="Language"
              :items="languages"
              variant="outlined"
              density="compact"
            />
          </div>

          <v-btn color="primary" class="mt-4 align-self-end" @click="saveInformation">
            Save information
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const firstName = ref('Jim')
const lastName = ref('')
const innko = ref('INNKO')
const phone = ref('06 65 71 22')
const timeZone = ref('Europe/Paris (UTC+02:00)')
const language = ref('English')

const timeZones = ['Europe/Paris (UTC+02:00)']
const languages = ['English']

const avatarUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const file = files[0]

  if (file.size > 5 * 1024 * 1024) {
    alert('File size exceeds 5 MB limit.')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    avatarUrl.value = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

const saveInformation = () => {
  console.log('Saving:', {
    firstName: firstName.value,
    lastName: lastName.value,
    innko: innko.value,
    phone: phone.value,
    timeZone: timeZone.value,
    language: language.value,
    avatar: avatarUrl.value,
  })
}
</script>

<style scoped>
.v-text-field,
.v-select {
  margin-bottom: 16px;
}
</style>
