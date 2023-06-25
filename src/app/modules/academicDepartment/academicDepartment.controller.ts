import { Request, Response } from 'express'
import catchAsync from '../../../sheared/catchAsync'
import {
  createAcademicDepartmentService,
  deleteSingleAcademicDepartmentControllerService,
  getAllAcademicDepartmentService,
  getSingleAcademicDepartmentControllerService,
  updateAcademicDepartmentService,
} from './academicDepartment.service'
import sendResponse from '../../../sheared/sendResponse'
import httpStatus from 'http-status'
import { IAcademicDepartment } from './academicDepartment.interface'
import pick from '../../../sheared/pick'
import { academicDepartmentFilterableField } from './academicDepartment.constant'
import { paginationFields } from '../../../constans/pagination'

export const createAcademicDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const department = req.body
    const result = await createAcademicDepartmentService(department)

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Successfully create department',
      data: result,
    })
  }
)

export const getAllAcademicDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableField)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await getAllAcademicDepartmentService(
      filters,
      paginationOptions
    )

    sendResponse<IAcademicDepartment[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All department successfully got',
      meta: result?.meta,
      data: result?.data,
    })
  }
)

export const updateAcademicDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const department = req.body
    const result = await updateAcademicDepartmentService(id, department)

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Successfully update department',
      data: result,
    })
  }
)

export const getSingleAcademicDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await getSingleAcademicDepartmentControllerService(id)

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Successfully got department',
      data: result,
    })
  }
)

export const deleteSingleAcademicDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await deleteSingleAcademicDepartmentControllerService(id)

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Successfully deleted department',
      data: result,
    })
  }
)
