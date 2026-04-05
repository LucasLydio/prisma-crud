import type { UserEntity } from '../repositories/userRepository'

export type CreateUserDto = {
  name: string
  email: string
  password: string
}

export type UpdateUserDto = Partial<CreateUserDto>

export type UserResponseDto = {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export function toUserResponseDto(user: UserEntity): UserResponseDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}
