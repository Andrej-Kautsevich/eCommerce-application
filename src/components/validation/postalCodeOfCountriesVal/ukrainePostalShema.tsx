import * as yup from 'yup';

const schemaPostalCodeUkraine = yup
  .string()
  .required()
  .matches(/^\d{5}$/, 'invalid postal code for Ukraine');

export default schemaPostalCodeUkraine;
