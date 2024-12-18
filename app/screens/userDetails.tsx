import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import * as Yup from "yup";
import ButtonComponent from "../components/authButton";
import TextComponent from "../components/text";
import TextInputComponent from "../components/textInput";
import { BUTTON } from "../constants/constants";
import { createNewUser, getUser } from "../services/userService";
import { MainStackParams, UserDetails } from "../types/types";

type UserDetailsScreenProps = {
  route: RouteProp<MainStackParams, "UserDetails">;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
  },
  errorText: {
    color: "red", // Error text in red for visibility.
    fontSize: 12, // Smaller font size to differentiate it from input text.
    marginBottom: 8, // Spacing between the error text and next element.
    marginTop: -5, // Slight overlap with input to keep error text closer to the field.
    fontWeight: "500", // Semi-bold to make it noticeable.
  },
});

const onSubmit = async (updatedUser: UserDetails, oldUser: UserDetails) => {
  const user: UserDetails = {
    ...oldUser,
    ...updatedUser,
  }; // updated user only contains properties that are provided as form input like name, about, phone. it doesn't contain uid that is needed to create/update the user in db.
  await createNewUser(user);
};

// form input schema
// used to validate the inputs provided
const userDetailsInputValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  dp: Yup.mixed(),
  about: Yup.string(),
});

export default function UserDetailsScreen({
  route,
}: Readonly<UserDetailsScreenProps>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userDetailsInputValidationSchema),
    defaultValues: route.params,
  });

  useEffect(() => {
    let isMounted = true;

    getUser(route.params.uid).then((user) => {
      if (isMounted && user) {
        reset(user);
      }
    });

    // clean up mechanism to handle case such that if this screen is unmounted before getUser resolves then we dont want to update the value
    return () => {
      isMounted = false;
    };
  }, [route.params.uid]);

  return (
    <View style={styles.rootContainer}>
      <View style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Avatar.Image size={130} source={{ uri: value as string }} />
          )}
          name="dp"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInputComponent
                label="Name"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
              />

              {errors.fullName && (
                <TextComponent variant="displaySmall" styles={styles.errorText}>
                  {errors.fullName.message}
                </TextComponent>
              )}
            </>
          )}
          name="fullName"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputComponent
              label="About"
              value={value ?? ""}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="about"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInputComponent
                label="Phone"
                inputMode="numeric"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                left={<TextInput.Affix text={"+91"} />}
              />

              {errors.phoneNumber && (
                <TextComponent variant="displaySmall" styles={styles.errorText}>
                  {errors.phoneNumber.message}
                </TextComponent>
              )}
            </>
          )}
          name="phoneNumber"
        />
      </View>

      <View>
        <ButtonComponent
          onPress={handleSubmit((data) =>
            onSubmit(data as UserDetails, route.params)
          )}
          buttonColor={BUTTON.google.color}
          style={{ width: "100%" }}
        >
          Continue
        </ButtonComponent>
      </View>
    </View>
  );
}
