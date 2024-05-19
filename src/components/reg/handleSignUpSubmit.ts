import { SubmitHandler } from 'react-hook-form';
import { RegistrationForm } from './types';

const handleSignUpSubmit: SubmitHandler<RegistrationForm> = async (data) => {
  console.log(data);
};
export default handleSignUpSubmit;
