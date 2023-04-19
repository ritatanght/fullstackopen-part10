import { FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem/RepositoryItem";
import ReviewItem from "./ReviewList/ReviewItem";
import ItemSeparator from "./ItemSeparator";
import useSingleRepo from "../hooks/useSingleRepo";
import { useParams } from "react-router-native";

const SingleRepository = () => {
  const repoId = useParams().id;
  const { repository, loading, fetchMore } = useSingleRepo(repoId);

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem
          repository={repository}
          loading={loading}
          repoId={repoId}
        />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
