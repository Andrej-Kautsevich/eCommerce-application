import * as yup from 'yup';

const schemaPostalCodeBelarus = yup
  .string()
  .required()
  .matches(/^\d{6}$/, 'invalid postal code for Belarus');

export default schemaPostalCodeBelarus;
