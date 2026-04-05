import cors from 'cors'

import { getEnv } from '../../config/env'

function toBoolean(value?: string) {
  return value === 'true' || value === '1'
}

function wildcardToRegExp(pattern: string) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&')
  const regexSource = `^${escaped.replace(/\*/g, '.*')}$`
  return new RegExp(regexSource)
}

function parseAllowedOrigins() {
  const raw = getEnv('CORS_ORIGINS', '*')?.trim()
  if (!raw || raw === '*') return { allowAll: true as const, matchers: [] as (string | RegExp)[] }

  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const matchers = parts.map((origin) => (origin.includes('*') ? wildcardToRegExp(origin) : origin))

  return { allowAll: false as const, matchers }
}

const { allowAll, matchers } = parseAllowedOrigins()

const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true) // non-browser / same-origin
    if (allowAll) return callback(null, true)

    const allowed = matchers.some((m) => (typeof m === 'string' ? m === origin : m.test(origin)))
    if (!allowed) return callback(new Error('Not allowed by CORS'))

    callback(null, true)
  },
  credentials: toBoolean(getEnv('CORS_ALLOW_CREDENTIALS', 'false')),
  methods: getEnv('CORS_METHODS', 'GET,HEAD,PUT,PATCH,POST,DELETE'),
  allowedHeaders: getEnv('CORS_ALLOWED_HEADERS') ?? undefined,
  exposedHeaders: getEnv('CORS_EXPOSED_HEADERS') ?? undefined,
  maxAge: Number(getEnv('CORS_MAX_AGE', '86400')),
})

export default corsMiddleware

