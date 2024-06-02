import { Box, Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
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
      <div
        style={{
          maxWidth: '1185px',
          width: '100%',
          display: 'flex',
          justifyContent: 'start',
          paddingLeft: '40px',
        }}
      >
        <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
          {title}
        </Typography>
      </div>
    </Box>
  );
};

export default PageTitle;
