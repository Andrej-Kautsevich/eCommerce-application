import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useCustomer } from '../../api/hooks';

export default function UserProfile() {
  const [getUserName, setUserName] = useState('');
  const [getUserBirth, setUserBirth] = useState('');
  const [getUserCity, setUserCity] = useState('');
  const [getUserCountry, setUserCountry] = useState('');
  const { getCustomer } = useCustomer();
  getCustomer()
    .then((data) => {
      setUserName(`${data.body.firstName} ${data.body.lastName}`);
      setUserBirth(`${data.body.dateOfBirth}`);
      setUserCity(data.body.addresses.map((el) => `${el.city}`).join(''));
      setUserCountry(data.body.addresses.map((el) => `${el.country}`).join(''));
    })
    .catch((err: Error) => err.message);
  return (
    <Box>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
        Welcome {getUserName}
      </Typography>
      <Typography variant="h6" component="div">
        Date of birth: {getUserBirth.split('-').reverse().join('-')}
      </Typography>
      <Box>
        <Typography variant="h6" component="div">
          Addresses:
        </Typography>
        <Typography variant="h6" component="div">
          City: {getUserCity}
        </Typography>
        <Typography variant="h6" component="div">
          Country: {getUserCountry}
        </Typography>
      </Box>
    </Box>
  );
}
