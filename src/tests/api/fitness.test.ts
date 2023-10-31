import { describe, expect, test } from '@jest/globals'

import * as Test from '../../api/fitness/withings'

const weights = [
  {
    weight: 174.35457731999998,
    fatFreeMass: 128.71894332,
    fatRatio: 26.174,
    fatMassWeight: 45.635633999999996,
    muscleMass: 122.1800404,
    date: '2023-08-26T12:36:17.000Z',
  },
  {
    weight: 172.78709249999997,
    fatFreeMass: 128.3419533,
    fatRatio: 25.722,
    fatMassWeight: 44.4451392,
    muscleMass: 121.80525499999999,
    date: '2023-08-25T10:08:13.000Z',
  },
  {
    weight: 173.35808907999998,
    fatFreeMass: 122.87229108,
    fatRatio: 29.122,
    fatMassWeight: 50.485798,
    muscleMass: 116.4921208,
    date: '2023-08-24T11:12:01.000Z',
  },
  {
    weight: 173.07589771999997,
    fatFreeMass: 125.43405951999999,
    fatRatio: 27.527,
    fatMassWeight: 47.641838199999995,
    muscleMass: 118.98334139999999,
    date: '2023-08-23T11:04:13.000Z',
  },
  {
    weight: 174.69408879999997,
    fatFreeMass: 126.0160792,
    fatRatio: 27.865,
    fatMassWeight: 48.6780096,
    muscleMass: 119.5565426,
    date: '2023-08-22T11:40:06.000Z',
  },
  {
    weight: 176.52171878,
    fatFreeMass: 128.48304898,
    fatRatio: 27.214,
    fatMassWeight: 48.038669799999994,
    muscleMass: 121.93753219999999,
    date: '2023-08-20T12:27:17.000Z',
  },
  {
    weight: 175.83608195999997,
    fatFreeMass: 126.29827055999999,
    fatRatio: 28.173,
    fatMassWeight: 49.537811399999995,
    muscleMass: 119.7990508,
    date: '2023-08-19T12:10:41.000Z',
  },
  {
    weight: 177.74969212,
    fatFreeMass: 127.30798652,
    fatRatio: 28.378,
    fatMassWeight: 50.44170559999999,
    muscleMass: 120.76908359999999,
    date: '2023-08-18T11:17:13.000Z',
  },
  {
    weight: 178.75058959999998,
    fatFreeMass: 129.1025472,
    fatRatio: 27.775,
    fatMassWeight: 49.648042399999994,
    muscleMass: 122.51073339999999,
    date: '2023-08-17T10:51:46.000Z',
  },
  {
    weight: 177.99220032,
    fatFreeMass: 126.51432331999999,
    fatRatio: 28.921,
    fatMassWeight: 51.477877,
    muscleMass: 119.9974666,
    date: '2023-08-16T11:00:41.000Z',
  },
  {
    weight: 178.86082059999998,
    fatFreeMass: 127.5813594,
    fatRatio: 28.67,
    fatMassWeight: 51.2794612,
    muscleMass: 121.03363799999998,
    date: '2023-08-15T11:02:58.000Z',
  },
  {
    date: '2023-08-10T11:02:58.000Z',
  },
]

describe('getLatest', () => {
  test('gets latest measurements from valid payload', () => {
    expect(Test.getLatest(weights, 'weight')).toBe(174.35)
    expect(Test.getLatest(weights, 'fatFreeMass')).toBe(128.72)
    expect(Test.getLatest(weights, 'fatMassWeight')).toBe(45.64)
    expect(Test.getLatest(weights, 'muscleMass')).toBe(122.18)
    expect(Test.getLatest(weights, 'fatRatio')).toBe(26.17)
  })
})

describe('findDifference', () => {
  test('gets change measurements from previous day', () => {
    expect(Test.findDifference(weights, 'weight')).toBe(1.57)
    expect(Test.findDifference(weights, 'fatFreeMass')).toBe(0.38)
    expect(Test.findDifference(weights, 'fatMassWeight')).toBe(1.19)
    expect(Test.findDifference(weights, 'muscleMass')).toBe(0.37)
    expect(Test.findDifference(weights, 'fatRatio')).toBe(0.45)
  })

  test('gets change measurements from different day', () => {
    const changeDate = new Date('2023-08-15')

    expect(Test.findDifference(weights, 'weight', changeDate)).toBe(-4.51)
    expect(Test.findDifference(weights, 'fatFreeMass', changeDate)).toBe(1.14)
    expect(Test.findDifference(weights, 'fatMassWeight', changeDate)).toBe(
      -5.64
    )
    expect(Test.findDifference(weights, 'muscleMass', changeDate)).toBe(1.15)
    expect(Test.findDifference(weights, 'fatRatio', changeDate)).toBe(-2.5)
  })

  test('gets change measurements from different day, missing values', () => {
    const dayMissingWeights = new Date('2023-08-10T00:00:00.000Z')

    expect(Test.findDifference(weights, 'weight', dayMissingWeights)).toBe(0)
    expect(Test.findDifference(weights, 'fatFreeMass', dayMissingWeights)).toBe(
      0
    )
    expect(
      Test.findDifference(weights, 'fatMassWeight', dayMissingWeights)
    ).toBe(0)
    expect(Test.findDifference(weights, 'muscleMass', dayMissingWeights)).toBe(
      0
    )
    expect(Test.findDifference(weights, 'fatRatio', dayMissingWeights)).toBe(0)
  })
})
