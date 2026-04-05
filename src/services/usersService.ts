// src/services/usersService.ts

import { CreateUserDto, UpdateUserDto } from '../dtos/userDtos'
import { usersRepository, UserEntity } from '../repositories/userRepository'

class UsersService {
  async create(data: CreateUserDto): Promise<UserEntity> {
    const emailAlreadyExists = await usersRepository.getByEmail(data.email)

    if (emailAlreadyExists) {
      throw new Error('Email already in use')
    }

    return usersRepository.create(data)
  }

  async list(): Promise<UserEntity[]> {
    return usersRepository.list()
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await usersRepository.getById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const existingUser = await usersRepository.getById(id)

    if (!existingUser) {
      throw new Error('User not found')
    }

    if (data.email && data.email !== existingUser.email) {
      const emailAlreadyExists = await usersRepository.getByEmail(data.email)

      if (emailAlreadyExists) {
        throw new Error('Email already in use')
      }
    }

    const updatedUser = await usersRepository.update(id, data)

    if (!updatedUser) {
      throw new Error('User not found')
    }

    return updatedUser
  }

  async delete(id: string): Promise<void> {
    const deleted = await usersRepository.delete(id)

    if (!deleted) {
      throw new Error('User not found')
    }
  }
} 

export const usersService = new UsersService()