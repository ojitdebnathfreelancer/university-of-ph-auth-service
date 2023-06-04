import { NextFunction, Request, Response } from 'express'
import { createUserService } from './user.service'

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user
    const result = await createUserService(user)
    res.status(200).send({
      scuccess: true,
      data: result,
      message: 'user created successfully',
    })
  } catch (error: unknown) {
    next(error)
  }
}
