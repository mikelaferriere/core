'use strict'

import { createLogger, transports, format, Logger } from 'winston'
import LokiTransport from 'winston-loki'
import { LogLevel, ServiceConfiguration } from './types/service'

let logger: Logger

const configure = ({
  serviceName,
  host,
  minLogLevel = LogLevel.Debug,
}: ServiceConfiguration): void => {
  if (logger) {
    return
  }

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
    host: `${host}:3100`,
    labels: { app: serviceName },
    json: true,
    format: format.json(),
    replaceTimestamp: true,
    onConnectionError: (error) => console.error(error),
  })

  logger = createLogger({
    level: minLogLevel || LogLevel.Debug,
    transports: [consoleTransport, lokiTransport],
    defaultMeta: {
      service: serviceName,
    },
  })
}

export const getLogger = (configuration: ServiceConfiguration): Logger => {
  configure(configuration)
  return logger
}
