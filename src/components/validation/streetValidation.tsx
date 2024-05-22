import * as yup from 'yup';

const schemaStreet = yup.string().trim().min(1, 'contain at least one character').required('Street is required');

export default schemaStreet;
