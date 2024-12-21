import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type UserDetails = {
  uid: string;
  fullName: string;
  countryCode: string,
  phoneNumber: string;
  dp?: BlobPart | string;
  about?: string
};

export type MainStackParams = {
  Login: undefined;
  UserDetails: UserDetails;
  Inbox: UserDetails;
  Contacts: undefined;
};

export type NavigationsProps<T extends keyof MainStackParams> = {
  navigation: StackNavigationProp<MainStackParams, T>;
  route: RouteProp<MainStackParams, T>;
};
