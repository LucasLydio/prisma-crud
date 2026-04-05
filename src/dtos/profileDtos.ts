import type { ProfileEntity } from '../repositories/profileRepository'

export type CreateProfileDto = {
  profileName: string
}

export type UpdateProfileDto = Partial<CreateProfileDto>

export type ProfileResponseDto = {
  id: string
  profileName: string
  createdAt: Date
  updatedAt: Date
}

export function toProfileResponseDto(profile: ProfileEntity): ProfileResponseDto {
  return {
    id: profile.id,
    profileName: profile.profileName,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  }
}
