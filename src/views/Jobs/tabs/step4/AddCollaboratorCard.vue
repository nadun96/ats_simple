<template>
  <div class="add-card" @click="$emit('add-collaborator')">
    <div class="icon">+</div>
    <div class="text">Add collaborators</div>
  </div>
</template>

<script>
export default {
  name: "AddCollaboratorCard",
};
</script>

<style scoped>
.add-card {
  width: 250px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}
.add-card:hover {
  border-color: #666;
}
.icon {
  font-size: 24px;
  font-weight: bold;
  color: #666;
}
.text {
  font-size: 14px;
  margin-top: 5px;
  color: #333;
}
</style>
