import { Box, Typography, Link, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import MainLayout from '../../shared/ui/MainLayout';
import PageTitle from '../PageTitle';
import CatalogBreadcrumbs from '../CatalogBreadcrumbs';
import { TeamMemberCard } from '../../shared/types/type';
import { teamMembers, introduction, mainText, finalText } from './teamMembers';
import emptyImage from '../../shared/assets/images/empty-img.png';
import responsiveTheme from '../../shared/ui/theme';

const Photo = ({ image }: { image: string }) => {
  if (!image) return null;
  return (
    <Box sx={{ width: 200, height: 200 }}>
      <CardMedia
        component="img"
        image={image}
        alt={image ?? 'Image'}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = emptyImage;
        }}
        style={{
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
          margin: 'auto',
        }}
      />
    </Box>
  );
};

const TeamMemberCardComponent = ({ name, role, bio, photo, profile }: TeamMemberCard) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '12px',
        boxShadow: `0px 4px 8px ${responsiveTheme.palette.primary.main}`,
        padding: 3,
        mt: 2,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Photo image={photo} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">{name}</Typography>
          <Link href={profile} underline="hover">
            GitHub {/* profile.split('/').slice(3).join() */}
          </Link>
          <Typography variant="h6" component="h6" fontFamily="Orbitron">
            {role}
          </Typography>
        </Box>
      </Box>

      <Typography align="justify">{bio}</Typography>
    </Box>
  );
};

const TeamCards = () => {
  return (
    <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 2 }}>
      {teamMembers.map((member) => (
        <Grid item key={member.name} xs={1} sm={1} md={1}>
          <TeamMemberCardComponent
            name={member.name}
            role={member.role}
            bio={member.bio}
            photo={member.photo}
            profile={member.profile}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const AboutUs = () => {
  return (
    <MainLayout>
      <PageTitle>
        <Box>
          <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
            About Us
          </Typography>
          <CatalogBreadcrumbs />
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
    </MainLayout>
  );
};

export default AboutUs;
