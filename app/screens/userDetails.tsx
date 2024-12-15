import { RouteProp } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import ButtonComponent from "../components/authButton";
import TextInputComponent from "../components/textInput";
import { BUTTON } from "../constants/constants";
import { MainStackParams } from "../types/types";

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
});

export default function UserDetailsScreen({
  route,
}: Readonly<UserDetailsScreenProps>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: route.params,
  });

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
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputComponent
              label="Name"
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          name="fullName"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputComponent
              label="About"
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          name="about"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputComponent
              label="Phone"
              inputMode="numeric"
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          name="phoneNumber"
        />
      </View>

      <View>
        <ButtonComponent
          onPress={() => {}}
          buttonColor={BUTTON.google.color}
          style={{ width: "100%" }}
        >
          Continue
        </ButtonComponent>
      </View>
    </View>
  );
}
