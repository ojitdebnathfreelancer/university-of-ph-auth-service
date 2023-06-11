import express from 'express'
import { userRoute } from '../modules/user/user.routers'
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
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
]

moduleRoutes.forEach(route => {
  mainRouter.use(route.path, route.route)
})

export default mainRouter
