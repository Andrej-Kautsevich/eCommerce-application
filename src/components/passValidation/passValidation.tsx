import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      `Email address must contain an '@' symbol separating local part and domain name.`,
    ),
  password: yup
    .string()
    .required()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{5,})$/,
      'Password must not contain leading or trailing whitespace',
    ),
});
export default schema;
