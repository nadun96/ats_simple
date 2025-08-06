<template>
  <v-container>
    <v-card elevation="2" class="pa-4 rounded-lg">
      <div class="text-h6 font-weight-bold mb-4">Job Team Assignment</div>
      <v-divider class="my-2"></v-divider>

      <!-- Add Team Member Section -->
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-medium mb-3">Add Team Members</div>
        <v-row>
          <v-col cols="4">
            <CdTextInput
              label="Team Member Email"
              placeholder="Enter email address"
              v-model="newMember.email"
            />
          </v-col>
          <v-col cols="3">
            <CdDropdown
              label="Role"
              :options="roleOptions"
              v-model="newMember.role"
            />
          </v-col>
          <v-col cols="3">
            <CdDropdown
              label="Permission Level"
              :options="permissionOptions"
              v-model="newMember.permission"
            />
          </v-col>
          <v-col cols="2" class="d-flex align-end">
            <CdButton
              text="Add Member"
              @click="addTeamMember"
              :disabled="!newMember.email || !newMember.role"
              block
            />
          </v-col>
        </v-row>
      </div>

      <!-- Current Team Members -->
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium mb-3">Current Team Members</div>
        <v-card variant="outlined" class="pa-4">
          <div v-if="teamMembers.length === 0" class="text-center text-grey py-4">
            No team members assigned yet. Add team members using the form above.
          </div>
          <div v-else>
            <v-row v-for="(member, index) in teamMembers" :key="member.id" class="mb-3">
              <v-col cols="4">
                <div class="d-flex align-center">
                  <v-avatar size="32" class="mr-3" color="primary">
                    <span class="text-white text-caption">
                      {{ getInitials(member.email) }}
                    </span>
                  </v-avatar>
                  <div>
                    <div class="text-body-2 font-weight-medium">{{ member.email }}</div>
                    <div class="text-caption text-grey">{{ getRoleDisplayName(member.role) }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="3">
                <v-chip
                  :color="getRoleColor(member.role)"
                  size="small"
                  variant="outlined"
                >
                  {{ getRoleDisplayName(member.role) }}
                </v-chip>
              </v-col>
              <v-col cols="3">
                <v-chip
                  :color="getPermissionColor(member.permission)"
                  size="small"
                  variant="outlined"
                >
                  {{ getPermissionDisplayName(member.permission) }}
                </v-chip>
              </v-col>
              <v-col cols="2" class="text-right">
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  variant="outlined"
                  @click="editMember(index)"
                  class="mr-2"
                />
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  variant="outlined"
                  color="error"
                  @click="removeMember(index)"
                />
              </v-col>
              <v-divider v-if="index < teamMembers.length - 1" class="mt-3" />
            </v-row>
          </div>
        </v-card>
      </div>

      <!-- Team Settings -->
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium mb-3">Team Settings</div>
        <v-row>
          <v-col cols="6">
            <v-checkbox
              v-model="teamSettings.allowSelfAssignment"
              label="Allow team members to self-assign to applications"
              color="primary"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="teamSettings.requireApproval"
              label="Require approval for application status changes"
              color="primary"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-checkbox
              v-model="teamSettings.notifyOnNewApplications"
              label="Notify team on new applications"
              color="primary"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="teamSettings.shareNotes"
              label="Share application notes with all team members"
              color="primary"
            />
          </v-col>
        </v-row>
      </div>
    </v-card>

    <!-- Edit Member Dialog -->
    <v-dialog v-model="editMemberDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>Edit Team Member</v-card-title>
        <v-divider />
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <CdTextInput
                  label="Email"
                  v-model="editingMember.email"
                  :required="true"
                  disabled
                />
              </v-col>
              <v-col cols="12">
                <CdDropdown
                  label="Role"
                  :options="roleOptions"
                  v-model="editingMember.role"
                />
              </v-col>
              <v-col cols="12">
                <CdDropdown
                  label="Permission Level"
                  :options="permissionOptions"
                  v-model="editingMember.permission"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <CdButton text="Cancel" @click="closeEditDialog" />
          <CdButton text="Save" @click="saveEditedMember" variant="elevated" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CdButton, CdTextInput, CdDropdown } from '@/components/atoms'

interface TeamMember {
  id: string
  email: string
  role: string
  permission: string
}

const teamMembers = ref<TeamMember[]>([])
const editMemberDialog = ref(false)
const editingIndex = ref(-1)

const newMember = ref({
  email: '',
  role: '',
  permission: 'read'
})

const editingMember = ref({
  email: '',
  role: '',
  permission: ''
})

const teamSettings = ref({
  allowSelfAssignment: false,
  requireApproval: true,
  notifyOnNewApplications: true,
  shareNotes: false
})

const roleOptions = [
  { value: '', displayValue: 'Select Role' },
  { value: 'hiring_manager', displayValue: 'Hiring Manager' },
  { value: 'recruiter', displayValue: 'Recruiter' },
  { value: 'interviewer', displayValue: 'Interviewer' },
  { value: 'coordinator', displayValue: 'HR Coordinator' },
  { value: 'reviewer', displayValue: 'Reviewer' }
]

const permissionOptions = [
  { value: 'read', displayValue: 'Read Only' },
  { value: 'write', displayValue: 'Read & Write' },
  { value: 'admin', displayValue: 'Admin' }
]

let memberIdCounter = 1

const addTeamMember = () => {
  if (!newMember.value.email || !newMember.value.role) {
    alert('Please fill in all required fields')
    return
  }

  // Check if member already exists
  const exists = teamMembers.value.some(member => member.email === newMember.value.email)
  if (exists) {
    alert('This team member is already added')
    return
  }

  teamMembers.value.push({
    id: `member_${memberIdCounter++}`,
    email: newMember.value.email,
    role: newMember.value.role,
    permission: newMember.value.permission
  })

  // Reset form
  newMember.value = {
    email: '',
    role: '',
    permission: 'read'
  }
}

const editMember = (index: number) => {
  editingIndex.value = index
  editingMember.value = { ...teamMembers.value[index] }
  editMemberDialog.value = true
}

const removeMember = (index: number) => {
  teamMembers.value.splice(index, 1)
}

const saveEditedMember = () => {
  if (editingIndex.value !== -1) {
    teamMembers.value[editingIndex.value] = { ...editingMember.value }
  }
  closeEditDialog()
}

const closeEditDialog = () => {
  editMemberDialog.value = false
  editingIndex.value = -1
}

const getInitials = (email: string) => {
  return email.substring(0, 2).toUpperCase()
}

const getRoleDisplayName = (role: string) => {
  const option = roleOptions.find(opt => opt.value === role)
  return option ? option.displayValue : role
}

const getPermissionDisplayName = (permission: string) => {
  const option = permissionOptions.find(opt => opt.value === permission)
  return option ? option.displayValue : permission
}

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    hiring_manager: 'primary',
    recruiter: 'success',
    interviewer: 'info',
    coordinator: 'warning',
    reviewer: 'secondary'
  }
  return colors[role] || 'grey'
}

const getPermissionColor = (permission: string) => {
  const colors: Record<string, string> = {
    read: 'grey',
    write: 'primary',
    admin: 'error'
  }
  return colors[permission] || 'grey'
}
</script>
