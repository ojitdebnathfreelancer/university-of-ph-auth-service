import express from 'express'
import {
  createAcademicDepartmentController,
  deleteSingleAcademicDepartmentController,
  getAllAcademicDepartmentController,
  getSingleAcademicDepartmentController,
  updateAcademicDepartmentController,
} from './academicDepartment.controller'
import {
  createAcademicDepartmentZod,
  updateAcademicDepartmentZod,
} from './academicDepartment.validation'
import { validateRequest } from '../../middlewares/validateRequest'

const router = express.Router()

router
  .route('/')
  .post(
    validateRequest(createAcademicDepartmentZod),
    createAcademicDepartmentController
  )
  .get(getAllAcademicDepartmentController)

router
  .route('/:id')
  .get(getSingleAcademicDepartmentController)
  .patch(
    validateRequest(updateAcademicDepartmentZod),
    updateAcademicDepartmentController
  )
  .delete(deleteSingleAcademicDepartmentController)

export const academicDepartmentRouter = router
