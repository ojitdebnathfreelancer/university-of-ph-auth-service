import express from 'express'
import { academicSemesterValidation } from './academicSemester.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  academicSemisterUpdateController,
  createAcademicSemesterController,
  deleteAcademicSemesterController,
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
  .get(getSingleSemesterController)
  .patch(
    validateRequest(academicSemesterValidation.updateAcademicZodSchema),
    academicSemisterUpdateController
  )
  .delete(deleteAcademicSemesterController)

export const academicSemesterRoute = router
