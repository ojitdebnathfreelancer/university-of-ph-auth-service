import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPagigantionOptions } from '../../../interfaces/pagination'
import {
  academicFacultySearchableField,
  academicFacultyTitleConst,
} from './academicFaculty.const'
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import ApiError from '../../../errors/ApiErrors'
import httpStatus from 'http-status'

export const createAcademicFacultyService = async (
  title: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(title)
  return result
}

export const getAllAcademicFacultyService = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPagigantionOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { limit, page, sortBy, skip, sortOrder } =
    paginationHelper(paginationOptions)

  const andConditions = []

  andConditions.push({
    $or: academicFacultySearchableField.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const defaultConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const sortOrderConditions: { [key: string]: SortOrder } = {}

  if (sortOrder && sortBy) {
    sortOrderConditions[sortBy] = sortOrder
  }

  const total = await AcademicFaculty.countDocuments()

  const result = await AcademicFaculty.find(defaultConditions)
    .sort(sortOrderConditions)
    .skip(skip)
    .limit(limit)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getSingleAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

export const updateAcademicFacultyService = async (
  data: IAcademicFaculty,
  id: string
): Promise<IAcademicFaculty | null> => {
  if (!academicFacultyTitleConst.includes(data?.title)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Your title is not valid, you can write ${academicFacultyTitleConst}`
    )
  }
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, data, {
    new: true,
  })
  return result
}

export const deleteAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}
