import { Request, Response, NextFunction } from 'express'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'createUser not implemented' })
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'getUsers not implemented' })
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'getUser not implemented' })
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'updateUser not implemented' })
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'deleteUser not implemented' })
}
