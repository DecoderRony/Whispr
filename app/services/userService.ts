import firestore from "@react-native-firebase/firestore";
import { UserDetails } from "../types/types";

/**
 * method to create/update a user in firestore.
 * accepts a user object with uid and other user details and creates a document using the uid
 * @param param0 
 */
export const createNewUser = async ({ uid, ...userDetails }: UserDetails) => {
  try {
    const userCollection = firestore().collection("Users");
    await userCollection.doc(uid).set(userDetails);
    console.log("User created with ID: ", uid);
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};

/**
 * method used to fetch user details for the provided uid
 * @param uid 
 * @returns Promise<DocumentData | undefined>
 */
export const getUser = async (uid: UserDetails["uid"]) => {
  try {
    const userCollection = firestore().collection("Users");
    const user = await userCollection.doc(uid).get();
    return user.data();
  } catch (error) {
    console.error("Error getting user: ", error);
  }
};
