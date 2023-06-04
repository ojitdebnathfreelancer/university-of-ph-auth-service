import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './sheared/logger'

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected 🔥')
    app.listen(config.port, () => {
      logger.info(`University app listening on port ${config.port}`)
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    errorLogger.error(err.message)
  }
}

dbConnect()
