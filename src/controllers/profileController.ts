import { Request, Response, NextFunction } from 'express'

export const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'createProfile not implemented' })
}

export const getProfiles = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'getProfiles not implemented' })
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'getProfile not implemented' })
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'updateProfile not implemented' })
}

export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'deleteProfile not implemented' })
}
