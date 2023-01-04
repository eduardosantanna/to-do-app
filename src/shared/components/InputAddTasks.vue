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
  @apply flex my-8 gap-2;
}

.input-add-task {
  @apply w-full rounded-lg outline-none 
    h-11 font-medium p-3 
    shadow-2xl border-2 border-transparent 
    hover:border-blue-300 focus:border-blue-300;
}

.btn-add-task {
  @apply bg-blue-500 w-12 h-11 
    text-white rounded-full cursor-pointer 
    hover:bg-blue-400 shadow-2xl font-bold 
    relative;
}

.btn-add-task-content {
  position: absolute;
  top: 0%;
  left: 28%;
  font-size: 26px;
}
</style>
