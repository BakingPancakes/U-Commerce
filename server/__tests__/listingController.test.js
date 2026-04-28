import { describe, it, expect, vi, beforeEach } from 'vitest'

// Build a chainable supabase mock. Every query method returns the same chain
// object so calls like .from().select().eq().order() work, and the chain is
// thenable so `await query` resolves to the configured result. .single() is
// also awaitable for single-row queries.
const { supabaseMock, setNextResult } = vi.hoisted(() => {
    const state = { result: { data: null, error: null } }

    const chain = {}
    const chainMethods = [
        'from',
        'select',
        'eq',
        'gte',
        'lte',
        'order',
        'insert',
        'update',
        'delete',
    ]
    for (const method of chainMethods) {
        chain[method] = vi.fn(() => chain)
    }
    chain.single = vi.fn(() => Promise.resolve(state.result))
    chain.then = (onFulfilled, onRejected) =>
        Promise.resolve(state.result).then(onFulfilled, onRejected)

    return {
        supabaseMock: chain,
        setNextResult: (r) => {
            state.result = r
        },
    }
})

vi.mock('../config/supabaseClient.js', () => ({
    default: supabaseMock,
}))

const {
    getAllListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
} = await import('../controllers/listingController.js')

function mockReq(opts = {}) {
    return {
        params: opts.params || {},
        query: opts.query || {},
        body: opts.body || {},
    }
}

function mockRes() {
    const res = {}
    res.status = vi.fn(() => res)
    res.json = vi.fn(() => res)
    return res
}

describe('listingController', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getAllListings', () => {
        it('returns 200 with the listings when supabase succeeds', async () => {
            const fakeListings = [{ id: 1, title: 'Test Listing' }]
            setNextResult({ data: fakeListings, error: null })

            const req = mockReq()
            const res = mockRes()
            await getAllListings(req, res)

            expect(supabaseMock.from).toHaveBeenCalledWith('listings')
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(fakeListings)
        })

        it('returns 500 when supabase returns an error', async () => {
            setNextResult({ data: null, error: { message: 'DB exploded' } })

            const req = mockReq()
            const res = mockRes()
            await getAllListings(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: 'DB exploded' })
        })

        it('applies the category filter when query param is set', async () => {
            setNextResult({ data: [], error: null })

            const req = mockReq({ query: { category: '5' } })
            const res = mockRes()
            await getAllListings(req, res)

            // .eq is called once for status_id and once for category_id
            expect(supabaseMock.eq).toHaveBeenCalledWith('status_id', 1)
            expect(supabaseMock.eq).toHaveBeenCalledWith('category_id', '5')
        })

        it('applies price filters when min_price and max_price are set', async () => {
            setNextResult({ data: [], error: null })

            const req = mockReq({ query: { min_price: '10', max_price: '100' } })
            const res = mockRes()
            await getAllListings(req, res)

            expect(supabaseMock.gte).toHaveBeenCalledWith('price', '10')
            expect(supabaseMock.lte).toHaveBeenCalledWith('price', '100')
        })
    })

    describe('getListingById', () => {
        it('returns 200 with the listing when found', async () => {
            const fakeListing = { id: 42, title: 'Found' }
            setNextResult({ data: fakeListing, error: null })

            const req = mockReq({ params: { id: '42' } })
            const res = mockRes()
            await getListingById(req, res)

            expect(supabaseMock.eq).toHaveBeenCalledWith('id', '42')
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(fakeListing)
        })

        it('returns 404 when the listing does not exist', async () => {
            setNextResult({ data: null, error: { message: 'not found' } })

            const req = mockReq({ params: { id: '999' } })
            const res = mockRes()
            await getListingById(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ error: 'Listing not found' })
        })
    })

    describe('createListing', () => {
        it('returns 201 with the created listing on success', async () => {
            const created = { id: 1, title: 'Brand new' }
            setNextResult({ data: created, error: null })

            const req = mockReq({
                body: { title: 'Brand new', price: 100, owner_id: 'u1' },
            })
            const res = mockRes()
            await createListing(req, res)

            expect(supabaseMock.insert).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(created)
        })

        it('returns 500 when supabase fails to insert', async () => {
            setNextResult({ data: null, error: { message: 'insert failed' } })

            const req = mockReq({ body: { title: 'oops' } })
            const res = mockRes()
            await createListing(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: 'insert failed' })
        })
    })

    describe('updateListing', () => {
        it('returns 200 with the updated listing on success', async () => {
            const updated = { id: 7, title: 'Updated' }
            setNextResult({ data: updated, error: null })

            const req = mockReq({
                params: { id: '7' },
                body: { title: 'Updated' },
            })
            const res = mockRes()
            await updateListing(req, res)

            expect(supabaseMock.update).toHaveBeenCalled()
            expect(supabaseMock.eq).toHaveBeenCalledWith('id', '7')
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(updated)
        })
    })

    describe('deleteListing', () => {
        it('returns 200 with a confirmation message on success', async () => {
            setNextResult({ error: null })

            const req = mockReq({ params: { id: '3' } })
            const res = mockRes()
            await deleteListing(req, res)

            expect(supabaseMock.delete).toHaveBeenCalled()
            expect(supabaseMock.eq).toHaveBeenCalledWith('id', '3')
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ message: 'Listing deleted' })
        })

        it('returns 500 when supabase fails to delete', async () => {
            setNextResult({ error: { message: 'cannot delete' } })

            const req = mockReq({ params: { id: '3' } })
            const res = mockRes()
            await deleteListing(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: 'cannot delete' })
        })
    })
})
