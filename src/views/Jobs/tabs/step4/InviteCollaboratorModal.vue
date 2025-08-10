<template>
  <div class="modal-overlay">
    <div class="modal-content" ref="modal">
      <!-- Header -->
      <div class="modal-header">
        <h3>Invite collaborators</h3>
        <button class="clear-btn" @click="$emit('close')">clear</button>
      </div>

      <!-- Body: 3 rows (email + custom dropdown per your request) -->
      <div class="modal-body">
        <div
          v-for="(collab, index) in collaborators"
          :key="index"
          class="collab-row"
        >
          <!-- Email input with visible border -->
          <input
            type="email"
            v-model="collab.email"
            placeholder="Email address"
            class="email-input"
          />

          <!-- Custom dropdown (so each option can show name + description) -->
          <div
            class="custom-select"
            :class="{ open: collab.roleOpen }"
            @click.stop="toggleRoleList(index)"
          >
            <div class="selected">
              {{ collab.role || "Select role" }}
              <span class="caret">▾</span>
            </div>

            <!-- Options panel; shows name + description -->
            <div v-if="collab.roleOpen" class="options">
              <div
                v-for="role in roles"
                :key="role.name"
                class="option"
                @click.stop="selectRole(index, role)"
              >
                <div class="option-name">{{ role.name }}</div>
                <div class="option-desc">{{ role.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error (separate line so buttons don't merge) -->
      <div v-if="errorMessage" class="error-line">
        <span class="error-msg">{{ errorMessage }}</span>
      </div>

      <!-- Footer: buttons -->
      <div class="modal-footer">
        <div></div> <!-- spacer to push buttons right -->
        <div class="footer-controls">
          <button class="cancel-btn" @click="$emit('close')">Cancel</button>
          <button class="send-btn" @click="sendInvitations">Send invitations →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  InviteCollaboratorModal.vue
  - Custom dropdown used so each option can contain both name and description (displayed inside list)
  - Default 3 rows (user requested 3 couples)
  - Validation: at least one row with email + role
  - On success: console.log(JSON array) and emit close
*/
export default {
  name: "InviteCollaboratorModal",
  data() {
    return {
      // three rows as requested
      collaborators: [
        { email: "", role: "", roleDescription: "", roleOpen: false },
        { email: "", role: "", roleDescription: "", roleOpen: false },
        { email: "", role: "", roleDescription: "", roleOpen: false }
      ],

      // roles with descriptions (you asked for JSON-like structure)
      roles: [
        {
          name: "Admin",
          description:
            "They have all rights on the account: recruitments, management of members and subscriptions."
        },
        {
          name: "Recruiter",
          description:
            "They have access to the CV database and can manage all recruitments, create new ones, and distribute them."
        },
        {
          name: "Manager",
          description:
            "They can only manage the recruitments to which they are associated but can create new ones and distribute them."
        },
        {
          name: "Contributor",
          description:
            "They can only manage the candidates of the recruitments to which they are associated: comment on them, evaluate them, contact them, and move them."
        },
        {
          name: "Reader",
          description:
            "They can comment and evaluate the candidates of the recruitments to which they are associated but cannot contact or move them."
        }
      ],

      errorMessage: ""
    };
  },
  methods: {
    // open/close dropdown for a row (closes other rows)
    toggleRoleList(index) {
      this.collaborators.forEach((c, i) => {
        if (i === index) c.roleOpen = !c.roleOpen;
        else c.roleOpen = false;
      });
    },

    // pick a role: set role name + description and close list
    selectRole(index, role) {
      const c = this.collaborators[index];
      c.role = role.name;
      c.roleDescription = role.description;
      c.roleOpen = false;
    },

    // send invitations: require at least one filled row with email + role
    sendInvitations() {
      const filled = this.collaborators
        .filter((c) => c.email && c.role)
        .map((c) => ({
          email: c.email,
          role: c.role,
          roleDescription: c.roleDescription
        }));

      if (filled.length === 0) {
        this.errorMessage = "Please fill at least one email and select a role.";
        // keep modal open and show error line (above buttons)
        return;
      }

      // success: clear error, print JSON to console, close modal
      this.errorMessage = "";
      console.log("Invitations payload:", JSON.stringify(filled, null, 2));

      // emit close to parent to close modal
      this.$emit("close");
    },

    // Click outside modal to close any open role lists
    handleDocumentClick(e) {
      const modal = this.$refs.modal;
      if (!modal) return;
      if (!modal.contains(e.target)) {
        this.collaborators.forEach((c) => (c.roleOpen = false));
      }
    }
  },
  mounted() {
    // close dropdowns when clicking outside modal
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeUnmount() {
    // remove the listener (Vue 3). If you use Vue 2, change to beforeDestroy()
    document.removeEventListener("click", this.handleDocumentClick);
  }
};
</script>

<style scoped>
/* overlay/modal box */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  border-radius: 8px;
  width: 640px; /* wider so role descriptions fit nicely */
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

/* header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

/* body rows */
.modal-body {
  margin-top: 12px;
}
.collab-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}

/* email input */
.email-input {
  flex: 1 1 60%;
  border: 1px solid #cfcfcf; /* visible border */
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

/* custom select (acts like a dropdown) */
.custom-select {
  flex: 1 1 40%;
  position: relative;
  border: 1px solid #cfcfcf; /* visible border */
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  box-sizing: border-box;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding: 6px 10px;
}
.custom-select .selected {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-select .caret {
  margin-left: 8px;
  color: #666;
}

/* options panel */
.custom-select .options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  border-radius: 6px;
  z-index: 50;
  max-height: 220px;
  overflow: auto;
  padding: 8px;
}

/* each option shows name + description */
.option {
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
}
.option + .option {
  margin-top: 6px;
}
.option:hover {
  background: #f5f7fb;
}
.option-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}
.option-desc {
  font-size: 12px;
  color: #666;
}

/* error line above footer to avoid merging with buttons */
.error-line {
  margin-top: 6px;
  min-height: 20px; /* keeps layout stable when showing/hiding */
}
.error-msg {
  color: #b71c1c;
  font-size: 13px;
}

/* footer */
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
.footer-controls {
  display: flex;
  gap: 10px;
}
.cancel-btn {
  background: #f0f0f0;
  border: none;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 6px;
}
.send-btn {
  background: #0b79ff;
  border: none;
  padding: 8px 14px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
}
</style>
