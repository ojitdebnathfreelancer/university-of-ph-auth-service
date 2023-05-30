import { Model, Schema, model } from 'mongoose'
import { userType } from './user.inferface'

type UserModel = Model<userType, object>

const userSchema = new Schema<userType>(
  {
    id: {
      type: String,
      required: [true, 'Required the id field'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<userType, UserModel>('User', userSchema)
