import { Router } from 'express'
import ProfileController from '../controllers/profileController'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.post('/', asyncHandler(ProfileController.create))
router.get('/', asyncHandler(ProfileController.list))
router.get('/:id', asyncHandler(ProfileController.getById))
router.put('/:id', asyncHandler(ProfileController.update))
router.delete('/:id', asyncHandler(ProfileController.delete))

export default router
