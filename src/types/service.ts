export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Fatal = 'fatal',
}

export interface ServiceConfiguration {
  serviceName: string
  host: string
  minLogLevel?: LogLevel
}
