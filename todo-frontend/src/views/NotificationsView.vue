<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Notifications</h1>
          <p class="text-gray-600 mt-2">Restez informé de l'activité de vos tâches</p>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-sm text-gray-500">
            {{ notificationsStore.notifications.length }} notification(s)
          </span>
          <button
            v-if="notificationsStore.notifications.length > 0"
            @click="clearAllNotifications"
            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Tout effacer
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                d="M15 17h5l-5 5v-5zM11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h4v-5l5-5V7a2 2 0 00-2-2h-5"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ notificationsStore.notifications.length }}
            </p>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tâches créées</p>
            <p class="text-2xl font-semibold text-gray-900">{{ taskCreatedCount }}</p>
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Mises à jour</p>
            <p class="text-2xl font-semibold text-gray-900">{{ taskUpdatedCount }}</p>
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Informations</p>
            <p class="text-2xl font-semibold text-gray-900">{{ infoNotificationsCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div class="flex items-center space-x-4">
          <label for="type-filter" class="text-sm font-medium text-gray-700"
            >Filtrer par type :</label
          >
          <select
            id="type-filter"
            v-model="selectedType"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="all">Tous les types</option>
            <option value="success">Succès</option>
            <option value="info">Information</option>
            <option value="warning">Avertissement</option>
            <option value="error">Erreur</option>
          </select>
        </div>

        <div class="flex items-center space-x-4">
          <label for="date-filter" class="text-sm font-medium text-gray-700">Période :</label>
          <select
            id="date-filter"
            v-model="selectedPeriod"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="all">Toutes les périodes</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="bg-white rounded-lg shadow-md">
      <div v-if="filteredNotifications.length === 0" class="p-12 text-center">
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
            d="M15 17h5l-5 5v-5zM11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h4v-5l5-5V7a2 2 0 00-2-2h-5"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune notification</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{
            selectedType !== 'all' || selectedPeriod !== 'all'
              ? 'Aucune notification ne correspond aux filtres sélectionnés.'
              : "Vous n'avez pas encore de notifications."
          }}
        </p>
        <div class="mt-6">
          <RouterLink
            to="/tasks"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Créer une tâche
          </RouterLink>
        </div>
      </div>

      <div v-else class="divide-y divide-gray-200">
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          class="p-6 hover:bg-gray-50 transition-colors duration-150"
        >
          <div class="flex items-start space-x-4">
            <!-- Notification Icon -->
            <div class="flex-shrink-0">
              <div
                class="flex items-center justify-center h-10 w-10 rounded-full"
                :class="getNotificationIconClass(notification.type)"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="getNotificationIconPath(notification.type)"
                  />
                </svg>
              </div>
            </div>

            <!-- Notification Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">
                  {{ notification.title || getDefaultTitle(notification.type) }}
                </p>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500">
                    {{ formatRelativeTime(notification.timestamp) }}
                  </span>
                  <button
                    @click="removeNotification(notification.id)"
                    class="text-gray-400 hover:text-gray-600 p-1"
                    title="Supprimer"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-600">
                {{ notification.message }}
              </p>

              <!-- Additional task info if available -->
              <div v-if="notification.task" class="mt-2 p-3 bg-gray-50 rounded-md">
                <p class="text-sm font-medium text-gray-900">{{ notification.task.title }}</p>
                <p v-if="notification.task.description" class="text-sm text-gray-600 mt-1">
                  {{ notification.task.description }}
                </p>
              </div>

              <div class="mt-2 flex items-center">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getNotificationBadgeClass(notification.type)"
                >
                  {{ getTypeLabel(notification.type) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showClearModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100"
          >
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">Effacer toutes les notifications</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Êtes-vous sûr de vouloir effacer toutes les notifications ? Cette action ne peut pas
              être annulée.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="confirmClearAll"
              class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Effacer
            </button>
            <button
              @click="showClearModal = false"
              class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'

const notificationsStore = useNotificationsStore()

// Reactive data
const selectedType = ref('all')
const selectedPeriod = ref('all')
const showClearModal = ref(false)

// Computed properties
const filteredNotifications = computed(() => {
  let notifications = [...notificationsStore.notifications]

  // Filter by type
  if (selectedType.value !== 'all') {
    notifications = notifications.filter((n) => n.type === selectedType.value)
  }

  // Filter by period
  if (selectedPeriod.value !== 'all') {
    const now = new Date()
    const filterDate = new Date()

    switch (selectedPeriod.value) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        break
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        break
    }

    notifications = notifications.filter((n) => new Date(n.timestamp) >= filterDate)
  }

  return notifications
})

const taskCreatedCount = computed(() => {
  return notificationsStore.notifications.filter(
    (n) => n.type === 'success' && n.message.includes('créée'),
  ).length
})

const taskUpdatedCount = computed(() => {
  return notificationsStore.notifications.filter(
    (n) =>
      n.type === 'success' && (n.message.includes('mise à jour') || n.message.includes('modifiée')),
  ).length
})

const infoNotificationsCount = computed(() => {
  return notificationsStore.notifications.filter((n) => n.type === 'info').length
})

// Methods
const clearAllNotifications = () => {
  showClearModal.value = true
}

const confirmClearAll = () => {
  notificationsStore.clearAll()
  showClearModal.value = false
}

const removeNotification = (id) => {
  notificationsStore.removeNotification(id)
}

const getNotificationIconClass = (type) => {
  const classes = {
    success: 'bg-green-100 text-green-600',
    error: 'bg-red-100 text-red-600',
    warning: 'bg-yellow-100 text-yellow-600',
    info: 'bg-blue-100 text-blue-600',
  }
  return classes[type] || classes.info
}

const getNotificationBadgeClass = (type) => {
  const classes = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  }
  return classes[type] || classes.info
}

const getNotificationIconPath = (type) => {
  const paths = {
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning:
      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  }
  return paths[type] || paths.info
}

const getDefaultTitle = (type) => {
  const titles = {
    success: 'Opération réussie',
    error: 'Erreur',
    warning: 'Avertissement',
    info: 'Information',
  }
  return titles[type] || 'Notification'
}

const getTypeLabel = (type) => {
  const labels = {
    success: 'Succès',
    error: 'Erreur',
    warning: 'Avertissement',
    info: 'Information',
  }
  return labels[type] || 'Info'
}

const formatRelativeTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))

  if (diffInMinutes < 1) {
    return "À l'instant"
  } else if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  }
}
</script>
