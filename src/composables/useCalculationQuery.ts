import type { ICalculationParams } from '@/interfaces';
import { useQuery } from '@vue/apollo-composable'
import { type Ref } from 'vue'
import gql from 'graphql-tag'

export const useCalculationQuery = (queryParams: Ref<ICalculationParams | undefined>) => {
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
    const { result, loading, error, refetch } = useQuery(query, queryParams)
    return { result, loading, error, refetch }
}

// handlingFee /* ?? */