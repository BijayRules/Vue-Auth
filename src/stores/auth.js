import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('https://genesisapi.popmanteau.com/api/v1/login', {
          email,
          password
        })
        this.setUser(response.data.user, response.data.token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
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
      localStorage.removeItem('token')
    },
    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
