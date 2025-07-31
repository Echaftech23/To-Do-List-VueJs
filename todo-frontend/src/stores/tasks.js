import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
    pendingTasks: (state) => state.tasks.filter((task) => !task.completed),
    totalTasks: (state) => state.tasks.length,
    completionRate: (state) => {
      if (state.tasks.length === 0) return 0
      return Math.round((state.completedTasks.length / state.tasks.length) * 100)
    },
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/tasks')

        if (response.data.success) {
          this.tasks = response.data.tasks
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors du chargement des tâches'
        console.error('Erreur lors du chargement des tâches:', error)
      } finally {
        this.loading = false
      }
    },

    async createTask(taskData) {
      try {
        const response = await api.post('/tasks', taskData)

        if (response.data.success) {
          this.tasks.unshift(response.data.task)
          return { success: true, task: response.data.task }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Erreur lors de la création de la tâche'
        this.error = errorMessage
        return { success: false, message: errorMessage }
      }
    },

    async updateTask(taskId, taskData) {
      try {
        const response = await api.put(`/tasks/${taskId}`, taskData)

        if (response.data.success) {
          // Find the task and only update the specific fields from taskData
          const index = this.tasks.findIndex((task) => task.id === taskId)
          if (index !== -1) {
            // Only update the fields that were provided in taskData
            this.tasks[index] = {
              ...this.tasks[index],
              ...taskData,
              // If we receive an updated task from the server, use its updated_at value
              updated_at: response.data.task?.updated_at || this.tasks[index].updated_at,
            }
          }
          return { success: true, task: this.tasks[index] }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Erreur lors de la mise à jour de la tâche'
        this.error = errorMessage
        return { success: false, message: errorMessage }
      }
    },

    async deleteTask(taskId) {
      try {
        const response = await api.delete(`/tasks/${taskId}`)

        if (response.data.success) {
          this.tasks = this.tasks.filter((task) => task.id !== taskId)
          return { success: true }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Erreur lors de la suppression de la tâche'
        this.error = errorMessage
        return { success: false, message: errorMessage }
      }
    },

    addTaskFromEvent(task) {
      // Méthode pour ajouter une tâche depuis un événement en temps réel
      this.tasks.unshift(task)
    },

    clearError() {
      this.error = null
    },
  },
})
