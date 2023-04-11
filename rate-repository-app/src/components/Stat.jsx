import { View, Text, StyleSheet } from "react-native";
import theme from "./theme";
const Stat = ({ text, count }) => {
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
    <View>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Stat;
