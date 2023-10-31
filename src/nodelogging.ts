'use strict'

import { createLogger, transports, format } from 'winston'
import LokiTransport from 'winston-loki'

export const configure = ({ serviceName, host }: ServiceConfiguration) => {
  const consoleTransport = new transports.Console({
    format: format.combine(
      format.metadata(),
      format.timestamp(),
      format.colorize(),
      format.printf(({ timestamp, level, message, metadata }) => {
        return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
          metadata
        )}`
      })
    ),
  })

  const lokiTransport = new LokiTransport({
    host,
    labels: { app: serviceName },
    json: true,
  })

  const logger = createLogger({
    level: 'debug',
    transports: [consoleTransport, lokiTransport],
    defaultMeta: {
      service: serviceName,
    },
  })

  // Override the base console log with winston
  console.log = (...args) => logger.info.call(logger, args)
  console.debug = (...args) => logger.debug.call(logger, args)
  console.info = (...args) => logger.info.call(logger, args)
  console.warn = (...args) => logger.warn.call(logger, args)
  console.error = (...args) => logger.error.call(logger, args)

  return logger
}
