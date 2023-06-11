import { z } from 'zod'
import {
  academicSemesterMonths,
  academicSemisterCodeConst,
  academicSemisterTitleConst,
} from './academicSemester.constant'

const academicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitleConst] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({ required_error: 'Year is required' }),
    code: z.enum([...academicSemisterCodeConst] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
})

export const academicSemesterValidation = { academicSemesterZodSchema }
