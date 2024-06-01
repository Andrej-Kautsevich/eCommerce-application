import { Image, ProductProjection } from '@commercetools/platform-sdk';
import { PRODUCT_DESCRIPTION_PLACEHOLDER, PRODUCT_IMAGE_PLACEHOLDER } from '../constants';

type ParsedProduct = {
  id: string;
  name: string;
  description: string;
  images: Image[];
  price: string;
};

const defaultProduct = {
  description: PRODUCT_DESCRIPTION_PLACEHOLDER,
  images: PRODUCT_IMAGE_PLACEHOLDER,
  price: 'product unavailable',
};

const parseProduct = (product: ProductProjection): ParsedProduct => {
  let { description, images, price } = defaultProduct;

  if (product.description) {
    description = product.description.en;
  }

  if (product.masterVariant.images && product.masterVariant.images.length !== 0) {
    images = product.masterVariant.images;
  }

  if (product.masterVariant.prices) {
    price = `$${product.masterVariant.prices[0].value.centAmount / 100}`;
  }

  const parsedProduct: ParsedProduct = {
    id: product.id,
    name: product.name.en,
    description,
    images,
    price,
  };

  return parsedProduct;
};

export default parseProduct;
