<script>
export default {
  name: 'NavBar',
}
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-md shadow-soft border-b border-white/20 sticky top-0 z-40">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-8">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-medium">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-primary-600">TaskFlow</h1>
          </div>
          <div class="hidden md:flex space-x-2">
            <RouterLink
              to="/dashboard"
              class="text-secondary-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover-lift"
              :class="{ 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-medium': $route.name === 'dashboard' }"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z"/>
                </svg>
                <span>Tableau de bord</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/tasks"
              class="text-secondary-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover-lift"
              :class="{ 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-medium': $route.name === 'tasks' }"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <span>Mes Tâches</span>
              </div>
            </RouterLink>
            <RouterLink
              to="/notifications"
              class="text-secondary-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover-lift relative"
              :class="{ 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-medium': $route.name === 'notifications' }"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h4v-5l5-5V7a2 2 0 00-2-2h-5"/>
                </svg>
                <span>Notifications</span>
              </div>
              <span
                v-if="notificationsStore.notifications.length > 0"
                class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-medium animate-pulse"
              >
                {{ notificationsStore.notifications.length }}
              </span>
            </RouterLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="hidden sm:flex items-center space-x-3 bg-secondary-50 rounded-xl px-4 py-2">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-sm font-semibold">{{ authStore.user?.full_name?.charAt(0) }}</span>
            </div>
            <div class="text-sm">
              <div class="font-medium text-secondary-900">{{ authStore.user?.full_name }}</div>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-medium hover-lift flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span>Déconnexion</span>
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
