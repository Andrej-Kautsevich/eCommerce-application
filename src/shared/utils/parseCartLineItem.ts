import { Image, LineItem } from '@commercetools/platform-sdk';
import { PRODUCT_IMAGE_PLACEHOLDER } from '../constants';

type ParsedLineItem = {
  id: string;
  productId: string;
  name: string;
  images: Image[];
  price: string;
  discountPrice: string | undefined;
  totalPrice: string;
  quantity: number;
};

const defaultLineItem = {
  images: [PRODUCT_IMAGE_PLACEHOLDER],
};

const parseLineItem = (item: LineItem): ParsedLineItem => {
  let { images } = defaultLineItem;
  let discountPrice;
  const price = `$${item.price.value.centAmount / 100}`;
  const totalPrice = `$${item.totalPrice.centAmount / 100}`;

  if (item.variant.images) {
    images = item.variant.images;
  }

  if (item.price.discounted) {
    discountPrice = `$${item.price.discounted.value.centAmount / 100}`;
  }

  return {
    id: item.id,
    productId: item.productId,
    name: item.name.en,
    images,
    price,
    discountPrice,
    totalPrice,
    quantity: item.quantity,
  };
};

export default parseLineItem;
