enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Fatal = 'fatal'
}
interface ServiceConfiguration {
  serviceName: string
  host: string
  minLogLevel?: LogLevel
}
