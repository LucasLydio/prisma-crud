import { Request, Response } from 'express'

import {
  CreateProfileDto,
  ProfileResponseDto,
  UpdateProfileDto,
  toProfileResponseDto,
} from '../dtos/profileDtos'
import { profilesService } from '../services/profilesService'

export class ProfileController {
  async create(req: Request, res: Response): Promise<Response> {
    const dto: CreateProfileDto = req.body
    const profile = await profilesService.create(dto)

    return res.status(201).json({
      success: true,
      data: toProfileResponseDto(profile),
    })
  }

  async list(req: Request, res: Response): Promise<Response> {
    const profiles = await profilesService.list()

    return res.status(200).json({
      success: true,
      data: profiles.map(toProfileResponseDto),
    })
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const profile = await profilesService.getById(req.params.id)

    return res.status(200).json({
      success: true,
      data: toProfileResponseDto(profile),
    })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const dto: UpdateProfileDto = req.body
    const profile = await profilesService.update(req.params.id, dto)

    return res.status(200).json({
      success: true,
      data: toProfileResponseDto(profile),
    })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await profilesService.delete(req.params.id)
    return res.status(204).send()
  }
}

export default new ProfileController();
