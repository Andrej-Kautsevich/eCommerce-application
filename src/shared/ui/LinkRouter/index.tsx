/* eslint-disable react/jsx-props-no-spreading */
import { Link, LinkProps } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

interface LinkRouterProps extends LinkProps {
  to: string;
  // replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink} />;
}

export default LinkRouter;
