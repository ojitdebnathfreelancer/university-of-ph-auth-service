import { Response } from 'express'

const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number
    success?: boolean
    message?: string | null
    meta?: { page: number; limit: number; total: number }
    data?: T | null
  }
): void => {
  res.status(data.statusCode).send({
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  })
}

export default sendResponse
