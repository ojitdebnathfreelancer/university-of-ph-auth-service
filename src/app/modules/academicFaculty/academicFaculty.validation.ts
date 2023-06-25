import { z } from 'zod'
import { academicFacultyTitleConst } from './academicFaculty.const'

const academicFacultyZodValidation = z.object({
  body: z.object({
    title: z.enum([...academicFacultyTitleConst] as [string, ...string[]], {
      required_error: 'Please put your valid title',
    }),
  }),
})

export const academicFacultyValidation = { academicFacultyZodValidation }
