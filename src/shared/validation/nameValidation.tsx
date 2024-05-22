import * as yup from 'yup';

const schemaName = yup
  .string()
  .trim()
  .required('First name is required')
  .matches(/^[A-Za-z ]*$/, 'must contain at least one character and no special characters or numbers');

export default schemaName;
