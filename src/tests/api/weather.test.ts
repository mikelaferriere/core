import axios from 'axios'
import { describe, expect, jest, test } from '@jest/globals'

import * as Test from './../../api/weather'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('fetchRealTime', () => {
  test('get realtime weather from valid payload', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        properties: {
          periods: [
            {
              number: 1,
              name: '',
              startTime: '2023-09-03T11:00:00-04:00',
              endTime: '2023-09-03T12:00:00-04:00',
              isDaytime: true,
              temperature: 84,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: 0,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 18.333333333333332,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 53,
              },
              windSpeed: '6 mph',
              windDirection: 'W',
              icon: 'https://api.weather.gov/icons/land/day/few,0?size=small',
              shortForecast: 'Sunny',
              detailedForecast: '',
            },
            {
              number: 2,
              name: '',
              startTime: '2023-09-03T12:00:00-04:00',
              endTime: '2023-09-03T13:00:00-04:00',
              isDaytime: true,
              temperature: 87,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: 0,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 18.333333333333332,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 48,
              },
              windSpeed: '6 mph',
              windDirection: 'NW',
              icon: 'https://api.weather.gov/icons/land/day/few,0?size=small',
              shortForecast: 'Sunny',
              detailedForecast: '',
            },
          ],
        },
      },
    })
    const response = await Test.realTime()
    expect(response).toStrictEqual({
      number: 1,
      name: '',
      startTime: '2023-09-03T11:00:00-04:00',
      endTime: '2023-09-03T12:00:00-04:00',
      isDaytime: true,
      temperature: 84,
      temperatureUnit: 'F',
      temperatureTrend: null,
      probabilityOfPrecipitation: {
        unitCode: 'wmoUnit:percent',
        value: 0,
      },
      dewpoint: {
        unitCode: 'wmoUnit:degC',
        value: 18.333333333333332,
      },
      relativeHumidity: {
        unitCode: 'wmoUnit:percent',
        value: 53,
      },
      windSpeed: '6 mph',
      windDirection: 'W',
      icon: 'https://api.weather.gov/icons/land/day/few,0?size=small',
      shortForecast: 'Sunny',
      detailedForecast: '',
    })
  })

  test('get realtime weather from empty payload', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { properties: { periods: [] } },
    })
    await expect(Test.realTime()).rejects.toEqual(
      new Error('No valid periods were returned from weather.gov API')
    )
  })
})

describe('fetchHourly', () => {
  test('get hourly weather from valid payload', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        properties: {
          periods: [
            {
              number: 1,
              name: '',
              startTime: '2023-09-03T11:00:00-04:00',
              endTime: '2023-09-03T12:00:00-04:00',
              isDaytime: true,
              temperature: 84,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: 0,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 18.333333333333332,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 53,
              },
              windSpeed: '6 mph',
              windDirection: 'W',
              icon: 'https://api.weather.gov/icons/land/day/few,0?size=small',
              shortForecast: 'Sunny',
              detailedForecast: '',
            },
            {
              number: 2,
              name: '',
              startTime: '2023-09-03T12:00:00-04:00',
              endTime: '2023-09-03T13:00:00-04:00',
              isDaytime: true,
              temperature: 87,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: 0,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 18.333333333333332,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 48,
              },
              windSpeed: '6 mph',
              windDirection: 'NW',
              icon: 'https://api.weather.gov/icons/land/day/few,0?size=small',
              shortForecast: 'Sunny',
              detailedForecast: '',
            },
          ],
        },
      },
    })
    const response = await Test.hourly()
    expect(response).toStrictEqual([
      {
        number: 1,
        name: '',
        startTime: '2023-09-03T11:00:00-04:00',
        endTime: '2023-09-03T12:00:00-04:00',
        isDaytime: true,
        temperature: 84,
        temperatureUnit: 'F',
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: 'wmoUnit:percent',
          value: 0,
        },
        dewpoint: {
          unitCode: 'wmoUnit:degC',
          value: 18.333333333333332,
        },
        relativeHumidity: {
          unitCode: 'wmoUnit:percent',
          value: 53,
        },
        windSpeed: '6 mph',
        windDirection: 'W',
        icon: 'https://api.weather.gov/icons/land/day/few,0?size=small',
        shortForecast: 'Sunny',
        detailedForecast: '',
      },
      {
        number: 2,
        name: '',
        startTime: '2023-09-03T12:00:00-04:00',
        endTime: '2023-09-03T13:00:00-04:00',
        isDaytime: true,
        temperature: 87,
        temperatureUnit: 'F',
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: 'wmoUnit:percent',
          value: 0,
        },
        dewpoint: {
          unitCode: 'wmoUnit:degC',
          value: 18.333333333333332,
        },
        relativeHumidity: {
          unitCode: 'wmoUnit:percent',
          value: 48,
        },
        windSpeed: '6 mph',
        windDirection: 'NW',
        icon: 'https://api.weather.gov/icons/land/day/few,0?size=small',
        shortForecast: 'Sunny',
        detailedForecast: '',
      },
    ])
  })

  test('get hourly weather from empty payload', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { properties: { periods: [] } },
    })
    const response = await Test.hourly()
    expect(response).toEqual([])
  })
})

describe('fetchForecast', () => {
  test('get forecast weather from valid payload', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        properties: {
          periods: [
            {
              number: 1,
              name: 'Tonight',
              startTime: '2023-09-03T19:00:00-04:00',
              endTime: '2023-09-04T06:00:00-04:00',
              isDaytime: false,
              temperature: 76,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: null,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 20.555555555555557,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 79,
              },
              windSpeed: '3 to 7 mph',
              windDirection: 'W',
              icon: 'https://api.weather.gov/icons/land/night/sct?size=medium',
              shortForecast: 'Partly Cloudy',
              detailedForecast:
                'Partly cloudy, with a low around 76. West wind 3 to 7 mph.',
            },
            {
              number: 2,
              name: 'Labor Day',
              startTime: '2023-09-04T06:00:00-04:00',
              endTime: '2023-09-04T18:00:00-04:00',
              isDaytime: true,
              temperature: 96,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: null,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 20.555555555555557,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 79,
              },
              windSpeed: '5 to 9 mph',
              windDirection: 'NW',
              icon: 'https://api.weather.gov/icons/land/day/sct?size=medium',
              shortForecast: 'Mostly Sunny',
              detailedForecast:
                'Mostly sunny, with a high near 96. Northwest wind 5 to 9 mph.',
            },
            {
              number: 3,
              name: 'Monday Night',
              startTime: '2023-09-04T18:00:00-04:00',
              endTime: '2023-09-05T06:00:00-04:00',
              isDaytime: false,
              temperature: 76,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: null,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 20.555555555555557,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 76,
              },
              windSpeed: '7 mph',
              windDirection: 'NW',
              icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
              shortForecast: 'Mostly Clear',
              detailedForecast:
                'Mostly clear, with a low around 76. Northwest wind around 7 mph.',
            },
          ],
        },
      },
    })
    const response = await Test.forecast()
    expect(response).toStrictEqual([
      {
        number: 1,
        name: 'Tonight',
        startTime: '2023-09-03T19:00:00-04:00',
        endTime: '2023-09-04T06:00:00-04:00',
        isDaytime: false,
        temperature: 76,
        temperatureUnit: 'F',
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: 'wmoUnit:percent',
          value: null,
        },
        dewpoint: {
          unitCode: 'wmoUnit:degC',
          value: 20.555555555555557,
        },
        relativeHumidity: {
          unitCode: 'wmoUnit:percent',
          value: 79,
        },
        windSpeed: '3 to 7 mph',
        windDirection: 'W',
        icon: 'https://api.weather.gov/icons/land/night/sct?size=medium',
        shortForecast: 'Partly Cloudy',
        detailedForecast:
          'Partly cloudy, with a low around 76. West wind 3 to 7 mph.',
      },
      {
        number: 2,
        name: 'Labor Day',
        startTime: '2023-09-04T06:00:00-04:00',
        endTime: '2023-09-04T18:00:00-04:00',
        isDaytime: true,
        temperature: 96,
        temperatureUnit: 'F',
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: 'wmoUnit:percent',
          value: null,
        },
        dewpoint: {
          unitCode: 'wmoUnit:degC',
          value: 20.555555555555557,
        },
        relativeHumidity: {
          unitCode: 'wmoUnit:percent',
          value: 79,
        },
        windSpeed: '5 to 9 mph',
        windDirection: 'NW',
        icon: 'https://api.weather.gov/icons/land/day/sct?size=medium',
        shortForecast: 'Mostly Sunny',
        detailedForecast:
          'Mostly sunny, with a high near 96. Northwest wind 5 to 9 mph.',
      },
      {
        number: 3,
        name: 'Monday Night',
        startTime: '2023-09-04T18:00:00-04:00',
        endTime: '2023-09-05T06:00:00-04:00',
        isDaytime: false,
        temperature: 76,
        temperatureUnit: 'F',
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: 'wmoUnit:percent',
          value: null,
        },
        dewpoint: {
          unitCode: 'wmoUnit:degC',
          value: 20.555555555555557,
        },
        relativeHumidity: {
          unitCode: 'wmoUnit:percent',
          value: 76,
        },
        windSpeed: '7 mph',
        windDirection: 'NW',
        icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
        shortForecast: 'Mostly Clear',
        detailedForecast:
          'Mostly clear, with a low around 76. Northwest wind around 7 mph.',
      },
    ])
  })

  test('get forecast weather for a specific Period', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        properties: {
          periods: [
            {
              number: 1,
              name: 'Tonight',
              startTime: '2023-09-03T19:00:00-04:00',
              endTime: '2023-09-04T06:00:00-04:00',
              isDaytime: false,
              temperature: 76,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: null,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 20.555555555555557,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 79,
              },
              windSpeed: '3 to 7 mph',
              windDirection: 'W',
              icon: 'https://api.weather.gov/icons/land/night/sct?size=medium',
              shortForecast: 'Partly Cloudy',
              detailedForecast:
                'Partly cloudy, with a low around 76. West wind 3 to 7 mph.',
            },
            {
              number: 2,
              name: 'Labor Day',
              startTime: '2023-09-04T06:00:00-04:00',
              endTime: '2023-09-04T18:00:00-04:00',
              isDaytime: true,
              temperature: 96,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: null,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 20.555555555555557,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 79,
              },
              windSpeed: '5 to 9 mph',
              windDirection: 'NW',
              icon: 'https://api.weather.gov/icons/land/day/sct?size=medium',
              shortForecast: 'Mostly Sunny',
              detailedForecast:
                'Mostly sunny, with a high near 96. Northwest wind 5 to 9 mph.',
            },
            {
              number: 3,
              name: 'Monday Night',
              startTime: '2023-09-04T18:00:00-04:00',
              endTime: '2023-09-05T06:00:00-04:00',
              isDaytime: false,
              temperature: 76,
              temperatureUnit: 'F',
              temperatureTrend: null,
              probabilityOfPrecipitation: {
                unitCode: 'wmoUnit:percent',
                value: null,
              },
              dewpoint: {
                unitCode: 'wmoUnit:degC',
                value: 20.555555555555557,
              },
              relativeHumidity: {
                unitCode: 'wmoUnit:percent',
                value: 76,
              },
              windSpeed: '7 mph',
              windDirection: 'NW',
              icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
              shortForecast: 'Mostly Clear',
              detailedForecast:
                'Mostly clear, with a low around 76. Northwest wind around 7 mph.',
            },
          ],
        },
      },
    })
    const response = await Test.forecast(undefined, 'Monday')
    expect(response).toStrictEqual([
      {
        number: 3,
        name: 'Monday Night',
        startTime: '2023-09-04T18:00:00-04:00',
        endTime: '2023-09-05T06:00:00-04:00',
        isDaytime: false,
        temperature: 76,
        temperatureUnit: 'F',
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: 'wmoUnit:percent',
          value: null,
        },
        dewpoint: {
          unitCode: 'wmoUnit:degC',
          value: 20.555555555555557,
        },
        relativeHumidity: {
          unitCode: 'wmoUnit:percent',
          value: 76,
        },
        windSpeed: '7 mph',
        windDirection: 'NW',
        icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
        shortForecast: 'Mostly Clear',
        detailedForecast:
          'Mostly clear, with a low around 76. Northwest wind around 7 mph.',
      },
    ])
  })

  test('get forecast weather from empty payload', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { properties: { periods: [] } },
    })
    const response = await Test.forecast()
    expect(response).toStrictEqual([])
  })
})
