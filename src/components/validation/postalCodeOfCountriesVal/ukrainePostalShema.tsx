import * as yup from 'yup';

const schemaPostalCodeUkraine = yup
  .string()
  .required()
  .matches(/^\d{5}$/, 'invalid postal code for Ukraine 5 characters expected');

export default schemaPostalCodeUkraine;
