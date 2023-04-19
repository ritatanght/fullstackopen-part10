import { gql } from "@apollo/client";
import { REPOSITORIES_DETAILS, REVIEWS_DETAILS } from "./fragments";


export const GET_REPOSITORIES = gql`
  query repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy! = CREATED_AT
    $orderDirection: OrderDirection! = DESC
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoriesDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORIES_DETAILS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REVIEWS_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query getRepo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoriesDetails
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORIES_DETAILS}
  ${REVIEWS_DETAILS}
`;
