import * as yup from 'yup';

const schemaName = yup.object().shape({
  FirstName: yup
    .string()
    .required()
    .matches(/^[A-Za-z ]*$/, 'must contain at least one character and no special characters or numbers'),
});
export default schemaName;
