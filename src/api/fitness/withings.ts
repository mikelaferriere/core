import axios from 'axios'
import { DateTime } from 'luxon'

import * as Config from '../../config'
import { By, Weight, WeightComparison } from '../../types/withings'

/**
 *
 * Round a number with any number of digits to a number with 2 digits
 *
 * @param value number to round
 * @returns number rounded to two digits
 */
const twoDecimals = (value: number): number => Number(value.toFixed(2))

/**
 *
 * From a list of weights and a measurement type, return the latest
 * measurement value for the given type. If none are available, return 0.
 *
 * @param {Weight[]} weights list of weights
 * @param {string} measurement the measurement type to find
 * @returns {number} latest value for that measurement type
 */
export const getLatest = (weights: Weight[], measurement: string): number => {
  if (!weights[0]) return 0

  // @ts-ignore
  return twoDecimals(weights[0][measurement])
}

/**
 *
 * From a list of weights and a measurement type, return the expected
 * weight. If one can't be found, return undefined
 *
 * @param {Weight[]} weights list of weights
 * @param {By} by what to search by
 * @param {Date | undefined} value value
 * @returns {Weight | undefined} weight
 */
export const get = (weights: Weight[], by: By, value?: Date): Weight | undefined => {
  if (by === By.Latest) {
    if (!weights[0] || weights[0].weight === undefined) return undefined
    return weights[0]
  }

  if (by === By.Yesterday) {
    if (!weights[1]) return undefined
      return weights[1]
  }

  if (by === By.Date && value !== undefined) {
    const compareDate = DateTime.fromISO(value.toISOString(), {
      zone: 'UTC',
    })

    let daysWeights = weights.filter((w) => {
      const endDate = DateTime.fromISO(w.date, { zone: 'UTC' })
      return endDate <= compareDate
    })

    if (daysWeights) return daysWeights.reverse()[0];
  }

  return undefined
}


/**
 * From a list of weights, measurement type and possible date, return the
 * difference for the measurement type between the latest date and the one
 * provided. If no date is provided, it will use the second most recent date
 *
 * @param {Weight[]} weights list of weights
 * @param {string} measurement measurement type to find
 * @param {Date} date optional date
 * @returns {number} difference between most recent measurement and measurement returned by date
 */
export const findDifference = (
  weights: Weight[],
  measurement: string,
  date?: Date
): number => {
  // @ts-ignore
  let mostRecentMeasurement = weights[0]?.[measurement]

  // @ts-ignore
  let changeMeasurement = weights[1]?.[measurement]

  if (date) {
    const compareDate = DateTime.fromISO(date.toISOString(), {
      zone: 'UTC',
    })

    let daysWeights = weights.find((w) => {
      const endDate = DateTime.fromISO(w.date, { zone: 'UTC' })

      return (
        endDate.year === compareDate.year &&
        endDate.month === compareDate.month &&
        endDate.day === compareDate.day
      )
    })

    if (daysWeights) {
      // @ts-ignore
      changeMeasurement = daysWeights?.[measurement]
    }
  }

  if (!mostRecentMeasurement || !changeMeasurement) return 0
  return twoDecimals(mostRecentMeasurement - changeMeasurement)
}

/**
 *
 * Retreives a user's weight information. If the most recent weight is valid, it is
 * transformed into a Weight type. If it is not valid, then undefined is returned
 *
 * This function should NOT be used by any process that cannot set environment variables
 *
 * @param user name of person to receive weight for
 * @param changeDate optional Date to use as a starting date
 * @returns A user's weight details, along with all the raw weight's and their details.
 * @throws Error
 */
export const fetch = async (user: string): Promise<Weight[]> => {
  const host = Config.getHost()
  return axios
    .get<Weight[]>(`${host}/api/v4/fitness/weight/${user.toLocaleLowerCase()}`)
    .then(({ data }) => data)
    .catch(Promise.reject)
}

/**
 *
 * If the most recent weight is valid, it is transformed into a Weight type.
 * If it is not valid, then undefined is returned
 *
 * @param {Weight[]} data weights for a given user
 * @param changeDate optional Date to use as a starting date
 * @returns A user's weight details compared to a given date, along with all the raw weight's and their details.
 * @throws Error
 */
export const compare = (data: Weight[], changeDate: Date): WeightComparison => {
  // Latest weight is malformed, so don't return anything
  if (!data[0]?.weight)
    throw new Error('No weight registered for most recent entry.')

  return {
    current: {
      weight: getLatest(data, 'weight'),
      fatRatio: getLatest(data, 'fatRatio'),
      fatFreeMass: getLatest(data, 'fatFreeMass'),
      fatMassWeight: getLatest(data, 'fatMassWeight'),
      muscleMass: getLatest(data, 'muscleMass'),
      date: data[0].date,
    },
    compare: {
      weight: findDifference(data, 'weight', changeDate),
      fatRatio: findDifference(data, 'fatRatio', changeDate),
      fatFreeMass: findDifference(data, 'fatFreeMass', changeDate),
      fatMassWeight: findDifference(data, 'fatMassWeight', changeDate),
      muscleMass: findDifference(data, 'muscleMass', changeDate),
      date: changeDate.toISOString(),
    },
    updatedDate: new Date(data[0].date),
    rawWeights: data,
  }
}

export const compareV2 = (data: Weight[], by: By, value: Date): WeightComparison => {
  // Latest weight is malformed, so don't return anything
  const current = get(data, By.Latest)
  if (!current)
    throw new Error('No weight registered for most recent entry.')

  const compare = get(data, by, value) ?? current
  return {
    current,
    compare,
    updatedDate: new Date(data[0].date),
    rawWeights: data,
  }
}