// src/repositories/taskRepository.ts

import { CreateTaskDto, UpdateTaskDto } from '../dtos/taskDtos'
import prisma from '../prismaClient'
import type { Task } from '@prisma/client'

export type TaskEntity = Task

class TasksRepository {
  async create(userId: string, data: CreateTaskDto): Promise<TaskEntity> {
    return prisma.task.create({
      data: {
        title: data.title,
        done: data.done ?? false,
        userId,
      },
    })
  }

  async listByUser(userId: string): Promise<TaskEntity[]> {
    return prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  }

  async getByIdForUser(id: string, userId: string): Promise<TaskEntity | null> {
    return prisma.task.findFirst({ where: { id, userId } })
  }

  async updateForUser(id: string, userId: string, data: UpdateTaskDto): Promise<TaskEntity | null> {
    const existing = await this.getByIdForUser(id, userId)
    if (!existing) return null

    return prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        done: data.done,
      },
    })
  }

  async deleteForUser(id: string, userId: string): Promise<boolean> {
    const result = await prisma.task.deleteMany({ where: { id, userId } })
    return result.count > 0
  }
}

export const tasksRepository = new TasksRepository()
