/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { iGenericMessageError } from '../../interfaces/error'
import handelValidationError from '../../errors/HandelValidationError'
import ApiError from '../../errors/ApiErrors'
import { errorLogger } from '../../sheared/logger'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handelZodError'

const globalErrorHandeler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('development', error)
    : errorLogger.error('production', error)

  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: iGenericMessageError[] = []

  if (error.name === 'ValidationError') {
    const simpleFieldErr = handelValidationError(error)
    statusCode = simpleFieldErr.statusCode
    message = simpleFieldErr.message
    errorMessages = simpleFieldErr.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedErr = handleZodError(error)
    statusCode = simplifiedErr.statusCode
    message = simplifiedErr.message
    errorMessages = simplifiedErr.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  if (config.env === 'production') {
    errorLogger.error(error)
  }
  next()
}
export default globalErrorHandeler
