import express from 'express'
import { createUserController } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { userValidation } from './user.validation'

const router = express.Router()

router
  .route('/')
  .post(
    validateRequest(userValidation.createUserZodSchema),
    createUserController
  )

export const userRoute = router
