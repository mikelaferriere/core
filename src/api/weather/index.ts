import axios from 'axios'
import { Period, WeatherResponse } from '../../models/api/weather'

enum PeriodType {
  Hourly = 'forecast/hourly',
  Forecast = 'forecast',
}

/**
 *
 * Helper function to DRY requests to weather.gov
 *
 * @param period {PeriodType} what type of data is being requested
 * @param city optional city string. Currently unused
 * @returns Returns list of periods for a given PeriodType
 */
const makeWeatherRequest = async (
  period: PeriodType,
  city?: string
): Promise<Period[]> => {
  if (city) {
    console.warn(
      'City is not currently supported. Only Baltimore will be returned.'
    )
  }
  const cityParams = city ? 'LWX/96,70' : 'LWX/96,70'

  const url = `https://api.weather.gov/gridpoints/${cityParams}/${period}`
  return axios
    .get<WeatherResponse>(url)
    .then(({ data }) => data)
    .then(({ properties: { periods } }) => periods)
}

/**
 *
 * Retrieves the most recent period for the upcoming weather in thh given location. If the list is empty, and error is thrown
 *
 * @param city optional city location to retreive weather for
 * @returns Realtime, as in, the first period in the list of periods, weather for the given location.
 * @throws Error if the period list returned from weather.gov is empty
 */
export const realTime = async (city?: string): Promise<Period> => {
  return makeWeatherRequest(PeriodType.Hourly, city).then((periods) => {
    const activeWeather = periods.find((p) => p.number === 1)
    if (activeWeather) {
      return activeWeather
    }

    throw new Error('No valid periods were returned from weather.gov API')
  })
}

/**
 *
 * Retreives the hourly weather for the given location
 *
 * @param city optional city location to retreive weather for
 * @returns List of periods, split by hour, of weather for the given city
 */
export const hourly = async (city?: string): Promise<Period[]> => {
  return makeWeatherRequest(PeriodType.Hourly, city)
}

/**
 *
 * Retreives the forecast for the current week, split by morning and night, unless a specific period is requested.
 *
 * @param city optional city location to retreive weather for
 * @param specificPeriod optional specificPeriod that should be returned for the forecast. If not provided, full week of forecast will be returned
 * @returns List of periods, split by morning and night, unless a specific period is requested.
 */
export const forecast = async (
  city?: string,
  specificPeriod?: string
): Promise<Period[]> => {
  return makeWeatherRequest(PeriodType.Forecast, city).then((periods) => {
    if (specificPeriod) {
      const result = periods.find(({ name }) =>
        name.toLocaleLowerCase().includes(specificPeriod.toLocaleLowerCase())
      )
      if (!result) return []
      return [result]
    }
    return periods
  })
}
