<script>
export default {
  name: 'NavBar',
}
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-blue-600">Todo App</h1>
          <div class="hidden md:flex space-x-4">
            <RouterLink
              to="/dashboard"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'dashboard' }"
            >
              Tableau de bord
            </RouterLink>
            <RouterLink
              to="/tasks"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'tasks' }"
            >
              Mes Tâches
            </RouterLink>
            <RouterLink
              to="/notifications"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium relative"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'notifications' }"
            >
              Notifications
              <span
                v-if="notificationsStore.notifications.length > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ notificationsStore.notifications.length }}
              </span>
            </RouterLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-700">Bonjour, {{ authStore.user?.full_name }}</div>
          <button
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
