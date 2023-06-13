import express from 'express'
import { academicSemesterValidation } from './academicSemester.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  academicSemisterUpdateController,
  createAcademicSemesterController,
  getAllSemesterController,
  getSingleSemesterController,
} from './academicSemester.controller'
const router = express.Router()

router
  .route('/')
  .post(
    validateRequest(academicSemesterValidation.academicSemesterZodSchema),
    createAcademicSemesterController
  )
  .get(getAllSemesterController)

router
  .route('/:id')
  .patch(
    validateRequest(academicSemesterValidation.updateAcademicZodSchema),
    academicSemisterUpdateController
  )

router.route('/:id').get(getSingleSemesterController)

export const academicSemesterRoute = router
