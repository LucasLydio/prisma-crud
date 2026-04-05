import { Router } from 'express'
import  UserController  from '../controllers/userController'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.post('/', asyncHandler(UserController.create))
router.get('/', asyncHandler(UserController.list))
router.get('/:id', asyncHandler(UserController.getById))
router.put('/:id', asyncHandler(UserController.update))
router.delete('/:id', asyncHandler(UserController.delete))

export default router

