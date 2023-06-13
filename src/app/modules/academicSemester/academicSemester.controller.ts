import { Request, Response } from 'express'
import {
  academicSemeisterUpdateService,
  createAcademicSemesterService,
  getAllSemesterService,
  getSingleSemesterService,
} from './academicSemester.service'
import catchAsync from '../../../sheared/catchAsync'
import sendResponse from '../../../sheared/sendResponse'
import httpStatus from 'http-status'
import { IacademicSemester } from './academicSemester.interface'
import pick from '../../../sheared/pick'
import { paginationFields } from '../../../constans/pagination'
import { academicFilterableFields } from './academicSemester.constant'

export const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const semester = req.body
    const result = await createAcademicSemesterService(semester)

    sendResponse<IacademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully created semester',
      data: result,
    })
  }
)

export const getAllSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await getAllSemesterService(filters, paginationOptions)
    sendResponse<IacademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully get semesters',
      meta: result.meta,
      data: result.data,
    })
  }
)

export const getSingleSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await getSingleSemesterService(id)

    sendResponse<IacademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully get semester',
      data: result,
    })
  }
)

export const academicSemisterUpdateController = catchAsync(
  async (req: Request, res: Response) => {
    const updateData = req.body
    const id = req.params.id
    const result = await academicSemeisterUpdateService(updateData, id)

    sendResponse<IacademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semister updated successfully',
      data: result,
    })
  }
)
