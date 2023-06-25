import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IPagigantionOptions } from '../../../interfaces/pagination'
import { academicFilterableFields } from '../academicSemester/academicSemester.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilterableField,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'
import { IGenericResponse } from '../../../interfaces/common'

export const createAcademicDepartmentService = async (
  department: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.create(department)
  return result
}

export const getAllAcademicDepartmentService = async (
  filters: IAcademicDepartmentFilterableField,
  paginationOptions: IPagigantionOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filter } = filters
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions)
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicFilterableFields.map(filed => ({
        [filed]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(filter).length > 0) {
    andConditions.push({
      $and: Object.entries(filter).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortOrder && sortBy) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty')

  const total = await AcademicDepartment.estimatedDocumentCount()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const updateAcademicDepartmentService = async (
  id: string,
  department: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, department)
  return result
}

export const getSingleAcademicDepartmentControllerService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}

export const deleteSingleAcademicDepartmentControllerService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}
