/* eslint-disable no-console */
import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'
import { iGenericMessageError } from '../interfaces/error'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: iGenericMessageError[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
