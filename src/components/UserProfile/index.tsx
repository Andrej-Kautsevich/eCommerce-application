import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomer } from '../../api/hooks';
import { AddressesFields } from '../../shared/types/type';
import EditInfo from './editPersonInfoForm';
import ChangePassword from './changeProfile';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setCustomer } from '../../shared/store/auth/customerSlice';

export default function UserProfile() {
  const { t } = useTranslation();
  const [getUserName, setUserName] = useState('');
  const [getUserLastName, setUserLastName] = useState('');
  const [getUserBirth, setUserBirth] = useState('');
  const [getUserDefaultShip, setUserDefaultShip] = useState('');
  const [userAddresses, setUserAddresses] = useState([{}]);
  const [userEmail, setUserEmail] = useState('');
  const [showEditMode, setShowEditMode] = useState(false);
  const { getCustomer } = useCustomer();

  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customer);

  useEffect(() => {
    const getUserData = async () => {
      if (!customer) {
        const response = await getCustomer();
        dispatch(setCustomer(response));
      } else {
        setUserAddresses(customer.addresses);
        setUserName(`${customer.firstName}`);
        setUserBirth(`${customer.dateOfBirth}`);
        setUserLastName(`${customer.lastName}`);
        setUserDefaultShip(`${customer.defaultShippingAddressId}`);
        setUserEmail(`${customer.email}`);
      }
    };
    getUserData().catch((err: Error) => err);
  }, [getCustomer, dispatch, customer]);

  const handleSuccess = () => {
    setShowEditMode(false);
  };

  return (
    <Box sx={{ paddingTop: '50px' }}>
      <Typography variant="h3" component="div" color="text.primary" sx={{ textAlign: 'center' }}>
        {t('Hey')}, {getUserName} {getUserLastName}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ textAlign: 'center', fontSize: '14px', fontWeight: '300', color: 'text.secondary', margin: '21px 0' }}
      >
        {t('Welcome to your profile, your one-stop-shop for all your recent Volcano Watch account activity.')}
      </Typography>
      {!showEditMode && (
        <Box sx={{ border: '2px solid #eaecf5', borderRadius: '10px', p: 3, mb: 3 }}>
          <Typography variant="h6" component="div" sx={{ color: 'text.secondary' }}>
            {t('My info')}
          </Typography>
          <Typography variant="h6" component="div" color="text.primary">
            {t('Name')}: {getUserName} {getUserLastName}
          </Typography>
          <Typography variant="h6" component="div" color="text.primary">
            {t('Date of birth')}: {getUserBirth.split('-').reverse().join('-')}
          </Typography>
          <Typography variant="h6" component="div" color="text.primary">
            {t('Email')}: {userEmail}
          </Typography>
          <Button variant="contained" sx={{ mt: 1 }} onClick={() => setShowEditMode(true)}>
            {t('Manage Info')}
          </Button>
        </Box>
      )}
      {showEditMode && <EditInfo onSuccess={handleSuccess} />}
      {customer && (
        <Box sx={{ border: '2px solid #eaecf5', borderRadius: '10px', p: 3, mt: 6 }}>
          <ChangePassword customer={customer} />
        </Box>
      )}
      <Typography variant="h5" component="div" color="text.primary" sx={{ marginTop: '50px' }}>
        {t('Addresses')} ({userAddresses.length}):
      </Typography>
      <Box
        sx={{
          fontFamily: 'Poppins',
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {userAddresses.map((info: AddressesFields) => (
          <Box sx={{ border: '2px solid #eaecf5', borderRadius: '10px', p: 3 }}>
            <Typography variant="h6" component="div" sx={{ color: 'text.secondary' }}>
              {getUserDefaultShip === info.id ? t('Default shipping:') : t('Default billing:')}
            </Typography>
            <Typography variant="h6" component="div" color="text.primary">
              {t('City')}: {info.city}
            </Typography>
            <Typography variant="h6" component="div" color="text.primary">
              {t('Country')}: {info.country}
            </Typography>
            <Typography variant="h6" component="div" color="text.primary">
              {t('Street')}: {info.streetName}
            </Typography>
            <Typography variant="h6" component="div" color="text.primary">
              {t('Postal')}: {info.postalCode}
            </Typography>
            <Button variant="contained" sx={{ mt: 1 }}>
              {t('Manage Info')}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
