import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useBoundariesQuery = () => {
    const query = gql`
        query GetBoundaries{
            boundaries {
                objectYear {
                    min
                    max
                }
                purchasePrice {
                    min
                    max
                }
            }
        }
    `
    const { result, loading, error } = useQuery(query, null, { fetchPolicy: 'cache-first' })
    return { result, loading, error }
}