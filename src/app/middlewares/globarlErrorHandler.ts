import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { iGenericMessageError } from '../../interfaces/error'
import handelValidationError from '../../errors/HandelValidationError'
import ApiError from '../../errors/ApiErrors'

const globalErrorHandeler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   res.status(400).send({ err: err })
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: iGenericMessageError[] = []

  if (err.name === 'ValidationError') {
    const simpleFieldErr = handelValidationError(err)
    statusCode = simpleFieldErr.statusCode
    message = simpleFieldErr.message
    errorMessages = simpleFieldErr.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}
export default globalErrorHandeler
