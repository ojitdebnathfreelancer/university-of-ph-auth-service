import { z } from 'zod'

export const createAcademicDepartmentZod = z.object({
  body: z.object({
    title: z.string({ required_error: 'Department title required' }),
    academicFaculty: z.string({ required_error: 'Academic faculty required' }),
  }),
})

export const updateAcademicDepartmentZod = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
})
