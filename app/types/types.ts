export type UserDetails = {
  fullName: string | null;
  countryCode: string | null,
  phoneNumber: string | null;
  dp?: BlobPart | string;
  about?: string
};

export type MainStackParams = {
  Login: undefined;
  UserDetails: UserDetails;
};
