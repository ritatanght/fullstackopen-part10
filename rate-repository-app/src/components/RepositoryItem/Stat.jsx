import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";
const Stat = ({ text, count, testID }) => {
  const styles = StyleSheet.create({
    count: {
      fontWeight: theme.fontWeights.bold,
      textAlign: "center",
    },
    text: {
      color: theme.colors.desc,
      textAlign: "center",
    },
  });
  return (
    <View testID={testID}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Stat;
