<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar v-if="authStore.isLoggedIn" />

    <main class="container mx-auto px-4 py-6">
      <router-view />
    </main>

    <NotificationToast />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import Navbar from '@/components/Navbar.vue'
import NotificationToast from '@/components/NotificationToast.vue'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

onMounted(async () => {
  // Initialize notifications from localStorage if available
  notificationsStore.loadNotifications()

  // Check authentication status
  if (authStore.token && !authStore.user) {
    await authStore.getProfile()
  }
})
</script>
