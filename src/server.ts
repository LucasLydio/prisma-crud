import express from 'express'
import usersRouter from './routes/users'
import profilesRouter from './routes/profiles'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(express.json())

app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)

app.use(errorHandler)

export default app
