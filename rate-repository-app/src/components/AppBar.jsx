import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.pressable}>Repositories</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.pressable}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
