/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express'
import { createUserService } from './user.service'

export const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body.user
    const result = await createUserService(user)
    res.status(200).send({
      scuccess: true,
      data: result,
      message: 'user created successfully',
    })
  } catch (error: any) {
    next(error)
  }
}
