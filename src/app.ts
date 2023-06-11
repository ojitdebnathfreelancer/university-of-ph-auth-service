import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import cors from 'cors'
import globalErrorHandeler from './app/middlewares/globarlErrorHandler'
import mainRouter from './app/routes'
import httpStatus from 'http-status'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
// parsers ends

app.use('/api/v1', mainRouter)
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

// handel ont found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  })
})

export default app
