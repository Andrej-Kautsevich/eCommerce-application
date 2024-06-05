import { Box, Button, Typography } from '@mui/material';
import { TextFieldElement, useForm } from 'react-hook-form-mui';
import { DatePickerElement } from 'react-hook-form-mui/date-pickers';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EditPersonalInfo } from '../Registration/types';
import schemaName from '../../shared/validation/nameValidation';
import schemaBirthDate from '../../shared/validation/validationBirthDate';
import schemaEmail from '../../shared/validation/emailValidation';

export default function EditInfo() {
  const schema = yup.object().shape({
    firstName: schemaName,
    lastName: schemaName.required('Last name is required'),
    dateOfBirth: schemaBirthDate,
    email: schemaEmail,
  });
  const { control } = useForm<EditPersonalInfo>({ mode: 'onChange', resolver: yupResolver(schema) });
  return (
    <Box sx={{ border: '2px solid #eaecf5', borderRadius: '10px', p: 3, mb: 3 }}>
      <Box component="form">
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          Change Personal Info
        </Typography>
        <TextFieldElement
          sx={{ mb: 1 }}
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          autoComplete="given-name"
          control={control}
        />
        <TextFieldElement
          sx={{ mb: 1 }}
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          control={control}
        />
        <DatePickerElement
          sx={{ mb: 1 }}
          inputProps={{ fullWidth: true, autoComplete: 'bday', id: 'date' }}
          required
          helperText="You must be at least 18 years old to visit site"
          name="dateOfBirth"
          control={control}
        />
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          Email
        </Typography>
        <TextFieldElement
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          control={control}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 3 }}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
