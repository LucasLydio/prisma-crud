import { Router } from 'express'

import { requireAuth } from '../middlewares/auth'
import TaskController from '../controllers/taskController'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.use(requireAuth)

router.post('/', asyncHandler(TaskController.create))
router.get('/', asyncHandler(TaskController.list))
router.get('/:id', asyncHandler(TaskController.getById))
router.put('/:id', asyncHandler(TaskController.update))
router.delete('/:id', asyncHandler(TaskController.delete))

export default router
