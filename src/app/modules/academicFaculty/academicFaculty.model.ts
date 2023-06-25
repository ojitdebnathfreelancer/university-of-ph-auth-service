import { Schema, model } from 'mongoose'
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface'
import { academicFacultyTitleConst } from './academicFaculty.const'

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  IAcademicFacultyModel
>(
  {
    title: {
      type: String,
      enum: academicFacultyTitleConst,
      required: [true, 'Please put faculty title'],
    },
  },
  { timestamps: true }
)

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  'academicFaculty',
  academicFacultySchema
)
