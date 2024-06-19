import { Grid } from '@mui/material';
import { teamMembers } from './teamMembers';
import TeamMemberCardComponent from './TeamMemberCardComponent';

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
export default TeamCards;
