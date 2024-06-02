import { useLocation } from 'react-router-dom';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useAppSelector } from '../../shared/store/hooks';
import parseCategories from '../../shared/utils/parseCategories';
import LinkRouter from './LinkRouter';
import { RoutePaths } from '../../shared/types/enum';

const CatalogBreadcrumbs = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const breadcrumbNameMap = parseCategories(categories);

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box component="div" height={150} sx={{ bgcolor: 'primary.main', pr: 3, pl: 3 }} display="flex" alignItems="center">
      <Breadcrumbs aria-label="breadcrumbs">
        <LinkRouter underline="hover" color="inherit" to={RoutePaths.MAIN}>
          <Typography variant="body1" color="secondary">
            Main
          </Typography>
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography variant="h6" color="secondary" key={to}>
              {value.toLocaleUpperCase()}
            </Typography>
          ) : (
            <LinkRouter underline="hover" to={to} key={to}>
              <Typography variant="body1" color="secondary">
                {breadcrumbNameMap[to]}
              </Typography>
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default CatalogBreadcrumbs;
