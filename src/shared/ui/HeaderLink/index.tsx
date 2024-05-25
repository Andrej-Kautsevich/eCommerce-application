import { Link, styled } from '@mui/material';

const HeaderLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  position: 'relative',
  cursor: 'pointer',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-4px',
    width: '21px',
    height: '2px',
    maxWidth: '25%',
    background: theme.palette.primary.main,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.5s ease-out',
  },
  '&:hover:before, &.Mui-focusVisible:before': {
    transform: 'scaleX(1)',
  },
}));

export default HeaderLink;
