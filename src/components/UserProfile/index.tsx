import { Alert, AlertTitle, Box, Button, Slide, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCustomer } from '../../api/hooks';
import { AddressesFields } from '../../shared/types/type';
import EditInfo from './editPersonInfoForm';
import ChangePassword from './changeProfile';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setCustomer } from '../../shared/store/auth/customerSlice';

export default function UserProfile() {
  const [getUserName, setUserName] = useState('');
  const [getUserLastName, setUserLastName] = useState('');
  const [getUserBirth, setUserBirth] = useState('');
  const [getUserDefaultShip, setUserDefaultShip] = useState('');
  const [userAddresses, setUserAddresses] = useState([{}]);
  const [userEmail, setUserEmail] = useState('');
  const [showEditMode, setShowEditMode] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(true);
  };

  return (
    <Box sx={{ paddingTop: '50px' }}>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
        Hey, {getUserName} {getUserLastName}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ textAlign: 'center', fontSize: '14px', fontWeight: '300', color: '#939393', margin: '21px 0' }}
      >
        Welcome to your profile, your one-stop-shop for all your recent Volcano Watch account activity.
      </Typography>
      {!showEditMode && (
        <Box sx={{ border: '2px solid #eaecf5', borderRadius: '10px', p: 3, mb: 3 }}>
          <Typography variant="h6" component="div" sx={{ color: '#939393' }}>
            My info
          </Typography>
          <Typography variant="h6" component="div">
            Name: {getUserName} {getUserLastName}
          </Typography>
          <Typography variant="h6" component="div">
            Date of birth: {getUserBirth.split('-').reverse().join('-')}
          </Typography>
          <Typography variant="h6" component="div">
            Email: {userEmail}
          </Typography>
          <Button variant="contained" onClick={() => setShowEditMode(true)}>
            Manage Info
          </Button>
        </Box>
      )}
      {showEditMode && <EditInfo onSuccess={handleSuccess} />}
      {customer && (
        <Box sx={{ border: '2px solid #eaecf5', borderRadius: '10px', p: 3, mt: 6 }}>
          <ChangePassword customer={customer} />
        </Box>
      )}
      <Typography variant="h5" component="div" sx={{ marginTop: '50px' }}>
        Addresses ({userAddresses.length}):
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
            <Typography variant="h6" component="div" sx={{ color: '#939393' }}>
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
            <Button variant="contained">Manage Info</Button>
          </Box>
        ))}
      </Box>
      {success && (
        <Slide in={success} direction="right">
          <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
            <Alert sx={{ width: '100%' }} severity="success" onClose={() => setSuccess(false)}>
              <AlertTitle>Success!</AlertTitle>
              Your info was successfully updated
            </Alert>
          </Snackbar>
        </Slide>
      )}
    </Box>
  );
}
