import express from 'express'
import { userRoute } from '../modules/user/user.routers'
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'
const mainRouter = express.Router()

const moduleRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
]

moduleRoutes.forEach(route => {
  mainRouter.use(route.path, route.route)
})

export default mainRouter
