import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import useProduct, { FetchQueryArgs } from '../../api/hooks/useProduct';
import { useAppSelector } from '../store/hooks';
import { FilterCategories } from '../types/enum';
import parseFilterParams from '../utils/parseFilterParams';

const useFetchCatalogProducts = () => {
  const { categorySlug } = useParams();
  const { getProducts } = useProduct();
  const { categories } = useAppSelector((state) => state.products);
  const location = useLocation();
  const { filterParams, sortParam } = useAppSelector((state) => state.products);

  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryArgs: FetchQueryArgs = {};
      let filter = '';

      if (categorySlug) {
        const currentCategory = categories.find((category) => category.slug.en === categorySlug);
        const currentCategoryFilter = `${FilterCategories.CATEGORIES}: subtree("${currentCategory?.id}")`;
        filter += currentCategoryFilter;
      } else {
        const currentCategorySlug = location.pathname.split('/').join('');
        const currentCategory = categories.find((category) => category.slug.en === currentCategorySlug);
        if (currentCategory) {
          const currentCategoryFilter = `${FilterCategories.CATEGORIES}: subtree("${currentCategory.id}")`;
          filter += currentCategoryFilter;
        }
      }

      if (filterParams) {
        const parsedFilterParams = parseFilterParams(filterParams);
        filter += parsedFilterParams;
      }
      queryArgs.filter = filter;

      if (sortParam) queryArgs.sort = sortParam;

      const result = await getProducts(queryArgs).then((res) => res.body.results);
      setProducts([...result]);
    };
    // eslint-disable-next-line no-console
    fetchProducts().catch((error) => console.error(error));
  }, [getProducts, filterParams, sortParam, categorySlug, categories, location.pathname]);

  return products;
};

export default useFetchCatalogProducts;
