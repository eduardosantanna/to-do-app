import { Api } from '../config/config'

export interface ITaskData {
  id: number
  content: string
  completed: boolean
  userId: number
  createdAt: string
  updatedAt: string
}

export default new (class TaskService {
  public async getAllTasks(): Promise<ITaskData[] | Error> {
    try {
      const { data } = await Api.get('/tasks')

      if (data) return data

      return new Error('Error ao solicitar as tarefas')
    } catch (error) {
      return new Error('Error ao solicitar as tarefas')
    }
  }

  public async createTask(dataTask: string): Promise<number | Error> {
    try {
      const { data } = await Api.post('/tasks', { content: dataTask })

      if (data) return data

      return new Error('Error ao criar tarefa')
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Error ao criar tarefa'
      )
    }
  }

  public async updateTask(content: string, completed: boolean, id: number) {
    try {
      await Api.put(`/tasks/${id}`, { content, completed })
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Error ao atualizar tarefa'
      )
    }
  }

  public async deleteTasks(id: number): Promise<void | Error> {
    try {
      await Api.delete(`/tasks/${id}`)
    } catch (error) {
      return new Error(
        (error as { message: string }).message || 'Error ao deletar a tarefa'
      )
    }
  }
})()
