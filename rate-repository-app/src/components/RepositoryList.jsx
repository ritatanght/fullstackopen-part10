import { FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem/RepositoryItem";
import OrderingSelector from "./OrderingSelector";
import useRepositories from "../hooks/useRepositories";
import SearchBar from "./SearchBar";

export const RepositoryListContainer = ({
  repositories,
  repoRefetch,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <>
          <SearchBar repoRefetch={repoRefetch} />
          <OrderingSelector repoRefetch={repoRefetch} />
        </>
      }
      ListHeaderComponentStyle={{ zIndex: 5 }}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const { repositories, refetch, fetchMore } = useRepositories();

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      repoRefetch={refetch}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
