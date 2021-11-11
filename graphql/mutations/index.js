import { gql } from '@apollo/client';

export const login = gql`
mutation login($input: loginInput) {
    login(input: $input) {
    statusCode
    message
    response
    error
  }
}
`;

export const register = gql`
mutation register($input: loginInput) {
    register(input: $input) {
    statusCode
    message
    response
    error
  }
}
`;

export const create_product = gql`
mutation createProduct($input: productInput) {
  createProduct(input: $input) {
    statusCode
    message
    response
    error
  }
}
`;

export const getProductsSeller = gql`
  mutation getProductsSeller ($idSeller: Int) {
    getProductsSeller (idSeller: $idSeller) {
      statusCode
      message
      error
      response
    }
  }
`;