import { Platform, Text as NativeText, StyleSheet } from "react-native";

import theme from "./theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: Platform.select({
      android: theme.fonts.andriod,
      ios: theme.fonts.ios,
      default: theme.fonts.main,
    }),
    fontWeight: theme.fontWeights.normal,
  },
  colorPrimary: {
    color: theme.bgColors.primary,
  },
  colorSecondary:{
    color: theme.colors.desc
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },

});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorSecondary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
