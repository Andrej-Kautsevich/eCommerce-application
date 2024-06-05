import { Grid, Typography } from '@mui/material';
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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextFieldElement
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          autoComplete="given-name"
          control={control}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldElement
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <DatePickerElement
          inputProps={{ fullWidth: true, autoComplete: 'bday', id: 'date' }}
          required
          helperText="You must be at least 18 years old to visit site"
          name="dateOfBirth"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
}
