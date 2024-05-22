import * as yup from 'yup';

const schemaCity = yup
  .string()
  .trim()
  .min(1, 'contain at least one character and no special characters or numbers')
  .required('City is required')
  .matches(/^[A-Za-z ]*$/, 'contain at least one character and no special characters or numbers');

export default schemaCity;
