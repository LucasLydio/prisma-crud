// src/services/tasksService.ts

import { CreateTaskDto, UpdateTaskDto } from '../dtos/taskDtos'
import { tasksRepository, TaskEntity } from '../repositories/taskRepository'

class TasksService {
  async create(userId: string, data: CreateTaskDto): Promise<TaskEntity> {
    if (!data?.title) {
      throw new Error('title is required')
    }

    return tasksRepository.create(userId, data)
  }

  async list(userId: string): Promise<TaskEntity[]> {
    return tasksRepository.listByUser(userId)
  }

  async getById(userId: string, id: string): Promise<TaskEntity> {
    const task = await tasksRepository.getByIdForUser(id, userId)

    if (!task) {
      throw new Error('Task not found')
    }

    return task
  }

  async update(userId: string, id: string, data: UpdateTaskDto): Promise<TaskEntity> {
    const updatedTask = await tasksRepository.updateForUser(id, userId, data)

    if (!updatedTask) {
      throw new Error('Task not found')
    }

    return updatedTask
  }

  async delete(userId: string, id: string): Promise<void> {
    const deleted = await tasksRepository.deleteForUser(id, userId)

    if (!deleted) {
      throw new Error('Task not found')
    }
  }
}

export const tasksService = new TasksService()
