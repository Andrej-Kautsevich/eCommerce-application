import { Box, Typography } from '@mui/material';
import PageTitle from '../PageTitle';
import { introduction, mainText, finalText } from './teamMembers';
import TeamCards from './TeamCards';

const AboutUs = () => {
  return (
    <>
      <PageTitle>
        <Box>
          <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
            About Us
          </Typography>
        </Box>
      </PageTitle>
      <Typography variant="body1" component="p" align="justify" sx={{ mb: 2, mt: 3 }}>
        {introduction}
      </Typography>
      <TeamCards />
      <Typography variant="body1" component="p" align="justify" sx={{ mb: 3, mt: 5 }}>
        {mainText}
      </Typography>
      <Typography variant="body1" component="p" align="justify" sx={{ mb: 5, mt: 2 }}>
        {finalText}
      </Typography>
    </>
  );
};

export default AboutUs;
