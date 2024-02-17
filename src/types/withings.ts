export interface Weight {
  weight?: number
  fatFreeMass?: number
  fatMassWeight?: number
  muscleMass?: number
  fatRatio?: number
  date: string
}

export interface WeightComparison {
  current: Weight
  compare: Weight
  updatedDate: Date
  rawWeights: Weight[]
}

export enum By {
  Date,
  Latest,
  Yesterday
}