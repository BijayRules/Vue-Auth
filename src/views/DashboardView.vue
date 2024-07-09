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
    <h2><strong>Hello,</strong> {{ authStore.user.name }}</h2>
    <h2>{{ authStore.user.email }}</h2>
    <button @click="logout">Logout</button>
  </div>
</template>
