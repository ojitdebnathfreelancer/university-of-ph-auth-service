import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import {
  academicSemesterSearchbaleFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
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
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchbaleFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortOrder, sortBy } =
    paginationHelper(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicSemester.find(whereCondition)
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

export const getSingleSemesterService = async (
  id: string
): Promise<IacademicSemester | null> => {
  const result = AcademicSemester.findById({ _id: id })
  return result
}

export const academicSemeisterUpdateService = async (
  data: Partial<IacademicSemester>,
  id: string
): Promise<IacademicSemester | null> => {
  if (
    data.code &&
    data.title &&
    academicSemesterTitleCodeMapper[data?.title] !== data?.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `This semester code is ${
        academicSemesterTitleCodeMapper[data.title]
      } but you put ${data.code}`
    )
  }

  const filter = { _id: id }
  const result = await AcademicSemester.findOneAndUpdate(filter, data, {
    new: true,
  })
  return result
}
