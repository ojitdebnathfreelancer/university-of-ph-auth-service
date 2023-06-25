import { Schema, model } from 'mongoose'
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>('Academic Department', academicDepartmentSchema)
