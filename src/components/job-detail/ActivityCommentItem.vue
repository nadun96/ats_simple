<template>
  <div class="activity-item">
    <div class="avatar"></div>
    <div class="details">
      <p>
        <strong>{{ comment.user }}</strong> {{ comment.action }}
      </p>
      <small>{{ comment.date }}</small>

      <div v-if="comment.attachments?.length" class="comment-attachments">
        <div v-for="(file, index) in comment.attachments" :key="index" class="attached-file">
          📎 {{ file }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityCommentItem",
  props: {
    comment: Object,
  },
};
</script>

<style scoped>
.activity-item {
  display: flex;
  margin-bottom: 15px;
}
.avatar {
  width: 40px;
  height: 40px;
  background-color: #cbd5e1;
  border-radius: 50%;
  margin-right: 10px;
}
.details {
  flex: 1;
}
.comment-attachments {
  margin-top: 5px;
}
.attached-file {
  background: #f1f5f9;
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 5px;
}
</style>
