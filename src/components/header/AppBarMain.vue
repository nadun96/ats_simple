<template>
    <v-app-bar color="primary" dark elevation="2" height="56" app>
    <v-container fluid class="d-flex align-center px-2 px-md-4">
      <!-- Mobile Menu Button (only on mobile) -->
      <MobileMenu @toggle-drawer="$emit('toggle-drawer')" class="d-flex d-md-none mr-2"/>

      <!-- Brand Logo -->
      <ToolBarTitle class="mr-2 mr-md-4" />

      <!-- Create Button (conditional rendering based on screen size) -->
      <CreateButton v-if="isDesktop" class="mr-2" />

      <!-- Navigation Items (only on desktop) -->
      <NavigationItems class="d-none d-md-flex" />

      <v-spacer></v-spacer>

      <!-- Right Side Icons (hide on small screens) -->
      <RightSideicons class="d-none d-sm-flex" />
    </v-container>
  </v-app-bar>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CreateButton from '@/components/header/CreateButton.vue';
import NavigationItems from '@/components/header/NavigationItems.vue';
import RightSideicons from '@/components/header/HeaderRightSideIcons.vue';
import ToolBarTitle from '@/components/header/ToolBarTitle.vue';
import MobileMenu from '@/components/header/MobileMenu.vue';

const emit = defineEmits<{
  'toggle-drawer': []
}>()

// Reactive variable to track screen size
const isDesktop = ref(false)

// Function to check if screen is desktop size
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1024 // Desktop breakpoint
}

// Set up screen size tracking
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AppBarMain',
  components: {
    CreateButton,
    NavigationItems,
    RightSideicons,
    ToolBarTitle,
    MobileMenu
  }
})
</script>


