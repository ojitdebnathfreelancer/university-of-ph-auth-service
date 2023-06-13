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
    year: z.string({ required_error: 'Year is required' }),
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

const updateAcademicZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemisterTitleConst] as [string, ...string[]], {
          required_error: 'Put your semester title',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Put your semester year',
        })
        .optional(),
      code: z
        .enum([...academicSemisterCodeConst] as [string, ...string[]], {
          required_error: 'Put your semester code',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Put your start month',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Put your end month',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  )

export const academicSemesterValidation = {
  academicSemesterZodSchema,
  updateAcademicZodSchema,
}
