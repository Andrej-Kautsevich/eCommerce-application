import * as yup from 'yup';

const schemaBirthDate = yup
  .date()
  .nullable()
  .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
  .required('Birth date is required')
  .typeError('Invalid Date');
export default schemaBirthDate;
