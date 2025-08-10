<template>
  <div class="collaborator-card">
    <div class="header">
      <img class="avatar" src="https://via.placeholder.com/40" alt="avatar" />
      <div>
        <div class="name">{{ name }} <span v-if="isOwner">(You)</span></div>
        <div class="email">{{ email }}</div>
      </div>
      <button class="close-btn">close</button>
    </div>

    <div class="tags">
      <span class="tag role">{{ role }}</span>
      <span v-if="notifications" class="tag notify">notifications</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollaboratorCard",
  props: {
    name: String,
    email: String,
    role: String,
    notifications: Boolean,
    isOwner: Boolean,
  },
};
</script>

<style scoped>
.collaborator-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  width: 250px;
  background: white;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.avatar {
  border-radius: 50%;
  margin-right: 10px;
}
.name {
  font-weight: bold;
}
.email {
  font-size: 12px;
  color: #777;
}
.close-btn {
  border: none;
  background: transparent;
  cursor: pointer;
}
.tags {
  margin-top: 8px;
}
.tag {
  display: inline-block;
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 4px;
  background: #f0f0f0;
  margin-right: 5px;
}
.role {
  background-color: #e6f0ff;
  color: #3366ff;
}
.notify {
  background-color: #fff2e6;
  color: #ff6600;
}
</style>
