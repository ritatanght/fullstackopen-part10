import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation sign_in($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;