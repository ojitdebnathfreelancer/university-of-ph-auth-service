import config from '../../../config'
import { userType } from './user.inferface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

export const createUserService = async (
  user: userType
): Promise<userType | null> => {
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
    throw new Error('Filed to create user')
  }
  return createdUser
}