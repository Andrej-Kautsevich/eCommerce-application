import { Category } from '@commercetools/platform-sdk';

const getCategoriesBreadcrumb = (data: Category[]) => {
  const categoryMap = data.reduce((acc: { [key: string]: Category }, item: Category) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const breadcrumbNameMap = data.reduce((acc: { [key: string]: string }, item: Category) => {
    let key = '';
    if (item.ancestors && item.ancestors.length > 0) {
      key = item.ancestors.map((ancestor) => `/${categoryMap[ancestor.id].slug.en}`).join('');
    }
    key += `/${item.slug.en}`;

    const value = item.name.en;
    acc[key] = value;
    return acc;
  }, {});

  return breadcrumbNameMap;
};

export default getCategoriesBreadcrumb;
