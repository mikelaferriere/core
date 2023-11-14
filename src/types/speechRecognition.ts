export interface EvaluationData {
  phrase: string
  action: string
  attribute?: string
  app?: string
  device_location?: string
  intents: string[]
  location: string
  numeric_values: number[]
  result: {
    data: string
  }
  state: string
  time?: string
  value: string[]
}
