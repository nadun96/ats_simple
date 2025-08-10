<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add collaborators</h3>
        <button class="clear-btn" @click="$emit('close')">clear</button>
      </div>

      <div class="modal-body">
        <img
          src="https://via.placeholder.com/60"
          alt="search icon"
          class="search-icon"
        />
        <p class="no-result">No results</p>
        <a href="#" class="invite-link" @click.prevent="$emit('invite')">
          Invite a new collaborator
        </a>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('close')">Cancel</button>
        <button class="add-btn" disabled>Add collaborators</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCollaboratorModal"
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  border-radius: 8px;
  width: 400px;
  padding: 16px;
}
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
.modal-body {
  text-align: center;
  margin: 20px 0;
}
.search-icon {
  margin-bottom: 10px;
}
.no-result {
  color: #777;
  margin-bottom: 15px;
}
.invite-link {
  color: #0066cc;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.cancel-btn {
  background: #f0f0f0;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
}
.add-btn {
  background: #ccc;
  border: none;
  padding: 6px 12px;
  color: white;
}
</style>
