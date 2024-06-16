import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import PageTitle from '../PageTitle';
import { introduction, mainText, finalText } from './teamMembers';
import TeamCards from './TeamCards';
import SchoolLogo from '../../shared/assets/icons/RSSchoolLogo.svg';
import { Links, RoutePaths } from '../../shared/types/enum';
import LinkRouter from '../../shared/ui/LinkRouter';

const AboutUs = () => {
  return (
    <>
      <PageTitle title="About Us">
        <Breadcrumbs sx={{ pt: 1 }} aria-label="breadcrumbs">
          <LinkRouter underline="none" color="inherit" to={RoutePaths.MAIN}>
            <Typography variant="body1" color="primary.contrastText">
              Main
            </Typography>
          </LinkRouter>
          <Typography variant="body1" color="primary.contrastText">
            About Us
          </Typography>
        </Breadcrumbs>
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
