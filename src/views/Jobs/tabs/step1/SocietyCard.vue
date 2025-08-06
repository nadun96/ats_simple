<template>
  <v-card elevation="2" class="mt-6 pa-4 rounded-lg">
    <v-form ref="formRef">
      <div class="text-h6 font-weight-bold">The Society</div>
      <v-divider class="my-2"></v-divider>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-row>
              <v-col cols="6">
                <CdTextInput
                  :label="'Company Name'"
                  :placeholder="'Enter the name of your company'"
                  :required="true"
                  :rules="validationRules.companyName"
                  v-model="formData.companyName"
                ></CdTextInput>
              </v-col>
              <v-col cols="6">
                <CdTextInput
                  :label="'URL of your site'"
                  :placeholder="'Enter the URL of your company site'"
                  :required="true"
                  :rules="validationRules.url"
                  v-model="formData.url"
                ></CdTextInput>
              </v-col>
              <v-col cols="12" class="mb-2">
                <CdRichTextEditor
                  label="Company description"
                  :required="true"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <div class="text-subtitle-2 my-5">
              The URL allows the candidate to learn more and become interested in your company.
            </div>
            <div class="text-subtitle-2 my-5">
              The company description will be displayed at the top of your job posting.
            </div>
            <CdButton type="submit" text="Insert example" />
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-col cols="3" class="mb-2">
                <CdDropzone dropzoneId="dropzone-1" label="Company logo" />
              </v-col>
              <v-col cols="9" class="mb-2">
                <CdDropzone dropzoneId="dropzone-2" label="Offer page banner" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <div class="text-subtitle-2 mt-5">Logo (recommended size):</div>
            <div class="text-subtitle-2">1024x1024px, up to 5 MB</div>
            <div class="text-subtitle-2 mt-5">Banner (recommended size):</div>
            <div class="text-subtitle-2">1920x270px, up to 5 MB</div>
            <CdButton text="Banner Library" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { CdTextInput } from '@/components/atoms'
import CdButton from '@/components/atoms/CdButton.vue'
import CdDropzone from '@/components/atoms/CdDropzone.vue'
import { CdRichTextEditor } from '@/components/molecules'

import { reactive, ref } from 'vue'

const formRef = ref()

const formData = reactive({
  companyName: '',
  url: '',
})

const validationRules = {
  companyName: [
    (v: string) => !!v || 'Company name is required',
    (v: string) => v.length >= 3 || 'Minimum 3 characters required',
  ],
  url: [
    (v: string) => !!v || 'URL is required',
    (v: string) => /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/.test(v) || 'Enter a valid URL',
  ],
  // companyDescription: [(v: string) => !!v || 'Description is required'],
}

const isValid = async () => {
  const result = await formRef.value?.validate?.()
  return result?.valid ?? false
}

// expose form data and validation method
defineExpose({
  formData,
  isValid,
})
</script>
