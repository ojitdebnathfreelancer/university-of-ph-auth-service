/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './sheared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected 🔥')
    server = app.listen(config.port, () => {
      logger.info(`University app listening on port ${config.port}`)
    })
  } catch (err: any) {
    errorLogger.error(err.message)
  }

  process.on('unhandledRejection', error => {
    errorLogger.error((error as Error).message)

    if (server) {
      server.close(() => {
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

dbConnect()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
