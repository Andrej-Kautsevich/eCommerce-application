import { Category /* , CategoryReference */ } from '@commercetools/platform-sdk';

type ParsedCategory = {
  id: string;
  name: string;
  slug: string;
  ancestors: /* CategoryReference[] | */ ParsedCategory[];
};

const parseCategories = (data: Category[]): ParsedCategory[] => {
  const categoryMap: { [key: string]: ParsedCategory[] } = {};

  data.forEach((item: Category) => {
    if (item.parent) {
      if (!categoryMap[item.parent?.id]) {
        categoryMap[item.parent?.id] = [];
      }
      const parsedCategory: ParsedCategory = {
        id: item.id,
        name: item.name.en,
        slug: item.slug.en,
        ancestors: /* item.ancestors.length !== 0 ? item.ancestors : */ [], // TODO add many subcategories support
      };
      categoryMap[item.parent?.id].push(parsedCategory);
    }
  });

  return data.map((item: Category) => ({
    id: item.id,
    name: item.name.en,
    slug: item.slug.en,
    ancestors: categoryMap[item.id] || [],
  }));
};

export default parseCategories;
