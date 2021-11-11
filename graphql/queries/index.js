import { gql } from '@apollo/client';

export const getProducts = gql`
  query getProducts {
    getProducts {
      statusCode
      message
      error
      response
    }
  }
`;

export const getProductsAdmin = gql`
  query getProductsAdmin {
    getProductsAdmin {
      statusCode
      message
      error
      response
    }
  }
`;

export const getListProviders = gql`
  query getListProviders {
    getListProviders {
      statusCode
      message
      error
      response
    }
  }
`;