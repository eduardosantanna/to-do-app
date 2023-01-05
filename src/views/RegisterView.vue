<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { object, string, ref } from 'yup'
import AuthService from '@/shared/services/api-to-do-list/AuthService/AuthService'

interface IDataRegister {
  email: string
  password: string
  confirmPassword: string
}

const toast = useToast()
const router = useRouter()

const loginSchemaValidation = object().shape({
  email: string()
    .required('E-mail is a required field')
    .email('E-mail must be a valid E-mail'),
  password: string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'The passwords are not the same')
    .required('Confirm password is a required field'),
})

const { handleSubmit } = useForm<IDataRegister>({
  validationSchema: loginSchemaValidation,
})

const onSubmit = handleSubmit((dataLogin) => {
  AuthService.register(dataLogin.email, dataLogin.password).then(
    async (result) => {
      if (result instanceof Error) {
        return toast.error('User already registered')
      } else {
        await router.push('/login')
      }
    }
  )
})
</script>

<template>
  <div class="register-container">
    <form @submit.prevent="onSubmit" class="form-container">
      <h1>Register</h1>

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

      <div class="input-form-container">
        <label class="label-input-form">Confirm password</label>
        <Field name="confirmPassword" class="input-form" type="password" />
        <ErrorMessage class="error-message" name="confirmPassword" />
      </div>

      <div class="button-form-container">
        <button class="button-form">Sign Up</button>
        <p>
          Already registered?
          <span><RouterLink to="/login">Sign in</RouterLink></span>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  @apply w-full h-full px-4
    flex justify-center items-center;
}

.form-container {
  @apply bg-white w-full h-auto
    shadow-lg rounded-lg max-w-sm
    flex justify-center items-center
    flex-col px-10 py-10;
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
  @apply text-xs;
}

.button-form-container p span {
  @apply font-medium text-blue-800 cursor-pointer;
}

.error-message {
  @apply text-red-600;
}
</style>
