import prisma from '../prismaClient'

export const createUserService = async (data: any) => {
  // implement Prisma create with nested profile here
  return prisma.user.create({ data })
}

export const listUsersService = async () => {
  return prisma.user.findMany({ include: { profile: true } })
}

export const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({ where: { id }, include: { profile: true } })
}

export const updateUserService = async (id: string, data: any) => {
  return prisma.user.update({ where: { id }, data })
}

export const deleteUserService = async (id: string) => {
  return prisma.user.delete({ where: { id } })
}
