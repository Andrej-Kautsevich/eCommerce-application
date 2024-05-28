import { Box, Typography } from '@mui/material';

export default function UserProfile() {
  return (
    <Box>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
        Welcome Andrii Candy
      </Typography>
      <Typography variant="h6" component="div">
        Address:
      </Typography>
    </Box>
  );
}
