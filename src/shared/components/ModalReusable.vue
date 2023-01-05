<script lang="ts" setup>
import type { ITaskData } from '../services/api-to-do-list/TaskService/TaskService'

interface IModalReusablePropsData {
  open: boolean
  currentTask?: ITaskData
  indexTask?: number

  clickOnClose: () => void
  clickOnSave: () => void
  clickOnCheckbox: () => void
  onChangeTextArea: (content: string) => void
}
const props = defineProps<IModalReusablePropsData>()
</script>
<template>
  <div v-if="open" @click.self="clickOnClose" class="container-modal">
    <div class="container-modal-content">
      <h1 class="title-modal">Task {{ (indexTask || 0) + 1 }}</h1>
      <hr class="divider" />
      <textarea
        @input="(e) => onChangeTextArea((e.target as HTMLInputElement).value)"
        :value="currentTask?.content"
        class="input-data-task"></textarea>
      <div class="group-buttons">
        <div class="input-checkbox-container">
          <input
            @click="clickOnCheckbox"
            :checked="currentTask?.completed"
            type="checkbox" />
          <p>Task completed?</p>
        </div>
        <div>
          <button @click.self="clickOnSave" class="btn-save">Save</button>
          <button @click.self="clickOnClose" class="btn-cancel">Cancel</button>
        </div>
      </div>
      <div @click.self="clickOnClose" class="exit-btn">X</div>
    </div>
  </div>
</template>
<style scoped>
.container-modal {
  @apply bg-black bg-opacity-70 w-full h-full absolute top-0 left-0 z-10
  flex justify-center items-center px-4;
}

.container-modal-content {
  @apply bg-white w-full h-64 max-w-lg rounded px-4 pt-6 pb-2 flex flex-col gap-1 relative;
}

.title-modal {
  @apply text-2xl font-semibold w-full;
}

.divider {
  @apply my-1;
}

.input-data-task {
  @apply rounded w-full h-32 outline-none border flex-1 px-2 py-1;
}

.group-buttons {
  @apply w-full flex justify-between gap-2;
}

.input-checkbox-container {
  @apply flex items-center gap-2;
}

.input-checkbox-container input {
  @apply h-5 w-5;
}

.input-checkbox-container p {
  @apply text-sm;
}

.btn-save {
  @apply bg-green-500 rounded mx-2 text-white px-4 py-1 font-semibold hover:bg-green-600 transition-all;
}

.btn-cancel {
  @apply bg-red-700 rounded text-white px-4 py-1 font-semibold hover:bg-red-800 transition-all;
}

.exit-btn {
  @apply absolute right-4 top-1 font-bold cursor-pointer text-lg z-40;
}
</style>
