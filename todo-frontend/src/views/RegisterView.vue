<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 animate-fade-in">
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-medium">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-secondary-800">Rejoignez TaskFlow</h2>
        <p class="mt-2 text-secondary-600">Créez votre compte en quelques étapes</p>
      </div>
      
      <div class="bg-white/80 backdrop-blur-md shadow-medium rounded-2xl p-8 border border-white/20">
        <form class="space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="full_name" class="block text-sm font-medium text-secondary-700 mb-2">
              Nom complet
            </label>
            <input
              id="full_name"
              v-model="form.full_name"
              type="text"
              required
              class="block w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 placeholder-secondary-400 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Votre nom complet"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-secondary-700 mb-2">Adresse email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="block w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 placeholder-secondary-400 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label for="phone_number" class="block text-sm font-medium text-secondary-700 mb-2">
              Téléphone
            </label>
            <input
              id="phone_number"
              v-model="form.phone_number"
              type="tel"
              required
              class="block w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 placeholder-secondary-400 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Votre numéro de téléphone"
            />
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-secondary-700 mb-2">Adresse</label>
            <textarea
              id="address"
              v-model="form.address"
              required
              rows="2"
              class="block w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 placeholder-secondary-400 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Votre adresse complète"
            ></textarea>
          </div>

          <div>
            <label for="image" class="block text-sm font-medium text-secondary-700 mb-2">
              Photo de profil (optionnelle)
            </label>
            <input
              id="image"
              @change="handleImageChange"
              type="file"
              accept="image/*"
              class="block w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-secondary-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="block w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 placeholder-secondary-400 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-secondary-700 mb-2">
              Confirmer le mot de passe
            </label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              required
              class="block w-full px-4 py-3 border border-secondary-200 rounded-xl bg-white/50 placeholder-secondary-400 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 animate-slide-up">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-red-700 text-sm">{{ error }}</span>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-medium hover-lift"
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
          <span class="flex items-center">
            <svg v-if="!loading" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            {{ loading ? 'Inscription en cours...' : "Créer mon compte" }}
          </span>
        </button>

        <div class="text-center pt-4">
          <RouterLink to="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200 flex items-center justify-center space-x-1">
            <span>Déjà un compte ?</span>
            <span class="underline">Se connecter</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </RouterLink>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  full_name: '',
  email: '',
  phone_number: '',
  address: '',
  image: null,
  password: '',
  password_confirmation: '',
})

const loading = ref(false)
const error = ref('')

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
  }
}

const handleRegister = async () => {
  error.value = ''

  // Validate passwords match
  if (form.value.password !== form.value.password_confirmation) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  // Validate password length
  if (form.value.password.length < 8) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }

  loading.value = true

  try {
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('full_name', form.value.full_name)
    formData.append('email', form.value.email)
    formData.append('phone_number', form.value.phone_number)
    formData.append('address', form.value.address)
    formData.append('password', form.value.password)
    formData.append('password_confirmation', form.value.password_confirmation)

    if (form.value.image) {
      formData.append('image', form.value.image)
    }

    await authStore.register(formData)

    // Redirect to dashboard or login page after successful registration
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || "Une erreur est survenue lors de l'inscription"
  } finally {
    loading.value = false
  }
}
</script>
