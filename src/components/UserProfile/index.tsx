import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCustomer } from '../../api/hooks';
import { AddressesFields } from '../../shared/types/type';

export default function UserProfile() {
  const [getUserName, setUserName] = useState('');
  const [getUserLastName, setUserLastName] = useState('');
  const [getUserBirth, setUserBirth] = useState('');
  const [getUserDefaultShip, setUserDefaultShip] = useState('');
  const [getUserInfo, setUserInfo] = useState([{}]);
  const { getCustomer } = useCustomer();

  useEffect(() => {
    const getUserData = async () => {
      const response = await getCustomer().then((res) => res);
      setUserInfo(response.addresses);
      setUserName(`${response.firstName}`);
      setUserBirth(`${response.dateOfBirth}`);
      setUserLastName(`${response.lastName}`);
      setUserDefaultShip(`${response.defaultShippingAddressId}`);
    };
    getUserData().catch((err: Error) => err);
  }, [getCustomer]);
  return (
    <Box sx={{ paddingTop: '50px' }}>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
        {getUserName} {getUserLastName}
      </Typography>
      <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
        Date of birth: {getUserBirth.split('-').reverse().join('-')}
      </Typography>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center', marginTop: '10px' }}>
        Addresses ({getUserInfo.length}):
      </Typography>
      <Box
        sx={{ fontFamily: 'Poppins', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '10px' }}
      >
        {getUserInfo.map((info: AddressesFields) => (
          <Box>
            <Typography variant="h6" component="div" sx={{ bgcolor: 'primary.main', color: 'white', pr: 3, pl: 3 }}>
              {getUserDefaultShip === info.id ? 'Default shipping:' : 'Default billing:'}
            </Typography>
            <Typography variant="h6" component="div">
              City: {info.city}
            </Typography>
            <Typography variant="h6" component="div">
              Country: {info.country}
            </Typography>
            <Typography variant="h6" component="div">
              Street: {info.streetName}
            </Typography>
            <Typography variant="h6" component="div">
              Postal Code: {info.postalCode}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
