import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  IacademicSemester,
} from './academicSemester.interface'

const academicSemesterSchema = new Schema<
  IacademicSemester,
  AcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: [true, 'Titel is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
    },
    startMonth: {
      type: String,
      required: [true, 'Start month is required'],
    },
    endMonth: {
      type: String,
      required: [true, 'End month is required'],
    },
  },
  {
    timestamps: true,
  }
)

export const AcademicSemester = model<IacademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
