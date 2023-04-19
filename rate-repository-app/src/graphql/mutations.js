import { gql } from "@apollo/client";
import { REPOSITORIES_DETAILS } from "./fragments";
export const SIGN_IN = gql`
  mutation sign_in($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation create_review($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      user {
        id
        username
      }
      repository {
        ...RepositoriesDetails
      }
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
  ${REPOSITORIES_DETAILS}
`;

export const CREATE_USER = gql`
  mutation create_user($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation delete_review($id: ID!) {
    deleteReview(id: $id)
  }
`;
