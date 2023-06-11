import { iGenericMessageError } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: iGenericMessageError[]
}

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
