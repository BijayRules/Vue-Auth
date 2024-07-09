<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  authStore.clearLoginError()
  const success = await authStore.login(email.value, password.value)
  if (success) {
    console.log('Login successful, redirecting to dashboard')
    router.push({
      name: 'Dashboard',
      state: { message: 'Welcome! You have successfully logged in.' }
    })
  }
}
</script>

<template>
  <div className="th-container">
    <div className="th-login">
      <div>
        <div className="th-login-form">
          <div className="th-card py-8 px-11 min-w-[500px]">
            <h1 className="th-heading text-center">
              <span className="uppercase block mb-2"> GWT Backend </span>
            </h1>

            <form className="mt-10" @submit.prevent="handleLogin">
              <div className="th-form-wrapper">
                <div className="th-form">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="Email"
                    value=""
                    id="email"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>

                <div className="th-form">
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="Password"
                      value=""
                      id="password"
                      placeholder="Password"
                      v-model="password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="th-btn w-full mt-5 disabled:opacity-60"
                :disabled="authStore.isLoading"
              >
                {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
              </button>

              <!-- <p v-if="authStore.isLoading" class="loading-text">Loading...</p> -->
              <p v-if="authStore.loginError" class="error-message">{{ authStore.loginError }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  background: rgba(255, 0, 0, 0.171);
  padding: 5px;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>
