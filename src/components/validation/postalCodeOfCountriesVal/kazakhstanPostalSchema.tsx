import * as yup from 'yup';

const schemaPostalCodeKazakhstan = yup
  .string()
  .required()
  .matches(/^\d{6}$/, 'invalid postal code for Kazakhstan 6 characters expected');

export default schemaPostalCodeKazakhstan;
