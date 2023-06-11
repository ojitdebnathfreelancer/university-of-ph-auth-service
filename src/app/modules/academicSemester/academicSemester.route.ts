import express from 'express'
import { academicSemesterValidation } from './academicSemester.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  createAcademicSemesterController,
  getAllSemesterController,
} from './academicSemester.controller'
const router = express.Router()

router
  .route('/')
  .post(
    validateRequest(academicSemesterValidation.academicSemesterZodSchema),
    createAcademicSemesterController
  )

router.route('/').get(getAllSemesterController)

export const academicSemesterRoute = router
