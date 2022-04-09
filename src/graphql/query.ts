import { gql } from '@apollo/client';

export const GET_STORE_DATA = gql`
    query MainPageQuery {
        category {
            name
            products {
                id
                name
                gallery
                category
                description
                prices{
                    amount
                    currency{
                        label
                        symbol  
                    }
                }
                inStock
                attributes {
                    id
                    items {
                        displayValue
                        id
                        value
                    }
                    name
                    type
                }
            }
        }
        currencies{
            label
            symbol
        }
        categories{
            name
        }
    }
`;
