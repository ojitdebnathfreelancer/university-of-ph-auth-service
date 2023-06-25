import express from 'express'
import {
  createAcademicFacultyController,
  deleteAcademicFacultyController,
  getAllAcademicFacultyController,
  getSingleAcademicFacultyController,
  updateAcademicFacultyController,
} from './academicFaculty.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
const router = express.Router()

router
  .route('/')
  .post(
    validateRequest(academicFacultyValidation.academicFacultyZodValidation),
    createAcademicFacultyController
  )
  .get(getAllAcademicFacultyController)

router
  .route('/:id')
  .get(getSingleAcademicFacultyController)
  .patch(updateAcademicFacultyController)
  .delete(deleteAcademicFacultyController)

export const academicFacultyRouter = router
