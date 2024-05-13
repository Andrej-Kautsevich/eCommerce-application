import * as yup from 'yup';

const schemaPostalCode = yup
  .string()
  .required()
  .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, 'invalid postal code');

export default schemaPostalCode;
