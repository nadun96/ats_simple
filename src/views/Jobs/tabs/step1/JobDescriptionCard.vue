<script setup lang="ts">
import { CdButton, CdTextInput } from '@/components/atoms'
import { CdRichTextEditor } from '@/components/molecules'
import CountryAndCitySelect from '@/views/Jobs/tabs/components/CountryAndCitySelect.vue'
</script>

<template>
  <v-card elevation="2" class="mt-6 pa-4 rounded-lg">
    <div class="text-h6 font-weight-bold">Job description</div>
    <v-divider class="my-2"></v-divider>
    <v-container>
      <v-row>
        <v-col cols="8">
          <CdTextInput
            label="Job title"
            placeholder="Space mission manager F/M"
            :required="true"
          ></CdTextInput>
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-2 my-5">
            Choose a short and precise title, avoid mentioning the city or the type of contract in
            the title. Also avoid anglicisms.
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <CountryAndCitySelect />
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-2 my-5">
            An accurate location will help you find the most geographically suitable candidates.
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="mb-2">
          <CdRichTextEditor label="Job description" :required="true" />
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-2 mt-6">
            The job description is an important step in attracting the right candidates. Describe
            the missions, issues and responsibilities linked to the profession concerned. <br />(200
            characters minimum)
          </div>
          <CdButton text="Generate with AI" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="mb-2">
          <CdRichTextEditor label="Candidate profile" :required="true" />
        </v-col>
        <v-col cols="4">
          <div class="text-subtitle-2 mt-6">
            Describe your ideal candidate for this position (education, experience, qualities, and
            skills).<br /><br />
            However, be careful not to overstate your requirements, as it might discourage some
            candidates.
          </div>
          <CdButton text="Generate with AI" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
