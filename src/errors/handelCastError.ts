import mongoose from 'mongoose'
import { iGenericMessageError } from '../interfaces/error'

const handelCastError = (error: mongoose.Error.CastError) => {
  const errors: iGenericMessageError[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ]
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handelCastError
