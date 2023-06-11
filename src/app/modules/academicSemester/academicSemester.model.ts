import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  IacademicSemester,
} from './academicSemester.interface'
import {
  academicSemesterMonths,
  academicSemisterCodeConst,
  academicSemisterTitleConst,
} from './academicSemester.constant'
import ApiError from '../../../errors/ApiErrors'
import httpStatus from 'http-status'

const academicSemesterSchema = new Schema<
  IacademicSemester,
  AcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: [true, 'Titel is required'],
      enum: academicSemisterTitleConst,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
      enum: academicSemisterCodeConst,
    },
    startMonth: {
      type: String,
      required: [true, 'Start month is required'],
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: [true, 'End month is required'],
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
)

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic is already exist!')
  }
  next()
})
//Handling same year and same semester issue

export const AcademicSemester = model<IacademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
