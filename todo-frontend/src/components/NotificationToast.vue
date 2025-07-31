<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="notification in visibleNotifications"
        :key="notification.id"
        class="bg-white border-l-4 shadow-lg rounded-lg p-4 max-w-sm"
        :class="getNotificationBorderClass(notification.type)"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5"
              :class="getNotificationIconColor(notification.type)"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                :d="getNotificationIcon(notification.type)"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-gray-900">
              {{ notification.title || getDefaultTitle(notification.type) }}
            </p>
            <p class="text-sm text-gray-500">
              {{ notification.message }}
            </p>
          </div>
          <button
            @click="hideNotification(notification.id)"
            class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
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
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'

const notificationsStore = useNotificationsStore()
const hiddenNotifications = ref(new Set())

// Get recent notifications that aren't hidden
const visibleNotifications = computed(() =>
  notificationsStore.notifications.filter((n) => !hiddenNotifications.value.has(n.id)).slice(0, 3),
)

// Hide notification from toast only (doesn't remove from store)
const hideNotification = (id) => {
  hiddenNotifications.value.add(id)
}

// Auto-hide notifications after 5 seconds
watch(
  () => notificationsStore.notifications,
  (newNotifications) => {
    newNotifications.forEach((notification) => {
      if (!notification.timeoutId) {
        notification.timeoutId = setTimeout(() => {
          hideNotification(notification.id)
        }, 5000)
      }
    })
  },
  { deep: true },
)

// Helper functions for notification styling
const getNotificationBorderClass = (type) => {
  const classes = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500',
  }
  return classes[type] || classes.info
}

const getNotificationIconColor = (type) => {
  const classes = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  }
  return classes[type] || classes.info
}

const getNotificationIcon = (type) => {
  const icons = {
    success:
      'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
    error:
      'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
    warning:
      'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
    info: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',
  }
  return icons[type] || icons.info
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
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
