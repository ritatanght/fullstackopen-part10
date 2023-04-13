import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/client";
import { useAuthStorage } from "../hooks/useAuthStorage";
import { ME } from "../graphql/queries";
import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.bgColors.appBar,
  },
  pressable: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
    padding: 15,
  },
});

const AppBar = () => {
  const user = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.pressable}>Repositories</Text>
        </Link>
        {user.data?.me ? (
          <Pressable onPress={signOut}>
            <Text style={styles.pressable}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/sign-in">
            <Text style={styles.pressable}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
