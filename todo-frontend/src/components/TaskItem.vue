<template>
  <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-soft p-6 mb-4 border border-white/20 hover-lift transition-all duration-200" 
       :class="task.completed ? 'border-l-4 border-l-green-500 bg-green-50/50' : 'border-l-4 border-l-amber-500 bg-amber-50/30'">
    <div class="flex items-start justify-between">
      <div class="flex items-start space-x-4 flex-1">
        <div class="relative">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleComplete"
            class="mt-1 h-5 w-5 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded-lg transition-all duration-200"
          />
          <div v-if="task.completed" class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-secondary-900 mb-2"
              :class="{ 'line-through text-secondary-500': task.completed }">
            {{ task.title }}
          </h3>
          <p v-if="task.description" 
             class="text-secondary-600 mb-3 leading-relaxed"
             :class="{ 'line-through text-secondary-400': task.completed }">
            {{ task.description }}
          </p>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 text-sm text-secondary-500">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Créée le {{ formatDate(task.created_at) }}</span>
            </div>
            <div v-if="task.completed" class="flex items-center space-x-2 text-sm text-green-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-medium">Terminée</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-2 ml-4">
        <button
          @click="$emit('edit', task)"
          class="text-secondary-400 hover:text-primary-600 p-2 rounded-xl hover:bg-primary-50 transition-all duration-200"
          title="Modifier"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
        <button
          @click="$emit('delete', task.id)"
          class="text-secondary-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all duration-200"
          title="Supprimer"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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