import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import cors from 'cors'
import router from './app/modules/user/user.routers'
import globalErrorHandeler from './app/middlewares/globarlErrorHandler'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
// parsers ends

app.use('/api/v1/user', router)
// application routes

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
