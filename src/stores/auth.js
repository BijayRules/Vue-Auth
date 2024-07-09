import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loginError: null,
    isLoading: false
  }),
  actions: {
    async login(email, password) {
      this.isLoading = true
      this.loginError = null
      try {
        const response = await axios.post('https://genesisapi.popmanteau.com/api/v1/login', {
          email,
          password
        })
        this.setUser(response.data.user, response.data.token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        if (error.response && error.response.data) {
          this.loginError = error.response.data.response.errors.message || 'Login failed'
        } else {
          this.loginError = 'An unexpected error occurred'
        }
        return false
      } finally {
        this.isLoading = false
      }
    },
    setUser(user, token) {
      this.user = user
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.user = null
      this.token = null
      this.loginError = null
      localStorage.removeItem('token')
    },
    clearLoginError() {
      this.loginError = null
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
