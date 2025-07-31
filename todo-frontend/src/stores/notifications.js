// src/stores/notifications.js
import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    // Maximum number of notifications to keep in history
    maxNotifications: 50,
  }),

  getters: {
    // Get all success notifications
    successNotifications: (state) => state.notifications.filter((n) => n.type === 'success'),

    // Get all error notifications
    errorNotifications: (state) => state.notifications.filter((n) => n.type === 'error'),

    // Get all warning notifications
    warningNotifications: (state) => state.notifications.filter((n) => n.type === 'warning'),

    // Get all info notifications
    infoNotifications: (state) => state.notifications.filter((n) => n.type === 'info'),

    // Get the most recent 10 notifications
    recentNotifications: (state) => state.notifications.slice(0, 10),
  },

  actions: {
    addNotification(notification) {
      const newNotification = {
        id: Date.now(),
        ...notification,
        timestamp: new Date(),
      }
      this.notifications.unshift(newNotification)

      // Keep only the latest maxNotifications
      if (this.notifications.length > this.maxNotifications) {
        this.notifications = this.notifications.slice(0, this.maxNotifications)
      }

      // Try to persist notifications in localStorage if available
      try {
        localStorage.setItem('notifications', JSON.stringify(this.notifications))
      } catch (e) {
        console.error('Could not save notifications to localStorage:', e)
      }
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter((n) => n.id !== id)

      // Update localStorage
      try {
        localStorage.setItem('notifications', JSON.stringify(this.notifications))
      } catch (e) {
        console.error('Could not save notifications to localStorage:', e)
      }
    },

    clearAll() {
      this.notifications = []

      // Clear localStorage
      try {
        localStorage.removeItem('notifications')
      } catch (e) {
        console.error('Could not clear notifications from localStorage:', e)
      }
    },

    // Load notifications from localStorage on app init
    loadNotifications() {
      try {
        const saved = localStorage.getItem('notifications')
        if (saved) {
          this.notifications = JSON.parse(saved)
        }
      } catch (e) {
        console.error('Could not load notifications from localStorage:', e)
      }
    },
  },
})
