import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app.js'

describe('app smoke tests', () => {
    it('GET /health returns 200 and { status: "ok" }', async () => {
        const res = await request(app).get('/health')

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ status: 'ok' })
    })

    it('GET /test returns 200 and a running message', async () => {
        const res = await request(app).get('/test')

        expect(res.status).toBe(200)
        expect(res.text).toMatch(/Server is running/i)
    })

    it('returns 404 for unknown routes', async () => {
        const res = await request(app).get('/this-route-does-not-exist')

        expect(res.status).toBe(404)
    })
})
