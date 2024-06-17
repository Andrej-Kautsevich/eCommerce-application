import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../shared/store/hooks';
import getCategoriesBreadcrumb from '../../shared/utils/getCategoriesBreadcrumb';
import LinkRouter from '../../shared/ui/LinkRouter';
import { RoutePaths } from '../../shared/types/enum';

const CatalogBreadcrumbs = () => {
  const { t } = useTranslation();
  const categories = useAppSelector((state) => state.products.categories);
  const breadcrumbNameMap = getCategoriesBreadcrumb(categories);

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs sx={{ pt: 1 }} aria-label="breadcrumbs">
      <LinkRouter underline="hover" color="inherit" to={RoutePaths.MAIN}>
        <Typography variant="body1" color="secondary">
          {t('Main')}
        </Typography>
      </LinkRouter>
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography variant="body1" color="secondary" key={to}>
            {breadcrumbNameMap[to]}{' '}
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
  );
};

export default CatalogBreadcrumbs;
