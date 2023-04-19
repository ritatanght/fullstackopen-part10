import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { Link, Navigate } from "react-router-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/client";
import { useAuthStorage } from "../hooks/useAuthStorage";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useNavigate } from "react-router-native";
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
  const user = useQuery(GET_CURRENT_USER);
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.pressable}>Repositories</Text>
        </Link>
        {user.data?.me ? (
          <>
            <Link to="/create">
              <Text style={styles.pressable}>Create a review</Text>
            </Link>
            <Link to="/my-reviews">
              <Text style={styles.pressable}>My reviews</Text>
            </Link>
            <Pressable onPress={signOut}>
              <Text style={styles.pressable}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Text style={styles.pressable}>Sign in</Text>
            </Link>
            <Link to="/sign-up">
              <Text style={styles.pressable}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
