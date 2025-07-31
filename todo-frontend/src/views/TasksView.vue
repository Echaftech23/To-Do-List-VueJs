<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Mes Tâches</h1>
          <p class="text-gray-600 mt-2">Gérez vos tâches et suivez votre progression</p>
        </div>
        <button
          @click="openCreateModal"
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
          Nouvelle tâche
        </button>
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
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
            <p class="text-sm font-medium text-gray-600">Total</p>
            <p class="text-2xl font-semibold text-gray-900">{{ tasksStore.totalTasks }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
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
            <p class="text-sm font-medium text-gray-600">Terminées</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ tasksStore.completedTasks.length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
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
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div class="flex items-center space-x-4">
          <div>
            <label for="search" class="sr-only">Rechercher</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une tâche..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <select
            v-model="selectedFilter"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="all">Toutes les tâches</option>
            <option value="pending">En attente</option>
            <option value="completed">Terminées</option>
          </select>

          <select
            v-model="sortBy"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="created_at_desc">Plus récentes</option>
            <option value="created_at_asc">Plus anciennes</option>
            <option value="title_asc">Titre A-Z</option>
            <option value="title_desc">Titre Z-A</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="bg-white rounded-lg shadow-md">
      <div v-if="tasksStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="tasksStore.error" class="p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
        <p class="text-gray-600 mb-4">{{ tasksStore.error }}</p>
        <button
          @click="tasksStore.fetchTasks()"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>

      <div v-else-if="filteredTasks.length === 0" class="p-6 text-center">
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
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune tâche trouvée</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{
            searchQuery
              ? 'Aucun résultat pour votre recherche.'
              : 'Commencez par créer votre première tâche.'
          }}
        </p>
        <div class="mt-6">
          <button
            @click="openCreateModal"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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
          </button>
        </div>
      </div>

      <div v-else class="p-6 space-y-4">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @edit="editTask"
          @delete="deleteTask"
        />
      </div>
    </div>

    <!-- Task Modal -->
    <TaskModal v-if="showModal" :task="selectedTask" @close="closeModal" @save="handleSaveTask" />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">Supprimer la tâche</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action ne peut pas être
              annulée.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Supprimer
            </button>
            <button
              @click="showDeleteModal = false"
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
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useNotificationsStore } from '@/stores/notifications'
import TaskItem from '@/components/TaskItem.vue'
import TaskModal from '@/components/TaskModal.vue'

const tasksStore = useTasksStore()
const notificationsStore = useNotificationsStore()

// Reactive data
const searchQuery = ref('')
const selectedFilter = ref('all')
const sortBy = ref('created_at_desc')
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedTask = ref(null)
const taskToDelete = ref(null)

// Computed properties
const filteredTasks = computed(() => {
  let tasks = tasksStore.tasks

  // Filter by status
  if (selectedFilter.value === 'pending') {
    tasks = tasks.filter((task) => !task.completed)
  } else if (selectedFilter.value === 'completed') {
    tasks = tasks.filter((task) => task.completed)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    tasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query)),
    )
  }

  // Sort tasks
  tasks = [...tasks].sort((a, b) => {
    switch (sortBy.value) {
      case 'created_at_asc':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'created_at_desc':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'title_asc':
        return a.title.localeCompare(b.title)
      case 'title_desc':
        return b.title.localeCompare(a.title)
      default:
        return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  return tasks
})

// Methods
const openCreateModal = () => {
  selectedTask.value = null
  showModal.value = true
}

const editTask = (task) => {
  selectedTask.value = task
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedTask.value = null
}

const handleSaveTask = async (taskData) => {
  try {
    if (selectedTask.value) {
      // Update existing task
      const result = await tasksStore.updateTask(selectedTask.value.id, taskData)
      if (result.success) {
        notificationsStore.addNotification({
          type: 'success',
          message: 'Tâche mise à jour avec succès',
        })
      } else {
        notificationsStore.addNotification({
          type: 'error',
          message: result.message || 'Erreur lors de la mise à jour de la tâche',
        })
      }
    } else {
      // Create new task
      const result = await tasksStore.createTask(taskData)
      if (result.success) {
        notificationsStore.addNotification({
          type: 'success',
          message: 'Tâche créée avec succès',
        })
        // Refresh the tasks list to show the new task
        await tasksStore.fetchTasks()
      } else {
        notificationsStore.addNotification({
          type: 'error',
          message: result.message || 'Erreur lors de la création de la tâche',
        })
      }
    }
    closeModal()
  } catch (err) {
    console.error('Erreur lors de la sauvegarde:', err)
    notificationsStore.addNotification({
      type: 'error',
      message: 'Erreur lors de la sauvegarde de la tâche',
    })
  }
}

const deleteTask = (taskId) => {
  const task = tasksStore.tasks.find((t) => t.id === taskId)
  if (task) {
    taskToDelete.value = task
    showDeleteModal.value = true
  }
}

const confirmDelete = async () => {
  if (taskToDelete.value) {
    const result = await tasksStore.deleteTask(taskToDelete.value.id)
    if (result.success) {
      notificationsStore.addNotification({
        type: 'success',
        message: 'Tâche supprimée avec succès',
      })
    } else {
      notificationsStore.addNotification({
        type: 'error',
        message: 'Erreur lors de la suppression de la tâche',
      })
    }
    showDeleteModal.value = false
    taskToDelete.value = null
  }
}

// Lifecycle
onMounted(async () => {
  await tasksStore.fetchTasks()
})
</script>
