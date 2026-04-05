import { PrismaClient } from '@prisma/client'

import { databaseConfig } from './config/database'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseConfig.url(),
    },
  },
})

export default prisma
