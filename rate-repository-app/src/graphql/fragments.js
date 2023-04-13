import { gql } from "@apollo/client";
export const REPOSITORIES_DETAILS = gql`
  fragment RepositoriesDetails on Repository {
    fullName
    description
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    forksCount
    stargazersCount
  }
`;
