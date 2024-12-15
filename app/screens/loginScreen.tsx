import { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import ButtonComponent from "../components/authButton";
import TextComponent from "../components/text";
import { BUTTON } from "../constants/constants";
import { googleSignIn } from "../services/authService";
import { MainStackParams, UserDetails } from "../types/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  loginView: {
    flexGrow: 1,
    justifyContent: "center",
  },

  viewContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "50%",
    height: "50%",
    objectFit: "contain",
  },

  keyboardContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15",
  },

  buttonContainer: {
    width: "100%",
    paddingLeft: 40,
    paddingRight: 40,
    display: "flex",
    gap: 10,
  },
});

export default function LoginScreen({
  navigation,
}: Readonly<{
  navigation: StackNavigationProp<MainStackParams, "Login">;
}>) {
  // method to authenticate user based on the selected auth provider
  const authenticate = async (authProvider: "google" | "fb") => {
    if (authProvider === "google") {
      const credentials = await googleSignIn();
      const userObj = credentials.user;

      const userDetails: UserDetails = {
        fullName: userObj.displayName,
        countryCode: null,
        phoneNumber: userObj.phoneNumber,
        dp: userObj.photoURL ?? "",
      };

      navigation.navigate("UserDetails", userDetails);
    } else if (authProvider === "fb") {
      //TODO: add implementation to sign in with facebook
    }
  };

  return (
    <View style={styles.loginView}>
      <View style={styles.viewContainer}>
        <Image
          source={require("../assets/images/live-chat.png")}
          style={styles.logo}
        />
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer}>
        <TextComponent variant="titleMedium">Start Whispr'ing</TextComponent>

        <View style={styles.buttonContainer}>
          <ButtonComponent
            onPress={() => authenticate("google")}
            icon={BUTTON.google.icon}
            buttonColor={BUTTON.google.color}
          >
            Continue with Google
          </ButtonComponent>

          <ButtonComponent
            onPress={() => authenticate("fb")}
            icon={BUTTON.facebook.icon}
            buttonColor={BUTTON.facebook.color}
          >
            Continue with facebook
          </ButtonComponent>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
