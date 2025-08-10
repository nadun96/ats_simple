<template>
  <div class="app-title">
    <router-link to="/" class="title-link">
      <div class="title-content">
        <v-icon
          size="28"
          color="white"
          class="title-icon mr-3"
        >
          mdi-briefcase-account
        </v-icon>
        <span class="title-text d-none d-sm-inline">Simple ATS</span>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-title {
  display: flex;
  align-items: center;
}

.title-link {
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;
}

.title-link:hover {
  transform: scale(1.02);
}

.title-content {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
}

.title-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.title-text {
  font-size: 1.5rem;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .title-content {
    font-size: 1.1rem;
  }

  .title-text {
    font-size: 1.25rem;
  }

  .title-icon {
    size: 24px;
  }
}

@media (max-width: 600px) {
  .title-content {
    font-size: 1rem;
  }

  .title-text {
    font-size: 1.1rem;
  }

  .title-icon {
    size: 20px;
  }
}
</style>
