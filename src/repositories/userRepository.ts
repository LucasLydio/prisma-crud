// src/repositories/usersRepository.ts

import type { User } from '@prisma/client'

import { CreateUserDto, UpdateUserDto } from '../dtos/userDtos'
import prisma from '../prismaClient'

export type UserEntity = User

class UsersRepository {
  async create(data: CreateUserDto): Promise<UserEntity> {
    return prisma.user.create({ data })
  }

  async list(): Promise<UserEntity[]> {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  }

  async getById(id: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity | null> {
    try {
      return await prisma.user.update({ where: { id }, data })
    } catch {
      return null
    }
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.user.deleteMany({ where: { id } })
    return result.count > 0
  }
}

export const usersRepository = new UsersRepository()
