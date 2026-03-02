import prisma from '../prismaClient'

export const createProfileService = async (data: any) => {
  return prisma.profile.create({ data })
}

export const listProfilesService = async () => {
  return prisma.profile.findMany()
}

export const getProfileByIdService = async (id: string) => {
  return prisma.profile.findUnique({ where: { id } })
}

export const updateProfileService = async (id: string, data: any) => {
  return prisma.profile.update({ where: { id }, data })
}

export const deleteProfileService = async (id: string) => {
  return prisma.profile.delete({ where: { id } })
}
