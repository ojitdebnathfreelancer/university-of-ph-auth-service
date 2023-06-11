import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { IUser } from './user.inferface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const userId = await generateUserId()

  if (userId) {
    user.id = userId
  }

  // default pass
  if (!user.password) {
    user.password = config.default_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Filed to create user')
  }
  return createdUser
}
