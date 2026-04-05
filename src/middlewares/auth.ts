import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { usersRepository } from '../repositories/userRepository'

export type AuthenticatedRequest = Request & { user: { id: string } }

function extractBearerToken(authorizationHeader?: string) {
  if (!authorizationHeader) return null
  const [scheme, token] = authorizationHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  return token
}

type AuthTokenPayload = JwtPayload & {
  sub?: string
  userId?: string
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = extractBearerToken(req.header('Authorization'))
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const secret = process.env.JWT_SECRET
    if (!secret) return res.status(500).json({ message: 'JWT_SECRET is not configured' })

    let payload: AuthTokenPayload
    try {
      payload = jwt.verify(token, secret) as AuthTokenPayload
    } catch {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const userId = typeof payload.sub === 'string' ? payload.sub : typeof payload.userId === 'string' ? payload.userId : null
    if (!userId) return res.status(401).json({ message: 'Unauthorized' })

    const user = await usersRepository.getById(userId)
    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    ;(req as AuthenticatedRequest).user = { id: user.id }
    next()
  } catch (err) {
    next(err)
  }
}
