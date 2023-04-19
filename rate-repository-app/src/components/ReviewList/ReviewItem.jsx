import { StyleSheet } from "react-native";
import { format } from "date-fns";
import { View, Pressable, Alert } from "react-native";
import { Link } from "react-router-native";
import Text from "../Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../../graphql/mutations";

// Single review item
const ReviewItem = ({ review, ownList, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const {
    id,
    text,
    rating,
    createdAt,
    repositoryId,
    repository: { fullName },
    user: { username },
  } = review;
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      padding: 20,
    },
    rating: {
      borderColor: theme.bgColors.primary,
      borderWidth: 2,
      width: 50,
      height: 50,
      borderRadius: 100,
      marginRight: 10,
      paddingTop: 14,
      textAlign: "center",
    },
    detailsView: {
      flex: 1,
    },
    content: {
      marginTop: 5,
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingBottom: 20,
      justifyContent: "space-evenly",
    },
    viewButton: {
      backgroundColor: theme.bgColors.primary,
      color: "white",
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    delButton: {
      backgroundColor: theme.colors.error,
      color: "white",
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteReview({ variables: { id } });
            refetch({ includeReviews: true });
          },
        },
      ]
    );
  };

  return (
    <View style={{ backgroundColor: theme.bgColors.listItem }}>
      <View style={styles.container}>
        <Text color="primary" fontWeight="bold" style={styles.rating}>
          {rating}
        </Text>
        <View style={styles.detailsView}>
          <Text fontWeight="bold">{ownList ? fullName : username}</Text>
          <Text color="secondary">
            {format(new Date(createdAt), "dd.mm.yyyy")}
          </Text>
          {text ? <Text style={styles.content}>{text}</Text> : null}
        </View>
      </View>
      {ownList && (
        <View style={styles.buttonContainer}>
          <Link to={`/repository/${repositoryId}`}>
            <Text style={styles.viewButton} fontWeight="bold">
              View repository
            </Text>
          </Link>
          <Pressable onPress={handleDelete}>
            <Text style={styles.delButton} fontWeight="bold">
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
