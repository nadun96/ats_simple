<template>
  <v-card flat class="pa-6">
    <v-card-text>
      <!-- Password section -->
      <v-sheet
        class="section-container d-flex align-center justify-space-between mb-6"
        elevation="1"
        rounded
      >
        <div class="d-flex align-center">
          <v-icon color="primary" class="icon-bg">mdi-lock</v-icon>
          <div class="ml-4">
            <p class="section-title">Password</p>
            <p class="section-description">
              Please feel free to edit it if you think it may have been compromised.
            </p>
          </div>
        </div>
        <v-btn small text color="primary" aria-label="Edit password" @click="dialog = true">
          Edit
        </v-btn>
      </v-sheet>

      <!-- Two-factor authentication -->
      <v-sheet
        class="section-container d-flex align-center justify-space-between mb-6"
        elevation="1"
        rounded
      >
        <div class="d-flex align-center">
          <v-icon color="primary" class="icon-bg pl-4">mdi-shield-check</v-icon>
          <div class="ml-4">
            <p class="section-title">Two-factor authentication by email</p>
            <p class="section-description">
              Strengthen the security of your account with two-factor authentication: in addition to
              your password, a code will be sent by email for any new connection to your Taleez
              account.
            </p>
          </div>
        </div>
        <v-switch inset />
      </v-sheet>

      <!-- Sessions section -->
      <v-sheet
        class="section-container d-flex align-center justify-space-between"
        elevation="1"
        rounded
      >
        <div class="d-flex align-center">
          <v-icon color="primary" class="icon-bg">mdi-account</v-icon>
          <div class="ml-4">
            <p class="section-title">Sessions</p>
            <p class="section-description">Disconnect all your sessions, including this one.</p>
          </div>
        </div>
        <v-btn outlined color="primary"> Disconnect all sessions </v-btn>
      </v-sheet>
    </v-card-text>

    <!-- Password change dialog -->
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">Change Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="currentPassword"
            label="Current Password"
            type="password"
            outlined
            required
          />
          <v-text-field
            v-model="newPassword"
            label="New Password"
            type="password"
            outlined
            required
          />
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            outlined
            required
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="submitPasswordChange">Change password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const submitPasswordChange = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('New password and confirmation do not match!')
    return
  }
  alert('Password change submitted')
  dialog.value = false

  // Reset fields
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}
</script>

<style scoped>
.section-container {
  background-color: #f4f8fb;
  padding: 16px;
  border-radius: 8px;
}

.icon-bg {
  background-color: #d0e4ff;
  border-radius: 50%;
  padding: 8px;
  font-size: 24px;
  color: #1a73e8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 4px 0;
}

.section-description {
  font-size: 0.85rem;
  color: #555;
  margin: 0;
}

.ml-4 {
  margin-left: 16px;
}

.pl-4 {
  padding-left: 16px;
}
</style>
