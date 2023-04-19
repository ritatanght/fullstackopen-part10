import { View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";
import Stat from "./Stat";
import Text from "../Text";
import theme from "../theme";

const RepositoryItem = ({ repository, loading, repoId }) => {
  const navigate = useNavigate();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bgColors.listItem,
      padding: 20,
      marginBottom: 10,
    },
    topContainer: { display: "flex", flexDirection: "row" },
    infoView: {
      display: "flex",
      flex: 1,
    },
    fullName: {
      fontWeight: theme.fontWeights.bold,
    },
    description: {
      color: theme.colors.desc,
      paddingTop: 5,
      paddingBottom: 5,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 20,
    },
    tag: {
      backgroundColor: theme.bgColors.primary,
      color: "white",
      padding: 5,
      borderRadius: 5,
      alignSelf: "flex-start",
    },
    numbersView: {
      backgroundColor: theme.bgColors.listItem,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      paddingTop: 20,
    },
    buttonText: {
      backgroundColor: theme.bgColors.primary,
      color: "white",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      textAlign: "center",
    },
  });

  if (!repository && loading) {
    return <Text style={{ textAlign: "center" }}>Loading...</Text>;
  }

  const {
    id,
    fullName,
    description,
    language,
    ownerAvatarUrl,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
  } = repository;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <Pressable onPress={() => !repoId && navigate(`/repository/${id}`)}>
        <View style={styles.topContainer}>
          <Image
            testID="avatar"
            style={styles.image}
            source={{ uri: ownerAvatarUrl }}
          ></Image>
          <View style={styles.infoView}>
            <Text fontSize="subheading" fontWeight="bold" testID="fullName">
              {fullName}
            </Text>
            <Text style={styles.description} testID="description">
              {description}
            </Text>
            <Text style={styles.tag} testID="language">
              {language}
            </Text>
          </View>
        </View>
        <View style={styles.numbersView}>
          <Stat
            text="Stars"
            testID="starsCount"
            count={
              stargazersCount > 1000
                ? (stargazersCount / 1000).toFixed(2).slice(0, -1) + "k"
                : stargazersCount
            }
          />
          <Stat
            text="Forks"
            testID="forksCount"
            count={
              forksCount > 1000
                ? (forksCount / 1000).toFixed(2).slice(0, -1) + "k"
                : forksCount
            }
          />
          <Stat text="Reviews" testID="reviewCount" count={reviewCount} />
          <Stat text="Rating" testID="rating" count={ratingAverage} />
        </View>
        {repoId && (
          <Pressable onPress={() => Linking.openURL(repository.url)}>
            <Text fontWeight="bold" style={styles.buttonText}>
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
