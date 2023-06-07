import { Schema, model } from 'mongoose'
import { UserModel, userType } from './user.inferface'

const userSchema = new Schema<userType, UserModel>(
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
