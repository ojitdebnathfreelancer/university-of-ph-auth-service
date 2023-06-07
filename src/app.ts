import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import cors from 'cors'
import globalErrorHandeler from './app/middlewares/globarlErrorHandler'
import { userRoute } from './app/modules/user/user.routers'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
// parsers ends

app.use('/api/v1/user', userRoute)
// application routes

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('error tester')
//   // next('text error')
//   // Promise.reject(new Error('unhandle promise rejaction'))
//   // console.log(x)
// })

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: 'Success',
    message: 'University of ph server running',
  })
  next()
})

// global error handeler
app.use(globalErrorHandeler)

export default app
