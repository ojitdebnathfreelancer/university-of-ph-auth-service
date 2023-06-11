import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import {
  IAcademicSemesterFilters,
  IacademicSemester,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPagigantionOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

export const createAcademicSemesterService = async (
  payload: IacademicSemester
): Promise<IacademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `This semester code is ${
        academicSemesterTitleCodeMapper[payload.title]
      } but you put ${payload.code}`
    )
  }
  const result = await AcademicSemester.create(payload)
  return result
}

export const getAllSemesterService = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPagigantionOptions
): Promise<IGenericResponse<IacademicSemester[]>> => {
  const { searchTerm } = filters

  const academicSemesterSearchbaleFields = ['title', 'code', 'year']
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchbaleFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  const { page, limit, skip, sortOrder, sortBy } =
    paginationHelper(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
