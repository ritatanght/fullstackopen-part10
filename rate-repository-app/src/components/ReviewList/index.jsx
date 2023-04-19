import { FlatList, View } from "react-native";
import useReviews from "../../hooks/useReviews";
import ItemSeparator from "../ItemSeparator";
import ReviewItem from "./ReviewItem";
import Text from "../Text";
import theme from "../theme";

const MyReviewList = () => {
  const { reviews, refetch } = useReviews();

  const styles = {
    backgroundColor: theme.bgColors.listItem,
    margin: 5,
    padding: 20,
    textAlign: "center",
  };

  const reviewsNode = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return reviewsNode.length > 0 ? (
    <FlatList
      data={reviewsNode}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} ownList={true} refetch={refetch} />
      )}
    ></FlatList>
  ) : (
    <View style={styles}>
      <Text>You have no reviews.</Text>
    </View>
  );
};

export default MyReviewList;
