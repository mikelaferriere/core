import * as Test from '../../api/fitness';

const weights = [
  {
    weight: 100,
    fatFreeMass: 50,
    fatMassWeight: 25,
    muscleMass: 10,
    fatRatio: 20,
    date: new Date('2023-08-26'),
  },
  {
    weight: 105,
    fatFreeMass: 55,
    fatMassWeight: 30,
    muscleMass: 15,
    fatRatio: 25,
    date: new Date('2023-08-25'),
  },
  {
    weight: 110,
    fatFreeMass: 60,
    fatMassWeight: 35,
    muscleMass: 20,
    fatRatio: 30,
    date: new Date('2023-08-15'),
  },
  {
    date: new Date('2023-08-10'),
  },
]

describe('getLatest', () => {
  test('gets latest measurements from valid payload', () => {
    expect(Test.getLatest(weights, 'weight')).toBe(100);
    expect(Test.getLatest(weights, 'fatFreeMass')).toBe(50);
    expect(Test.getLatest(weights, 'fatMassWeight')).toBe(25);
    expect(Test.getLatest(weights, 'muscleMass')).toBe(10);
    expect(Test.getLatest(weights, 'fatRatio')).toBe(20);
    expect(Test.getLatest(weights, 'date')).toStrictEqual(new Date('2023-08-26'));
  });
});

describe('getChangeFrom', () => {
  test('gets change measurements from previous day', () => {
    expect(Test.getChangeFrom(weights, 'weight')).toBe(-5);
    expect(Test.getChangeFrom(weights, 'fatFreeMass')).toBe(-5);
    expect(Test.getChangeFrom(weights, 'fatMassWeight')).toBe(-5);
    expect(Test.getChangeFrom(weights, 'muscleMass')).toBe(-5);
    expect(Test.getChangeFrom(weights, 'fatRatio')).toBe(-5);
  });

  test('gets change measurements from different day', () => {
    expect(Test.getChangeFrom(weights, 'weight', new Date('2023-08-15'))).toBe(-10);
    expect(Test.getChangeFrom(weights, 'fatFreeMass', new Date('2023-08-15'))).toBe(-10);
    expect(Test.getChangeFrom(weights, 'fatMassWeight', new Date('2023-08-15'))).toBe(-10);
    expect(Test.getChangeFrom(weights, 'muscleMass', new Date('2023-08-15'))).toBe(-10);
    expect(Test.getChangeFrom(weights, 'fatRatio', new Date('2023-08-15'))).toBe(-10);
  });

  test('gets change measurements from different day, missing values', () => {
    expect(Test.getChangeFrom(weights, 'weight', new Date('2023-08-10'))).toBe(0);
    expect(Test.getChangeFrom(weights, 'fatFreeMass', new Date('2023-08-10'))).toBe(0);
    expect(Test.getChangeFrom(weights, 'fatMassWeight', new Date('2023-08-10'))).toBe(0);
    expect(Test.getChangeFrom(weights, 'muscleMass', new Date('2023-08-10'))).toBe(0);
    expect(Test.getChangeFrom(weights, 'fatRatio', new Date('2023-08-10'))).toBe(0);
  });

});