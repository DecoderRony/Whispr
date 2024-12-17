import firestore from "@react-native-firebase/firestore";
import { UserDetails } from "../types/types";

export const createNewUser = async ({
  uid,
  ...userDetails
}: Omit<UserDetails, "countryCode">) => {
  try {
    console.log(userDetails)
    const userCollection = firestore().collection("Users");
    await userCollection.doc(uid).set(userDetails);
    console.log("User created with ID: ", uid);
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};
