<script lang="ts" setup>
interface IInputAddTasksData {
  valueInputAddTask: string

  clickOnButtomAddTask: () => void
  onChangeInputAddTask: (content: string) => void
}

const props = defineProps<IInputAddTasksData>()
</script>

<template>
  <div class="container-add-task">
    <input
      :value="valueInputAddTask"
      @input="(e) => onChangeInputAddTask((e.target as HTMLInputElement).value)"
      type="text"
      class="input-add-task" />
    <button @click="props.clickOnButtomAddTask" class="btn-add-task">
      <span class="btn-add-task-content">+</span>
    </button>
  </div>
</template>

<style scoped>
.container-add-task {
  @apply flex my-8 gap-2 relative;
}

.input-add-task {
  @apply w-full rounded-lg outline-none 
    h-11 font-medium p-3 
    shadow-2xl border-2 border-transparent 
    hover:border-blue-300 focus:border-blue-300;
}

.btn-add-task {
  @apply absolute bg-blue-500 text-white hover:bg-blue-400
  w-11 h-11 rounded right-0 text-2xl flex justify-center;
}

.btn-add-task-content {
  @apply mt-1;
}
</style>
