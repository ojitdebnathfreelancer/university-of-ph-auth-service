import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}
const calculatePagination = (paginationOptions: IOptions): IOptionsResult => {
  const page = Number(paginationOptions.page || 1)
  const limit = Number(paginationOptions.limit || 10)
  const skip = (page - 1) * limit
  const sortBy = paginationOptions.sortBy || 'createdAt'
  const sortOrder = paginationOptions.sortOrder || 'desc'
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}

export const paginationHelper = calculatePagination
