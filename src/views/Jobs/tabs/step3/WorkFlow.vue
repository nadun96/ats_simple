<template>
  <v-card class="main-container">
    <div>New</div>
    <v-container class="action-container">
      <v-btn class="action-icon" icon>
        <v-icon>mdi-lightning-bolt</v-icon>
      </v-btn>
    </v-container>
  </v-card>
  <v-card class="main-container">
    <div>New</div>
    <v-container class="action-container">
      <v-btn class="action-icon" icon>
        <v-icon>mdi-lightning-bolt</v-icon>
      </v-btn>
      <div class="menu-icon">
        <v-icon>mdi-dots-horizontal</v-icon>
        <v-menu v-model="menu" activator="parent" location="bottom end" offset="4">
          <v-list
            bg-color="surface-light"
            class="d-flex flex-column ga-1 pa-1"
            density="compact"
            rounded="lg"
            variant="text"
            slim
          >
            <v-list-item
              prepend-icon="mdi-pencil"
              rounded="lg"
              title="Rename"
              link
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-delete"
              rounded="lg"
              title="Delete"
              link
            ></v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'

const menu = shallowRef(false)


</script>

<style scoped>
.main-container {
  background: #f7f9fc;
  padding-inline: 10px;
  border-radius: 5px;
  margin-block: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.action-container {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;
}
.menu-icon {
  height: 30px;
}
</style>
