import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { auth } from 'express-oauth2-jwt-bearer'
import userRoutes from './routes/userRoutes.js'
import listingRoutes from './routes/listingRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

export const checkJwt = auth({
    issuerBaseURL: 'https://dev-ha77yk6xwh4lfapo.us.auth0.com',
    audience: 'https://u-commerce.com/api',
    tokenSigningAlg: 'RS256',
})

// Lightweight liveness probe — used by CI smoke tests and uptime monitors.
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.get('/test', (_req, res) => {
    res.send('Server is running')
})

app.use('/api/users', checkJwt, userRoutes)
app.use('/api/listings', listingRoutes)

app.use((err, _req, res, _next) => {
    console.error(err.stack)

    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    res.status(status).json({
        error: err.code || 'unauthorized',
        message: status === 401 ? 'Authentication required' : message,
    })
})

export default app
