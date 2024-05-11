import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      `email address must contain an '@' symbol separating local part and domain name.`,
    ),
});
export default schema;
