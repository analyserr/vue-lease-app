import type { ICalculationParams } from '@/interfaces';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useCalculationQuery = (queryParams: ICalculationParams) => {
    const query = gql`
        query Calculate($brand: String!, $type: String!, $year: Int!, $purchasePrice: Float!) {
            leaseCalculation(input: {
                purchasePrice: $purchasePrice,
                object: {
                    year: $year
                    brand: $brand
                    type: $type
                }
            }) {
                totalCosts
                downPayment
                tenor
                balloonPayment
                monthlyPayment
            }
        }
    `;
    const { result, loading, error } = useQuery(query, queryParams || {})
    return { result, loading, error }
}

// handlingFee /* ?? */