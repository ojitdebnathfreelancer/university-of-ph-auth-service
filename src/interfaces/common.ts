import { iGenericMessageError } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: iGenericMessageError[]
}
