<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const message = ref('')

onMounted(() => {
  console.log('Dashboard mounted')
  if (router.currentRoute.value.state && router.currentRoute.value.state.message) {
    message.value = router.currentRoute.value.state.message
    router.replace({ name: 'Dashboard', state: {} })
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="message">{{ message }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
