import { createLogger, format, transports } from 'winston'
import path from 'path'
const { combine, timestamp, printf, prettyPrint } = format
import DailyRotateFile from 'winston-daily-rotate-file'

// custom logger format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

// success logger
export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        // eslint-disable-next-line no-undef
        process.cwd(),
        'logs',
        'winston',
        'succeses',
        'phu-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

// error logger
export const errorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        // eslint-disable-next-line no-undef
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
