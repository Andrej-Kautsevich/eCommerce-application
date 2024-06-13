import { Box, Typography, Link, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import MainLayout from '../../shared/ui/MainLayout';
import PageTitle from '../PageTitle';
import CatalogBreadcrumbs from '../CatalogBreadcrumbs';
import { TeamMemberCard } from '../../shared/types/type';
import teamMembers from './teamMembers';
import emptyImage from '../../shared/assets/images/empty-img.png';

const Photo = ({ image }: { image: string }) => {
  if (!image) return null;
  return (
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
  );
};

const TeamMemberCardComponent = ({ name, role, bio, photo, profile }: TeamMemberCard) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Photo image={photo} />
        <Typography variant="h5">{name}</Typography>
        <Link href={profile} underline="hover">
          {profile.split('/').slice(3).join()}
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1">{role}</Typography>
        <Typography>{bio}</Typography>
      </Box>
    </Box>
  );
};

const TeamCards = () => {
  return (
    <Grid container spacing={2}>
      {teamMembers.map((member) => (
        <Grid item key={member.name}>
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
      <TeamCards />
    </MainLayout>
  );
};

export default AboutUs;
