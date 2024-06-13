export type ProductKey = {
  key: string;
};
export type AddressesFields = {
  id?: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
  country?: string;
};
export type FilterParams = {
  [key: string]: string | undefined;
};

export type TeamMemberCard = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  profile: string;
};
