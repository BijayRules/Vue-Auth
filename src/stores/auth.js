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
        if (response.data.success) {
          this.setUser(response.data.response)
          return true
        } else {
          throw new Error(response.data.message)
        }
      } catch (error) {
        console.error('Login failed:', error)
        if (error.response && error.response.data) {
          this.loginError = error.response.data.message
        } else {
          this.loginError = error.message || 'An unexpected error occurred'
        }
        return false
      } finally {
        this.isLoading = false
      }
    },
    setUser(userData) {
      this.user = {
        id: userData.id,
        name: userData.name,
        email: userData.email
      }
      this.token = userData.token
      localStorage.setItem('token', userData.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      this.token = null
      this.loginError = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    checkAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        return true
      }
      return false
    },
    clearLoginError() {
      this.loginError = null
    }
  },
  getters: {
    isAuthenticated: () => !!localStorage.getItem('token')
  }
})
