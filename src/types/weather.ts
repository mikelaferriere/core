export interface CodeValue {
  unitCode: string
  value: number
}

export interface Context {
  '@version': string
  wx: string
  geo: string
  unit: string
  '@vocab': string
}

export interface Period {
  number: number
  name: string
  startTime: Date
  endTime: Date
  isDaytime: boolean
  temperature: number
  temperatureUnit: string
  probabilityOfPrecipitation: CodeValue
  dewPoint: CodeValue
  relativeHumidity: CodeValue
  windSpeed: string
  windDirection: string
  icon: string
  shortForecast: string
  detailedForecast: string
}

export interface WeatherResponse {
  '@context': [string, Context]
  type: string
  geometry: {
    type: string
    coordinates: number[][][]
  }
  properties: {
    updated: Date
    units: string
    forecastGenerator: string
    generatedAt: Date
    updateTime: Date
    validTimes: Date
    elevation: CodeValue
    periods: Period[]
  }
}
