import { Box, Link, Typography } from '@mui/material';
import responsiveTheme from '../../shared/ui/theme';
import { TeamMemberCard } from '../../shared/types/type';
import Photo from './Photo';

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
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Photo image={photo} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" fontFamily="Orbitron">
            {name}
          </Typography>
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

export default TeamMemberCardComponent;
