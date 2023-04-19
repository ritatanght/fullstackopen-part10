import { Formik } from "formik";
import { View, StyleSheet, Pressable } from "react-native";
import { useMutation } from "@apollo/client";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import theme from "./theme";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  confirm: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must have a length of more than or equal to 1")
    .max(30, "Username must have a length of less than or equal to 30")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must have a length of more than or equal to 5")
    .max(50, "Password must have a length of less than or equal to 50")
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Password and confirmation must be the same")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    form: {
      backgroundColor: theme.bgColors.listItem,
      padding: 15,
    },
    button: {
      backgroundColor: theme.bgColors.primary,
      color: "white",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      textAlign: "center",
    },
  });
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        secureTextEntry={true}
        placeholder="Password"
      />
      <FormikTextInput
        name="confirm"
        secureTextEntry={true}
        placeholder="Password confirmation"
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
