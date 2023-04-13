import { gql } from "@apollo/client";
import { REPOSITORIES_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoriesDetails
        }
      }
    }
  }
  ${REPOSITORIES_DETAILS}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
