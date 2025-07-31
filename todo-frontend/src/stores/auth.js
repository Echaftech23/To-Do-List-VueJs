import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user
  },

  actions: {
    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData)
        
        if (response.data.success) {
          this.token = response.data.token
          this.user = response.data.user
          this.isAuthenticated = true
          localStorage.setItem('token', this.token)
          return { success: true, data: response.data }
        }
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Erreur lors de l\'inscription' 
        }
      }
    },

    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        
        if (response.data.success) {
          this.token = response.data.token
          this.user = response.data.user
          this.isAuthenticated = true
          localStorage.setItem('token', this.token)
          return { success: true, data: response.data }
        }
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Erreur lors de la connexion' 
        }
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      } finally {
        this.token = null
        this.user = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
      }
    },

    async getProfile() {
      try {
        const response = await api.get('/auth/profile')
        if (response.data.success) {
          this.user = response.data.user
          this.isAuthenticated = true
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.logout()
      }
    }
  }
})