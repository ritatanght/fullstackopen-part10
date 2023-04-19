import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useReviews = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  return {
    reviews: data ? data.me.reviews : undefined,
    refetch,
  };
};

export default useReviews;
