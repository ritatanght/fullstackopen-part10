import { StyleSheet } from "react-native";
import { useField } from "formik";
import Text from "./Text";
import { TextInput } from "react-native";

import theme from "./theme";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
  input: {
    borderColor: theme.colors.desc,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    color: theme.colors.desc,
    padding: 10,
    marginTop: 10,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const inputStyles = [styles.input, meta.error && styles.errorInput];
  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={inputStyles}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
