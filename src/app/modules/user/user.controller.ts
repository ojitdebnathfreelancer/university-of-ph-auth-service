import { Request, Response } from 'express'
import { createUserService } from './user.service'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    const result = await createUserService(user)
    res.status(200).send({
      status: 'Succeed',
      data: result,
    })
  } catch (error: unknown) {
    res.status(400).send({
      status: 'Faild',
      message: error,
    })
  }
}
