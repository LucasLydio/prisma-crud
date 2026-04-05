import { Response } from 'express'

import { CreateTaskDto, UpdateTaskDto, toTaskResponseDto } from '../dtos/taskDtos'
import { AuthenticatedRequest } from '../middlewares/auth'
import { tasksService } from '../services/tasksService'

export class TaskController {
  async create(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const dto: CreateTaskDto = req.body
    const task = await tasksService.create(req.user.id, dto)

    return res.status(201).json({
      success: true,
      data: toTaskResponseDto(task),
    })
  }

  async list(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const tasks = await tasksService.list(req.user.id)

    return res.status(200).json({
      success: true,
      data: tasks.map(toTaskResponseDto),
    })
  }

  async getById(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const task = await tasksService.getById(req.user.id, req.params.id)

    return res.status(200).json({
      success: true,
      data: toTaskResponseDto(task),
    })
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const dto: UpdateTaskDto = req.body
    const task = await tasksService.update(req.user.id, req.params.id, dto)

    return res.status(200).json({
      success: true,
      data: toTaskResponseDto(task),
    })
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<Response> {
    await tasksService.delete(req.user.id, req.params.id)
    return res.status(204).send()
  }
}

export default new TaskController();

