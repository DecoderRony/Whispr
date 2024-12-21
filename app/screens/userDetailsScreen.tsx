import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import * as Yup from "yup";
import ButtonComponent from "../components/authButton";
import ErrorComponent from "../components/error";
import TextInputComponent from "../components/textInput";
import { BUTTON } from "../constants/constants";
import { createNewUser, getUser } from "../services/userService";
import { NavigationsProps, UserDetails } from "../types/types";
import FormInputComponent from "../components/formInput";
import useUserDetailsForm from "../hooks/useUserDetailsForm";

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
  formInputContainer: { display: "flex", alignItems: "center", gap: 20 },
  submitButton: { width: "100%" },
});

export default function UserDetailsScreen({
  navigation,
  route,
}: Readonly<NavigationsProps<"UserDetails">>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useUserDetailsForm(route.params);

  const onSubmit = async (updatedUser: UserDetails, oldUser: UserDetails) => {
    const user: UserDetails = {
      ...oldUser,
      ...updatedUser,
    }; // updated user only contains properties that are provided as form input like name, about, phone. it doesn't contain uid that is needed to create/update the user in db.
    if (await createNewUser(user)) {
      navigation.navigate("Inbox", user);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.formInputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Avatar.Image size={130} source={{ uri: value as string }} />
          )}
          name="dp"
        />

        <FormInputComponent
          controllerProps={{ name: "fullName" }}
          textComponentProps={{ label: "Name" }}
          fieldError={
            errors.fullName && (
              <ErrorComponent errorMessage={errors.fullName.message} />
            )
          }
        />

        <FormInputComponent
          controllerProps={{ name: "about" }}
          textComponentProps={{ label: "About" }}
        />

        <FormInputComponent
          controllerProps={{ name: "phoneNumber" }}
          textComponentProps={{
            label: "Phone",
            inputMode: "numeric",
            left: <TextInput.Affix text={"+91"} />,
          }}
          fieldError={
            errors.phoneNumber && (
              <ErrorComponent errorMessage={errors.phoneNumber.message} />
            )
          }
        />
      </View>

      <View>
        <ButtonComponent
          onPress={handleSubmit((data) =>
            onSubmit(data as UserDetails, route.params)
          )}
          buttonColor={BUTTON.google.color}
          style={styles.submitButton}
        >
          Continue
        </ButtonComponent>
      </View>
    </View>
  );
}
