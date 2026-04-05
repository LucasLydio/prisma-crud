// src/repositories/profileRepository.ts

import { CreateProfileDto, UpdateProfileDto } from '../dtos/profileDtos'
import prisma from '../prismaClient'
import type { Profile } from '@prisma/client'

export type ProfileEntity = Profile

class ProfilesRepository {
  async create(data: CreateProfileDto): Promise<ProfileEntity> {
    return prisma.profile.create({ data })
  }

  async list(): Promise<ProfileEntity[]> {
    return prisma.profile.findMany({ orderBy: { createdAt: 'desc' } })
  }

  async getById(id: string): Promise<ProfileEntity | null> {
    return prisma.profile.findUnique({ where: { id } })
  }

  async getByProfileName(profileName: string): Promise<ProfileEntity | null> {
    return prisma.profile.findUnique({ where: { profileName } })
  }

  async update(id: string, data: UpdateProfileDto): Promise<ProfileEntity | null> {
    try {
      return await prisma.profile.update({ where: { id }, data })
    } catch {
      return null
    }
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.profile.deleteMany({ where: { id } })
    return result.count > 0
  }
}

export const profilesRepository = new ProfilesRepository()
