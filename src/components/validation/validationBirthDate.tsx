import * as yup from 'yup';

const schemaBirthDate = yup
  .date()
  .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
  .required('this field is required');
export default schemaBirthDate;
