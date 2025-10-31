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