import mongoose from 'mongoose'
import { iGenericMessageError } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handelValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: iGenericMessageError[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handelValidationError
