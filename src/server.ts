import './config/env'

import corsMiddleware from './adapters/http/cors'
import express from 'express'
import usersRouter from './routes/users'
import profilesRouter from './routes/profiles'
import tasksRouter from './routes/tasks'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use(corsMiddleware)
app.options('*', corsMiddleware)

app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)
app.use('/tasks', tasksRouter)

app.use(errorHandler)

if (require.main === module) {
  const port = Number(process.env.PORT ?? 3000)
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`)
  })
}

export default app
