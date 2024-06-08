import { useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../shared/store/hooks';
import getCategoriesBreadcrumb from '../../shared/utils/getCategoriesBreadcrumb';
import LinkRouter from '../../shared/ui/LinkRouter';
import parseCategories from '../../shared/utils/parseCategories';

const CatalogCategoriesSelect = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const breadcrumbNameMap = getCategoriesBreadcrumb(categories);
  const parsedCategories = parseCategories(categories);

  const location = useLocation();
  const currentPathname = location.pathname;
  const currentCategory = breadcrumbNameMap[currentPathname];

  const parsedCurrentCategory = parsedCategories.find((category) => category.name === currentCategory);

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" pt={1}>
      {parsedCurrentCategory &&
        parsedCurrentCategory.ancestors.map((category) => {
          const to = `${currentPathname}/${category.slug}`;
          return (
            <Chip
              label={category.name}
              component={LinkRouter}
              to={to}
              href="#basic-chip"
              variant="outlined"
              clickable
              key={category.name}
            />
          );
        })}
    </Stack>
  );
};

export default CatalogCategoriesSelect;
