<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4" 
       :class="task.completed ? 'border-green-500' : 'border-blue-500'">
    <div class="flex items-start justify-between">
      <div class="flex items-start space-x-3 flex-1">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleComplete"
          class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900"
              :class="{ 'line-through text-gray-500': task.completed }">
            {{ task.title }}
          </h3>
          <p v-if="task.description" 
             class="text-gray-600 mt-1"
             :class="{ 'line-through': task.completed }">
            {{ task.description }}
          </p>
          <div class="text-sm text-gray-400 mt-2">
            Créée le {{ formatDate(task.created_at) }}
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-2 ml-4">
        <button
          @click="$emit('edit', task)"
          class="text-blue-600 hover:text-blue-800 p-1"
          title="Modifier"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
        <button
          @click="$emit('delete', task.id)"
          class="text-red-600 hover:text-red-800 p-1"
          title="Supprimer"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTasksStore } from '@/stores/tasks'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['edit', 'delete'])
const tasksStore = useTasksStore()

const toggleComplete = async () => {
  await tasksStore.updateTask(props.task.id, {
    completed: !props.task.completed
  })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>