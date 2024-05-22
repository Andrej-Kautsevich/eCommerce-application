import { StoreCountries } from '../../../shared/types/enum';

export type RegistrationForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  shippingAddress: Address;
  defaultShippingAddress: boolean;
  billingAddress?: Address | null;
  defaultBillingAddress?: boolean;
  email: string;
  password: string;
};

type Address = {
  country: StoreCountries;
  city: string;
  streetName: string;
  postalCode: string;
};
