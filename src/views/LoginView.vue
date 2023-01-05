<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/shared/stores/auth'
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { object, string } from 'yup'

interface IDataLogin {
  email: string
  password: string
}

const toast = useToast()
const router = useRouter()

const loginSchemaValidation = object().shape({
  email: string().required().email(),
  password: string().required().min(8),
})

const { handleSubmit } = useForm<IDataLogin>({
  validationSchema: loginSchemaValidation,
})

const onSubmit = handleSubmit((dataLogin) => {
  const authStore = useAuthStore()
  authStore.login(dataLogin.email, dataLogin.password).then(async (result) => {
    if (result instanceof Error) {
      toast.error(result.message)
      return
    }
    await router.push('/home')
  })
})
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="form-container">
      <h1>Login</h1>

      <div class="input-form-container">
        <label class="label-input-form">E-mail</label>
        <Field name="email" class="input-form" type="email" />
        <ErrorMessage class="error-message" name="email" />
      </div>

      <div class="input-form-container">
        <label class="label-input-form">Password</label>
        <Field name="password" class="input-form" type="password" />
        <ErrorMessage class="error-message" name="password" />
      </div>

      <div class="button-form-container">
        <button class="button-form">Sign In</button>
        <p>
          Dont`t Have an Account?
          <span><RouterLink to="/register">Create an account</RouterLink></span>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  @apply w-full h-full px-4
    flex justify-center items-center;
}

.form-container {
  @apply bg-white w-full h-80
    shadow-lg rounded-lg max-w-sm
    flex justify-center items-center
    flex-col px-10;
}

.label-input-form {
  @apply block mb-1 text-gray-700 text-base font-semibold;
}

.input-form-container {
  @apply mb-4 w-full;
}

.input-form {
  @apply shadow appearance-none rounded
    h-8 w-full border outline-none 
    focus:border-blue-400 px-3 py-4
    text-gray-700 font-medium;
}

.button-form-container {
  @apply flex w-full gap-2
    my-4;
}

.button-form {
  @apply bg-blue-500 rounded h-8
  text-white font-medium hover:bg-blue-400 
  transition-all w-1/2;
}

.button-form-container > p {
  @apply text-xs sm:text-right md:text-left;
}

.button-form-container p span {
  @apply font-medium text-blue-800 cursor-pointer;
}

.error-message {
  @apply text-red-600;
}
</style>
