import { Request, Response } from 'express'

import { CreateUserDto, UpdateUserDto, UserResponseDto, toUserResponseDto } from '../dtos/userDtos'
import { usersService } from '../services/usersService'

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const dto: CreateUserDto = req.body
    const user = await usersService.create(dto)

    return res.status(201).json({
      success: true,
      data: toUserResponseDto(user),
    })
  }

  async list(req: Request, res: Response): Promise<Response> {
    const users = await usersService.list()

    return res.status(200).json({
      success: true,
      data: users.map(toUserResponseDto),
    })
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const user = await usersService.getById(req.params.id)

    return res.status(200).json({
      success: true,
      data: toUserResponseDto(user),
    })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const dto: UpdateUserDto = req.body
    const user = await usersService.update(req.params.id, dto)

    return res.status(200).json({
      success: true,
      data: toUserResponseDto(user),
    })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await usersService.delete(req.params.id)
    return res.status(204).send()
  }
}

export default new UserController();