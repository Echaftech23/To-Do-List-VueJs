import { onMounted, onUnmounted } from 'vue'
import echo from '@/plugins/echo'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

export function useEcho() {
  const authStore = useAuthStore()
  const notificationsStore = useNotificationsStore()
  let channel = null

  const connectToChannel = () => {
    if (authStore.user) {
      const channelName = `user.${authStore.user.id}`
      console.log(`🔗 Connecting to channel: ${channelName}`)

      channel = echo.private(channelName)

      channel.listen('.task.created', (event) => {
        console.log('📨 Task created event received:', event)
        notificationsStore.addNotification({
          type: 'success',
          title: 'Nouvelle tâche créée',
          message: event.message || 'Une nouvelle tâche a été créée avec succès',
          task: event.task,
        })
      })

      // Add more event listeners as needed
      channel.listen('.task.updated', (event) => {
        console.log('📝 Task updated event received:', event)
        notificationsStore.addNotification({
          type: 'info',
          title: 'Tâche mise à jour',
          message: event.message || 'Une tâche a été mise à jour',
          task: event.task,
        })
      })

      channel.listen('.task.deleted', (event) => {
        console.log('🗑️ Task deleted event received:', event)
        notificationsStore.addNotification({
          type: 'warning',
          title: 'Tâche supprimée',
          message: event.message || 'Une tâche a été supprimée',
          task: event.task,
        })
      })

      console.log(`✅ Successfully connected to real-time notifications`)
    } else {
      console.log('⚠️ No user found, cannot connect to channel')
    }
  }

  const disconnectFromChannel = () => {
    if (channel && authStore.user) {
      const channelName = `user.${authStore.user.id}`
      echo.leaveChannel(channelName)
      channel = null
      console.log(`🔌 Disconnected from channel: ${channelName}`)
    }
  }

  onMounted(() => {
    connectToChannel()
  })

  onUnmounted(() => {
    disconnectFromChannel()
  })

  return {
    connectToChannel,
    disconnectFromChannel,
  }
}
