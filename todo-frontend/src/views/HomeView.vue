<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            Bonjour, {{ authStore.user?.full_name }} 👋
          </h1>
          <p class="text-gray-600 mt-2">Voici un aperçu de vos tâches aujourd'hui</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-600">
            {{
              new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100">
            <svg
              class="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total des tâches</p>
            <p class="text-2xl font-semibold text-gray-900">{{ tasksStore.totalTasks }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100">
            <svg
              class="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tâches terminées</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ tasksStore.completedTasks.length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100">
            <svg
              class="h-6 w-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">En attente</p>
            <p class="text-2xl font-semibold text-gray-900">{{ tasksStore.pendingTasks.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100">
            <svg
              class="h-6 w-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Progression</p>
            <p class="text-2xl font-semibold text-gray-900">{{ tasksStore.completionRate }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Progression globale</h3>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
          :style="{ width: tasksStore.completionRate + '%' }"
        ></div>
      </div>
      <p class="text-sm text-gray-600 mt-2">
        {{ tasksStore.completedTasks.length }} sur {{ tasksStore.totalTasks }} tâches terminées
      </p>
    </div>

    <!-- Recent Tasks -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Tâches récentes</h3>
        <RouterLink to="/tasks" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Voir toutes les tâches →
        </RouterLink>
      </div>

      <div v-if="tasksStore.loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="recentTasks.length === 0" class="text-center py-8">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune tâche</h3>
        <p class="mt-1 text-sm text-gray-500">Commencez par créer votre première tâche.</p>
        <div class="mt-6">
          <RouterLink
            to="/tasks"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Créer une tâche
          </RouterLink>
        </div>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="task in recentTasks"
          :key="task.id"
          class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task)"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div class="ml-3 flex-1">
            <p
              class="text-sm font-medium text-gray-900"
              :class="{ 'line-through text-gray-500': task.completed }"
            >
              {{ task.title }}
            </p>
            <p
              v-if="task.description"
              class="text-sm text-gray-500 mt-1"
              :class="{ 'line-through': task.completed }"
            >
              {{ task.description }}
            </p>
          </div>
          <span class="text-xs text-gray-400">
            {{ formatRelativeTime(task.created_at) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouterLink
          to="/tasks"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg
              class="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div class="ml-4">
            <h4 class="text-sm font-medium text-gray-900">Créer une nouvelle tâche</h4>
            <p class="text-sm text-gray-500">Ajouter une tâche à votre liste</p>
          </div>
        </RouterLink>

        <RouterLink
          to="/notifications"
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
        >
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg
              class="h-6 w-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-5 5v-5zM11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h4v-5l5-5V7a2 2 0 00-2-2h-5"
              />
            </svg>
          </div>
          <div class="ml-4">
            <h4 class="text-sm font-medium text-gray-900">Voir les notifications</h4>
            <p class="text-sm text-gray-500">
              {{ notificationsStore.notifications.length }} nouvelle(s) notification(s)
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'
import { useNotificationsStore } from '@/stores/notifications'

const authStore = useAuthStore()
const tasksStore = useTasksStore()
const notificationsStore = useNotificationsStore()

// Computed properties
const recentTasks = computed(() => {
  return tasksStore.tasks.slice(0, 5) // Afficher les 5 dernières tâches
})

// Methods
const toggleTask = async (task) => {
  await tasksStore.updateTask(task.id, {
    completed: !task.completed,
  })
}

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.abs(now - date) / (1000 * 60 * 60)

  if (diffInHours < 1) {
    return 'Il y a quelques minutes'
  } else if (diffInHours < 24) {
    return `Il y a ${Math.floor(diffInHours)} heure(s)`
  } else {
    return `Il y a ${Math.floor(diffInHours / 24)} jour(s)`
  }
}

// Lifecycle
onMounted(async () => {
  await tasksStore.fetchTasks()
})
</script>
