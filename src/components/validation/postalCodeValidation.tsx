import * as yup from 'yup';

const schemaPostalCode = yup
  .string()
  .required('Postal code is required')
  .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, 'please select your country');

export default schemaPostalCode;
