<template>
  <div class="job-team">
    <h3 class="title">Who should monitor job?</h3>
    <p class="subtitle">
      Added collaborators will receive notifications and will be able to comment and rate candidate profiles.
    </p>

    <div class="cards-container">
      <CollaboratorCard
        name="Jim INIKO"
        email="jim@otrading.info"
        role="Admin"
        :notifications="true"
        isOwner
      />
      <AddCollaboratorCard @add-collaborator="showAddModal = true" />
    </div>

    <!-- First popup -->
    <AddCollaboratorModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @invite="openInviteModal"
    />

    <!-- Second popup -->
    <InviteCollaboratorModal
      v-if="showInviteModal"
      @close="closeInviteModal"
    />
  </div>
</template>

<script>
import CollaboratorCard from "./CollaboratorCard.vue";
import AddCollaboratorCard from "./AddCollaboratorCard.vue";
import AddCollaboratorModal from "./AddCollaboratorModal.vue";
import InviteCollaboratorModal from "./InviteCollaboratorModal.vue";

export default {
  name: "JobTeam",
  components: {
    CollaboratorCard,
    AddCollaboratorCard,
    AddCollaboratorModal,
    InviteCollaboratorModal
  },
  data() {
    return {
      showAddModal: false,
      showInviteModal: false
    };
  },
  methods: {
    openInviteModal() {
      this.showAddModal = false;
      this.showInviteModal = true;
    },
    closeInviteModal() {
      this.showInviteModal = false;
    }
  }
};
</script>

<style scoped>
.job-team {
  padding: 16px;
}
.title {
  font-weight: bold;
}
.subtitle {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}
.cards-container {
  display: flex;
  gap: 20px;
}
</style>
