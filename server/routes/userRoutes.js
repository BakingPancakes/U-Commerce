import { Router } from 'express'
import { getUserByID, createUser, updateUser } from '../controllers/userController.js'

const router = Router()

router.get('/', getUserByID)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router