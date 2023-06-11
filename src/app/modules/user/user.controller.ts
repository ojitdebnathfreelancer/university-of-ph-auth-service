import { Request, Response } from 'express'
import { createUserService } from './user.service'
import catchAsync from '../../../sheared/catchAsync'
import sendResponse from '../../../sheared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.inferface'

export const createUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body.user
    const result = await createUserService(user)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully created semester',
      data: result,
    })
  }
)
