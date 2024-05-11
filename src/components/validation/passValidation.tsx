import * as yup from 'yup';

const schemaPass = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'password must be 8 characters long')
    .matches(/[0-9]/, 'password requires a number')
    .matches(/[a-z]/, 'password requires a lowercase letter')
    .matches(/[A-Z]/, 'password requires an uppercase letter')
    .matches(/[0-9]/, 'password requires a number')
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{5,})$/,
      'password must not contain leading or trailing whitespace',
    ),
});
export default schemaPass;
