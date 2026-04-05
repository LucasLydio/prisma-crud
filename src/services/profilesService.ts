// src/services/profilesService.ts

import { CreateProfileDto, UpdateProfileDto } from '../dtos/profileDtos'
import { profilesRepository, ProfileEntity } from '../repositories/profileRepository'

class ProfilesService {
  async create(data: CreateProfileDto): Promise<ProfileEntity> {
    const profileNameAlreadyExists = await profilesRepository.getByProfileName(data.profileName)

    if (profileNameAlreadyExists) {
      throw new Error('Profile name already in use')
    }

    return profilesRepository.create(data)
  }

  async list(): Promise<ProfileEntity[]> {
    return profilesRepository.list()
  }

  async getById(id: string): Promise<ProfileEntity> {
    const profile = await profilesRepository.getById(id)

    if (!profile) {
      throw new Error('Profile not found')
    }

    return profile
  }

  async update(id: string, data: UpdateProfileDto): Promise<ProfileEntity> {
    const existingProfile = await profilesRepository.getById(id)

    if (!existingProfile) {
      throw new Error('Profile not found')
    }

    if (data.profileName && data.profileName !== existingProfile.profileName) {
      const profileNameAlreadyExists = await profilesRepository.getByProfileName(data.profileName)

      if (profileNameAlreadyExists) {
        throw new Error('Profile name already in use')
      }
    }

    const updatedProfile = await profilesRepository.update(id, data)

    if (!updatedProfile) {
      throw new Error('Profile not found')
    }

    return updatedProfile
  }

  async delete(id: string): Promise<void> {
    const deleted = await profilesRepository.delete(id)

    if (!deleted) {
      throw new Error('Profile not found')
    }
  }
}

export const profilesService = new ProfilesService()

