/* eslint-disable react/jsx-props-no-spreading */
import { Link, LinkProps } from '@mui/material';
import { forwardRef } from 'react';

import { Link as RouterLink } from 'react-router-dom';

interface LinkRouterProps extends LinkProps {
  to: string;
  // replace?: boolean;
}

const LinkRouter = forwardRef<HTMLAnchorElement, LinkRouterProps>((props, ref) => (
  <Link ref={ref} {...props} component={RouterLink} />
));
export default LinkRouter;
