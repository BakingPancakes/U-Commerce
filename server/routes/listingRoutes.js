import { Router } from 'express'
import {
    getAllListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    getAllCategories,
    getListingComments,
    createComment,
    updateComment,
    deleteComment
} from '../controllers/listingController.js'

const router = Router()

router.get('/categories', getAllCategories)

router.get('/comments/:id', getListingComments)
router.post('/comments', createComment)
router.put('/comments/:id', updateComment)
router.delete('/comments/:id', deleteComment)

router.get('/', getAllListings)
router.get('/:id', getListingById)
router.post('/', createListing)
router.put('/:id', updateListing)
router.delete('/:id', deleteListing)

export default router