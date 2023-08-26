import { axios } from "../../request";
import { DateTime } from 'luxon'


/**
 * Retreives a user's activity information
 * 
 * @param user 
 * @returns 
 */
export const getUserActivityInformation = async (
  user: string
): Promise<any> => {
  const { data } = await axios.get(
    "/api/v4/fitbit/activity/" + user.toLocaleLowerCase()
  );
  return data;
};

/**
 * 
 * From a list of weights and a measurement type, return the latest
 * measurement value for the given type. If none are available, return 0.
 * 
 * @param {RawWeight[]} weights list of weights
 * @param {string} measurement the measurement type to find
 * @returns {number} latest value for that measurement type
 */
export const getLatest = (weights: RawWeight[], measurement: string): number => {
  if (!weights[0]) return 0;

  // @ts-ignore
  return weights[0][measurement]
}

/**
 * From a list of weights, measurement type and possible date, return the 
 * difference for the measurement type between the latest date and the one 
 * provided. If no date is provided, it will use the second most recent date
 * 
 * @param {RawWeight[]} weights list of weights
 * @param {string} measurement measurement type to find
 * @param {Date=} date optional date
 * @returns {number} difference between most recent measurement and measurement returned by date
 */
export const getChangeFrom = (weights: RawWeight[], measurement: string, date?: Date): number => {
  // @ts-ignore
  let mostRecentMeasurement = weights[0]?.[measurement]

  // @ts-ignore
  let changeMeasurement = weights[1]?.[measurement]

  if (date) {
    let daysWeights = weights.find(
      (w) => DateTime.fromJSDate(w.date).toFormat('YYYY-MM-DD') === DateTime.fromJSDate(date).toFormat('YYYY-MM-DD')
    )

    if (daysWeights) {
      // @ts-ignore
      changeMeasurement = daysWeights?.[measurement]
    }
  }

  if (!mostRecentMeasurement || !changeMeasurement) return 0
  return mostRecentMeasurement - changeMeasurement
}

/**
 * 
 * Retreives a user's weight information. If the most recent weight is valid, it is 
 * transformed into a Weight type. If it is not valid, then undefined is returned
 * 
 * @param user name of person to receive weight for
 * @returns A user's weight details, along with all the raw weight's and their details.
 */
export const getUserWeightInformation = async (user: string): Promise<Weight | undefined> => {
  const { data } = await axios.get<RawWeight[]>(
    "/api/v4/fitness/weight/" + user.toLocaleLowerCase()
  );

  // Latest weight is malformed, so don't return anything
  if (!data[0]?.weight) return undefined

  return {
    current: getLatest(data, 'weight'),
    currentChange: getChangeFrom(data, 'weight', new Date('2023-08-15')),
    fatRatio: getLatest(data, 'fatRatio'),
    fatFreeMass: getLatest(data, 'fatFreeMass'),
    fatFreeMassChange: getChangeFrom(data, 'fatFreeMass'),
    fatMass: getLatest(data, 'fatMassWeight'),
    fatMassChange: getChangeFrom(data, 'fatMassWeight'),
    muscleMass: getLatest(data, 'muscleMass'),
    muscleMassChange: getChangeFrom(data, 'muscleMass'),
    updatedDate: data[0].date,
    rawWeights: data,
  };
};