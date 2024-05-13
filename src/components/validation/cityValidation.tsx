import * as yup from 'yup';

const schemaCity = yup
  .string()
  .min(1, 'contain at least one character and no special characters or numbers')
  .required('this field is required')
  .matches(/^[A-Za-z ]*$/, 'contain at least one character and no special characters or numbers');

export default schemaCity;
