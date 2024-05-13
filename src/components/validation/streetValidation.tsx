import * as yup from 'yup';

const schemaStreet = yup.object().shape({
  street: yup.string().min(1, 'contain at least one character').required('this field is required'),
});
export default schemaStreet;
