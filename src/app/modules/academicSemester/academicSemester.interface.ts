import { Model } from 'mongoose'

export type IacademicSemester = {
  title: string
  year: number
  code: string
  startMonth: string
  endMonth: string
}

export type AcademicSemesterModel = Model<IacademicSemester>
