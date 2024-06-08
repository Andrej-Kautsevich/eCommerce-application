import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
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
        mb: '10px',
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
        {children}
      </Box>
    </Box>
  );
};

export default PageTitle;
