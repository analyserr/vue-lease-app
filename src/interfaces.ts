export interface ICalculationParams {
  brand: string,
  type: string
  year: number,
  purchasePrice: number
}

export interface IBoundaries {
    objectYear: {
        min: number,
        max: number
    },
    purchasePrice: {
        min: number,
        max: number
    }
}

export interface ICalculationResult {
    downPayment: number,
    monthlyPayment: number,
    tenor: number,
    totalCosts: number,
    balloonPayment: number
}
export interface ISavedCalculation {
    params: ICalculationParams,
    result: ICalculationResult
}