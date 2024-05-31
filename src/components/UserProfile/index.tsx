import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useCustomer } from '../../api/hooks';

export default function UserProfile() {
  const [getUserName, setUserName] = useState('');
  const { getCustomer } = useCustomer();
  getCustomer()
    .then((data) => setUserName(`${data.body.firstName} ${data.body.lastName}`))
    .catch((err: Error) => err.message);
  return (
    <Box>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
        Welcome {getUserName}
      </Typography>
      <Typography variant="h6" component="div">
        Address:
      </Typography>
    </Box>
  );
}
