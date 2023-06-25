import { Request, Response } from 'express'
import catchAsync from '../../../sheared/catchAsync'
import sendResponse from '../../../sheared/sendResponse'
import httpStatus from 'http-status'
import { IAcademicFaculty } from './academicFaculty.interface'
import {
  createAcademicFacultyService,
  deleteAcademicFacultyService,
  getAllAcademicFacultyService,
  getSingleAcademicFacultyService,
  updateAcademicFacultyService,
} from './academicFaculty.service'
import pick from '../../../sheared/pick'
import { academicFacultyFilterableField } from './academicFaculty.const'
import { paginationFields } from '../../../constans/pagination'

export const createAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const title = req.body
    const result = await createAcademicFacultyService(title)

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created successfully',
      data: result,
    })
  }
)

export const getAllAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableField)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await getAllAcademicFacultyService(
      filters,
      paginationOptions
    )

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully get all faculty',
      meta: result.meta,
      data: result?.data,
    })
  }
)

export const getSingleAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await getSingleAcademicFacultyService(id)

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully get faculty',
      data: result,
    })
  }
)

export const updateAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const title = req.body
    const id = req.params.id
    const result = await updateAcademicFacultyService(title, id)

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty successfully updated',
      data: result,
    })
  }
)

export const deleteAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await deleteAcademicFacultyService(id)
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      message: 'Successfully deleted faculty',
      success: true,
      data: result,
    })
  }
)
