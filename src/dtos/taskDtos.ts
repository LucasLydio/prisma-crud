import type { TaskEntity } from '../repositories/taskRepository'

export type CreateTaskDto = {
  title: string
  done?: boolean
}

export type UpdateTaskDto = Partial<CreateTaskDto>

export type TaskResponseDto = {
  id: string
  title: string
  done: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export function toTaskResponseDto(task: TaskEntity): TaskResponseDto {
  return {
    id: task.id,
    title: task.title,
    done: task.done,
    userId: task.userId,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }
}
