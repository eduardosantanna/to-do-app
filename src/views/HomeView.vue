<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

import NavBarVue from '@/shared/components/NavBar.vue'
import ModalReusable from '@/shared/components/ModalReusable.vue'
import InputAddTasksVue from '@/shared/components/InputAddTasks.vue'
import type { ITaskData } from '@/shared/services/api-to-do-list/TaskService/TaskService'
import TaskService from '@/shared/services/api-to-do-list/TaskService/TaskService'

const isOpen = ref(false)
const toast = useToast()

const tasks = ref<ITaskData[]>([])
const currentTask = ref({} as ITaskData)
const indexCurrentTask = ref<number>()
const inputData = ref<string>('')
const isLoading = ref<boolean>(false)

onMounted(() => {
  getTasks()
})

const setValueInput = (value: string) => {
  inputData.value = value
}

const setCurrentTaskContent = (value: string) => {
  currentTask.value.content = value
}

const setCurrentTaskCompleted = () => {
  currentTask.value.completed = !currentTask.value.completed
}

const getTasks = () => {
  isLoading.value = true
  TaskService.getAllTasks().then((result) => {
    isLoading.value = false
    if (result instanceof Error) return toast.error(result.message)
    tasks.value = result
  })
}

const addTask = () => {
  TaskService.createTask(inputData.value).then((result) => {
    if (result instanceof Error) return toast(result.message)
    toast.success('Task added!')
    inputData.value = ''
    getTasks()
  })
}

const updateTask = () => {
  isOpen.value = false
  TaskService.updateTask(
    currentTask.value.content,
    currentTask.value.completed,
    currentTask.value.id
  ).then((result) => {
    if (result instanceof Error) return toast.error(result.message)
    toast.success('Updated task!')
  })
}

const deleteTask = (id: number) => {
  TaskService.deleteTasks(id).then((result) => {
    if (result instanceof Error) return toast.error(result.message)

    toast.warning('Task deleted')
    tasks.value = tasks.value.filter((task) => task.id !== id)
  })
}
</script>

<template>
  <NavBarVue />

  <main class="main-container">
    <ModalReusable
      :click-on-checkbox="setCurrentTaskCompleted"
      :click-on-save="updateTask"
      :on-change-text-area="(value) => setCurrentTaskContent(value)"
      :index-task="indexCurrentTask"
      :current-task="currentTask"
      :open="isOpen"
      :click-on-close="() => ((isOpen = !isOpen), getTasks())" />
    <InputAddTasksVue
      :value-input-add-task="inputData"
      :on-change-input-add-task="(value) => setValueInput(value)"
      :click-on-buttom-add-task="addTask" />
    <div class="taks-container">
      <div v-if="isLoading" class="loading-icon">
        <img src="@/shared/assets/icons/clipboard-list-svgrepo-com.svg" />
      </div>

      <div v-if="!isLoading" class="divider"></div>
      <ul v-if="tasks.length !== 0 && !isLoading">
        <li
          v-for="(task, index) in tasks"
          :key="task.id"
          :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
          {{ index + 1 }}. {{ task.content }}
          <div class="containre-icons-list">
            <div>
              <img
                @click="deleteTask(task.id)"
                class="icon-list"
                src="@/shared/assets/icons/delete.png" />
            </div>
            <div>
              <img
                @click="
                  (e) => (
                    (isOpen = !isOpen),
                    (currentTask = task),
                    (indexCurrentTask = index)
                  )
                "
                class="icon-list"
                src="@/shared/assets/icons/edit.png" />
            </div>
          </div>
        </li>
      </ul>

      <ul v-if="tasks.length === 0 && !isLoading">
        <li class="noTaskFound">
          <img src="@/shared/assets/icons/alert.svg" />No task found
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  @apply w-full flex-1 mx-auto max-w-xl px-4;
}

.divider {
  @apply absolute border-r border-red-600 h-full w-12 top-0;
}

.taks-container {
  @apply w-full bg-white shadow-2xl relative pt-10 pb-7;
}

.taks-container ul li {
  @apply border-b relative border-sky-500 pl-16 pt-1 pr-1 truncate hover:border-x-cyan-600 hover:cursor-pointer;
}

.containre-icons-list {
  @apply flex gap-3 bg-white absolute top-2 right-1 flex-row-reverse;
}

.icon-list {
  @apply w-4 h-4;
}

.noTaskFound {
  @apply font-bold flex gap-2;
}

.noTaskFound img {
  @apply w-4;
}

.skeleton-loading {
  @apply bg-slate-200 animate-pulse;
}

.loading-icon {
  @apply w-full animate-bounce flex justify-center items-center;
}

.loading-icon img {
  @apply w-32 animate-bounce flex justify-center items-center;
}
</style>
