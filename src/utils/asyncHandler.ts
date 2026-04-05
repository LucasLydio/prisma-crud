import type { RequestHandler } from 'express'

export function asyncHandler(handler: (...args: any[]) => Promise<any>): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}

