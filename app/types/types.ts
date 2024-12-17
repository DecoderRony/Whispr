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
};
