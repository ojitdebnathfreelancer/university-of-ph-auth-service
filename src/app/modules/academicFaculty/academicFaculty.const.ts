import { IAcademicFacultyTitle } from './academicFaculty.interface'

export const academicFacultyTitleConst: IAcademicFacultyTitle[] = [
  'Faculty of Science and Engineering',
  'Faculty of Business Administration',
  'Faculty of Arts and Social Science',
]

export const academicFacultySearchableField: string[] = ['title']
export const academicFacultyFilterableField: string[] = ['searchTerm', 'title']
