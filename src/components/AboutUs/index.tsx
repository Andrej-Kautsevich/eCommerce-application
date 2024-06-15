import { Box, Grid, Link, Typography } from '@mui/material';
import PageTitle from '../PageTitle';
import { introduction, mainText, finalText } from './teamMembers';
import TeamCards from './TeamCards';
import SchoolLogo from '../../shared/assets/icons/RSSchoolLogo.svg';
import { Links } from '../../shared/types/enum';

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
      <Grid container spacing={4} sx={{ mt: 1 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        <Grid item xs={1} sm={3} md={3}>
          <Link href={Links.RSSCHOOL}>
            <img src={SchoolLogo} alt="School Logo" />
          </Link>
        </Grid>

        <Grid item xs={1} sm={5} md={9}>
          <Typography variant="body1" component="p" align="justify" sx={{ mb: 2 }}>
            {introduction}
          </Typography>
        </Grid>
      </Grid>

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
