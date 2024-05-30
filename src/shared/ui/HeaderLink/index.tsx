import { Link, LinkProps as MaterialLinkProps, styled } from '@mui/material';
import { LinkProps as RouterLinkProps } from 'react-router-dom';

type HeaderLinkProps = MaterialLinkProps &
  RouterLinkProps & {
    page?: 'active';
  };

const HeaderLink = styled(Link, {
  name: 'HeaderLink',
  slot: 'Root',
})<HeaderLinkProps>(({ theme, page }) => ({
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
    ...(page === 'active' && { transform: 'scaleX(1)' }),
  },
  '&:hover:before, &.Mui-focusVisible:before': {
    transform: 'scaleX(1)',
  },
  ...(page === 'active' && {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    cursor: 'auto',
  }),
}));

export default HeaderLink;
