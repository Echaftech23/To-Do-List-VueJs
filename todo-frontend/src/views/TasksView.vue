<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-8 border border-white/20 animate-slide-up">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-secondary-800">Mes Tâches</h1>
          <p class="text-secondary-600 mt-3 text-lg">Gérez vos tâches et suivez votre progression</p>
        </div>
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-6 py-3 border border-transparent shadow-medium text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover-lift"
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
      <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-6 border border-white/20 hover-lift animate-slide-up" style="animation-delay: 0.1s">
        <div class="flex items-center">
          <div class="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-200">
            <svg
              class="h-7 w-7 text-blue-600"
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
          <div class="ml-5">
            <p class="text-sm font-medium text-secondary-600">Total des tâches</p>
            <p class="text-3xl font-bold text-secondary-900 mt-1">{{ tasksStore.totalTasks }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-6 border border-white/20 hover-lift animate-slide-up" style="animation-delay: 0.2s">
        <div class="flex items-center">
          <div class="p-4 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-200">
            <svg
              class="h-7 w-7 text-green-600"
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
          <div class="ml-5">
            <p class="text-sm font-medium text-secondary-600">Tâches terminées</p>
            <p class="text-3xl font-bold text-secondary-900 mt-1">
              {{ tasksStore.completedTasks.length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-6 border border-white/20 hover-lift animate-slide-up" style="animation-delay: 0.3s">
        <div class="flex items-center">
          <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-200">
            <svg
              class="h-7 w-7 text-amber-600"
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
          <div class="ml-5">
            <p class="text-sm font-medium text-secondary-600">En attente</p>
            <p class="text-3xl font-bold text-secondary-900 mt-1">{{ tasksStore.pendingTasks.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-6 border border-white/20 animate-slide-up" style="animation-delay: 0.4s">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div class="flex items-center space-x-4 flex-1">
          <div class="relative flex-1 max-w-md">
            <label for="search" class="sr-only">Rechercher</label>
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-secondary-400"
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
              class="block w-full pl-12 pr-4 py-3 border border-secondary-200 rounded-xl bg-white/50 placeholder-secondary-400 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <select
            v-model="selectedFilter"
            class="block pl-4 pr-10 py-3 text-sm border border-secondary-200 bg-white/50 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent rounded-xl transition-all duration-200"
          >
            <option value="all">Toutes les tâches</option>
            <option value="pending">En attente</option>
            <option value="completed">Terminées</option>
          </select>

          <select
            v-model="sortBy"
            class="block pl-4 pr-10 py-3 text-sm border border-secondary-200 bg-white/50 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent rounded-xl transition-all duration-200"
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
    <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft border border-white/20 animate-slide-up" style="animation-delay: 0.5s">
      <div v-if="tasksStore.loading" class="flex justify-center py-16">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          <p class="text-secondary-600 text-sm">Chargement des tâches...</p>
        </div>
      </div>

      <div v-else-if="tasksStore.error" class="p-12 text-center">
        <div class="bg-red-50 rounded-2xl p-8 border border-red-200">
          <div class="text-red-500 mb-4">
            <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-secondary-900 mb-3">Erreur de chargement</h3>
          <p class="text-secondary-600 mb-6">{{ tasksStore.error }}</p>
          <button
            @click="tasksStore.fetchTasks()"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-medium hover-lift"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Réessayer
          </button>
        </div>
      </div>

      <div v-else-if="filteredTasks.length === 0" class="p-12 text-center">
        <div class="bg-secondary-50 rounded-2xl p-8 border border-secondary-200">
          <svg
            class="mx-auto h-16 w-16 text-secondary-400 mb-4"
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
          <h3 class="text-xl font-semibold text-secondary-900 mb-3">Aucune tâche trouvée</h3>
          <p class="text-secondary-600 mb-6">
            {{
              searchQuery
                ? 'Aucun résultat pour votre recherche.'
                : 'Commencez par créer votre première tâche.'
            }}
          </p>
          <button
            @click="openCreateModal"
            class="inline-flex items-center px-6 py-3 border border-transparent shadow-medium text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover-lift"
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
          v-for="(task, index) in filteredTasks"
          :key="task.id"
          :task="task"
          :style="{ 'animation-delay': `${0.1 * index}s` }"
          class="animate-slide-up"
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
      class="fixed inset-0 z-50 overflow-y-auto animate-fade-in"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm transition-opacity z-40" @click="showDeleteModal = false"></div>
        
        <div class="relative inline-block align-bottom bg-white/95 backdrop-blur-md rounded-2xl text-left overflow-hidden shadow-strong transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-50 border border-white/20 animate-scale-in">
          <div class="bg-transparent px-6 pt-6 pb-4">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-secondary-900">Supprimer la tâche</h3>
                <p class="text-secondary-600 text-sm">Cette action est irréversible</p>
              </div>
            </div>
            
            <div class="bg-red-50 rounded-xl p-4 border border-red-200 mb-6">
              <p class="text-sm text-secondary-700">
                Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action ne peut pas être annulée.
              </p>
            </div>
          </div>
          
          <div class="bg-secondary-50/50 px-6 py-4 sm:flex sm:flex-row-reverse sm:space-x-reverse sm:space-x-3">
            <button
              @click="confirmDelete"
              class="w-full inline-flex justify-center items-center rounded-xl border border-transparent shadow-medium px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-base font-medium text-white hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm transition-all duration-200 hover-lift"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Supprimer
            </button>
            <button
              @click="showDeleteModal = false"
              class="mt-3 w-full inline-flex justify-center items-center rounded-xl border border-secondary-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-200"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
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
