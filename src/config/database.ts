import { getEnv, requireEnv } from './env'

function buildPostgresUrlFromParts() {
  const host = getEnv('POSTGRES_HOST')
  const port = getEnv('POSTGRES_PORT')
  const user = getEnv('POSTGRES_USER')
  const password = getEnv('POSTGRES_PASSWORD')
  const db = getEnv('POSTGRES_DB')

  if (!host || !port || !user || !password || !db) return null

  const encodedPassword = encodeURIComponent(password)
  return `postgresql://${user}:${encodedPassword}@${host}:${port}/${db}?schema=public`
}

export const databaseConfig = {
  url: () => getEnv('DATABASE_URL') ?? buildPostgresUrlFromParts() ?? requireEnv('DATABASE_URL'),
}

