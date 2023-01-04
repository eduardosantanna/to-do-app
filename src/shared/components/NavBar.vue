<script lang="ts" setup>
import { useAuthStore } from '@/shared/stores/auth'

const auth = useAuthStore()

const logout = async () => {
  await auth.logout()
}
</script>

<template>
  <header class="header-container">
    <nav>
      <ul class="ul-container">
        <li class="logo">
          <img src="@/shared/assets/icons/clipboard-list-svgrepo-com.svg" />
        </li>
        <li @click="logout" class="exit-option">Sair</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header-container {
  @apply bg-sky-500 p-2;
}

.ul-container {
  @apply flex justify-between;
}
.logo {
  @apply w-10 animate-bounce;
}
.exit-option {
  @apply text-white font-medium text-lg 
    flex justify-center items-center 
    cursor-pointer hover:underline;
}
</style>
