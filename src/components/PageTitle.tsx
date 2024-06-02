import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  children: ReactNode;
}

const PageTitle = ({ title, children }: PageTitleProps) => {
  return (
    <Box
      component="div"
      height={150}
      sx={{
        width: '100vw',
        bgcolor: 'primary.main',
        pr: 0,
        pl: 0,
        ml: '-50vw',
        left: '50%',
        position: 'relative',
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxWidth="lg"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          paddingLeft: '40px',
        }}
      >
        <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default PageTitle;
