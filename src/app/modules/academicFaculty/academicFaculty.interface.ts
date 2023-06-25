import { Model } from 'mongoose'

export type IAcademicFacultyTitle =
  | 'Faculty of Science and Engineering'
  | 'Faculty of Business Administration'
  | 'Faculty of Arts and Social Science'

export type IAcademicFaculty = {
  title: IAcademicFacultyTitle
}

export type IAcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>

export type IAcademicFacultyFilters = { searchTerm?: string }
