import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const googleSignIn = async () => {
  GoogleSignin.configure({
    webClientId:
      "452365979819-996eihsg85066hpkpejs1l3lij6tkkte.apps.googleusercontent.com",
  });

  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error("No ID token found");
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredentials = await auth().signInWithCredential(googleCredential);
    return userCredentials;
  } catch (err) {
    console.error(err);
    throw Error("Google signin failed: ");
  }
};