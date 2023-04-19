import { Formik } from "formik";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import theme from "./theme";
import { CREATE_REVIEW } from "../graphql/mutations";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be greater or equal to 0")
    .max(100, "Rating must be less than or equal to 100")
    .required("Rating is required"),
  text: yup.string(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const ReviewForm = ({ onSubmit }) => {
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
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput multiline={true} name="text" placeholder="Review" />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [create] = useMutation(CREATE_REVIEW, {
    onError: (e) => window.alert(e),
  });
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const review = await create({
        variables: {
          review: { ownerName, repositoryName, rating: Number(rating), text },
        },
      });
      navigate(`/repository/${review.data.createReview.repositoryId}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
