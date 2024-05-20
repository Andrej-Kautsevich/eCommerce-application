import { StoreCountries } from '../../../shared/types/enum';

export type RegistrationForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  shippingAddress: Address;
  defaultAddress: boolean;
  billingAddress?: Address | null;
  email: string;
  password: string;
};

type Address = {
  country: StoreCountries;
  city: string;
  street: string;
  postalCode: string;
};
