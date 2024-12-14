import { useRef, useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import AuthButton from "../components/authButton";
import TextComponent from "../components/text";
import { AUTH_BUTTON } from "../constants/constants";
import { googleSignIn } from "../services/authService";
import { UserDetails } from "../types/types";

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

export default function LoginView() {
  const [userDetails, setUserDetails] = useState<UserDetails>(); //state to hold user details

  // method to authenticate user based on the selected auth provider
  const authenticate = async (authProvider: "google" | "fb") => {
    if (authProvider === "google") {
      const credentials = await googleSignIn();
      const userObj = credentials.user;

      const userDetails: UserDetails = {
        fullName: userObj.displayName,
        phoneNumber: userObj.phoneNumber,
      };

      setUserDetails(userDetails);
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
          <AuthButton
            onPress={() => authenticate("google")}
            icon={AUTH_BUTTON.google.icon}
            buttonColor={AUTH_BUTTON.google.color}
          >
            Continue with Google
          </AuthButton>

          <AuthButton
            onPress={() => authenticate("fb")}
            icon={AUTH_BUTTON.facebook.icon}
            buttonColor={AUTH_BUTTON.facebook.color}
          >
            Continue with facebook
          </AuthButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
