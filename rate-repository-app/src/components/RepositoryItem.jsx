import { View, Image, StyleSheet } from "react-native";
import Stat from "./Stat";
import theme from "./theme";
import Text from "./Text";

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bgColors.listItem,
      padding: 20,
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
  });
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.image}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
        <View style={styles.infoView}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>

          <Text style={styles.description}>{item.description}</Text>

          <Text style={styles.tag}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.numbersView}>
        <Stat
          text="Stars"
          count={
            item.stargazersCount > 1000
              ? (item.stargazersCount / 1000).toFixed(2).slice(0, -1) + "k"
              : item.stargazersCount
          }
        />
        <Stat
          text="Forks"
          count={
            item.forksCount > 1000
              ? (item.forksCount / 1000).toFixed(2).slice(0, -1) + "k"
              : item.forksCount
          }
        />
        <Stat text="Reviews" count={item.reviewCount} />
        <Stat text="Rating" count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
