interface RawWeight {
    weight?: number;
    fatFreeMass?: number;
    fatMassWeight?: number;
    muscleMass?: number;
    fatRatio?: number;
    date: Date;
}

interface Weight {
    current: number;
    currentChange: number;
    fatRatio: number;
    fatFreeMass: number;
    fatFreeMassChange: number;
    fatMass: number;
    fatMassChange: number;
    muscleMass: number;
    muscleMassChange: number;
    updatedDate: Date;
    rawWeights: RawWeight[];
  }