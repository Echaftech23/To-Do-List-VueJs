<!-- src/components/TaskModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm transition-opacity z-40"
        @click="closeModal"
      ></div>

      <!-- Modal content -->
      <div
        class="relative inline-block align-bottom bg-white/95 backdrop-blur-md rounded-2xl text-left overflow-hidden shadow-strong transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-50 border border-white/20 animate-scale-in"
      >
        <form @submit.prevent="handleSubmit">
          <div class="bg-transparent px-6 pt-6 pb-4">
            <div class="w-full">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-secondary-900">
                    {{ isEdit ? 'Modifier la tâche' : 'Nouvelle tâche' }}
                  </h3>
                  <p class="text-secondary-600 text-sm">{{ isEdit ? 'Modifiez les détails de votre tâche' : 'Créez une nouvelle tâche' }}</p>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <label for="title" class="block text-sm font-medium text-secondary-700 mb-2">
                    Titre de la tâche *
                  </label>
                  <input
                    id="title"
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex: Terminer le rapport mensuel"
                  />
                </div>

                <div>
                  <label for="description" class="block text-sm font-medium text-secondary-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="4"
                    class="w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Ajoutez des détails sur cette tâche..."
                  ></textarea>
                </div>

                <div v-if="isEdit" class="bg-secondary-50 rounded-xl p-4 border border-secondary-200">
                  <label class="flex items-center space-x-3 cursor-pointer">
                    <input
                      v-model="form.completed"
                      type="checkbox"
                      class="h-5 w-5 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded-lg"
                    />
                    <div class="flex items-center space-x-2">
                      <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-sm font-medium text-secondary-700">Marquer comme terminée</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-secondary-50/50 px-6 py-4 sm:flex sm:flex-row-reverse sm:space-x-reverse sm:space-x-3">
            <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex justify-center items-center rounded-xl border border-transparent shadow-medium px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-medium text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover-lift"
            >
              <svg
                v-if="loading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <svg v-if="!loading" class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ loading ? 'Enregistrement...' : isEdit ? 'Modifier la tâche' : 'Créer la tâche' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center items-center rounded-xl border border-secondary-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-200"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  title: '',
  description: '',
  completed: false,
})

const loading = ref(false)
const isEdit = computed(() => !!props.task)

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.value = {
        title: newTask.title || '',
        description: newTask.description || '',
        completed: newTask.completed || false,
      }
    } else {
      form.value = {
        title: '',
        description: '',
        completed: false,
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  loading.value = true

  try {
    await emit('save', form.value)
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  form.value = {
    title: '',
    description: '',
    completed: false,
  }
  emit('close')
}
</script>
