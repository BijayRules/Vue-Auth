<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
    authStore.checkAuth()
})
</script>

<template>
    <router-view></router-view>
  </template>
  