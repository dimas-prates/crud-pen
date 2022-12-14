import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './route/user'
import balanceRoutes from './route/balance'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/user', userRoutes)
app.use('/balance', balanceRoutes)
// app.use('/', (req, res) => {
//     const { method, hostname, baseUrl } = req
//     return res.send(`remove(): Method ${method} on ${hostname}${baseUrl}`)
// })
export default app