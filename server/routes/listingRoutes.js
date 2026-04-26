import { Router } from 'express'
import {
    getAllListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    getAllCategories
} from '../controllers/listingController.js'

const router = Router()

router.get('/categories', getAllCategories)

router.get('/', getAllListings)
router.get('/:id', getListingById)
router.post('/', createListing)
router.put('/:id', updateListing)
router.delete('/:id', deleteListing)

export default router