import express from 'express'
import { createUserController } from './user.controller'
const router = express.Router()

router.route('/').post(createUserController)

export default router
