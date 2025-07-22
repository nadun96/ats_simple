<template>
  <v-card elevation="2" class="mt-6 pa-4 rounded-lg">
    <form @submit.prevent="submitForm">
      <div class="text-h6 font-weight-bold">The Society</div>
      <v-divider class="my-2"></v-divider>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-row>
              <v-col cols="6">
                <!-- <CdTextInput
                :label="'Company Name'"
                :placeholder="'Enter the name of your company'"
                :required="true"
                @update:modelValue="onInputChange"
              ></CdTextInput> -->
                <CdTextInput
                  :label="'Company Name'"
                  :placeholder="'Enter the name of your company'"
                  :required="true"
                  v-model="formData.companyName"
                ></CdTextInput>
              </v-col>
              <v-col cols="6">
                <CdTextInput
                  :label="'URL of your site'"
                  :placeholder="'Enter the URL of your company site'"
                  :required="true"
                  @update:modelValue="onInputChange"
                ></CdTextInput>
              </v-col>
              <v-col cols="12" class="mb-2">
                <CdRichTextEditor label="Company description" :required="true" />
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
            <BaseInput v-model="firstName" label="first name"></BaseInput>
            <p>{{ firstName }}</p>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </v-card>
</template>

<script setup lang="ts">
import { CdTextInput } from '@/components/atoms'
import CdButton from '@/components/atoms/CdButton.vue'
import CdDropzone from '@/components/atoms/CdDropzone.vue'
import BaseInput from '@/components/BaseInput.vue'
import { CdRichTextEditor } from '@/components/molecules'
import { ref } from 'vue'

const firstName = ref('')
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const formData = reactive({
  companyName: '',
})

const rules = {
  companyName: { required },
}

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    alert('success' + formData.companyName)
  } else {
    alert('error')
  }
}

const onInputChange = (value: string) => {
  console.log('text field updated:', value)
}
</script>
