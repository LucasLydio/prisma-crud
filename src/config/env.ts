import dotenv from 'dotenv'

dotenv.config()

export function getEnv(name: string, fallback?: string) {
  const value = process.env[name]
  if (value === undefined || value === '') return fallback
  return value
}

export function requireEnv(name: string) {
  const value = getEnv(name)
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

