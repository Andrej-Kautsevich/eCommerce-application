import { Image, LineItem } from '@commercetools/platform-sdk';
import { PRODUCT_IMAGE_PLACEHOLDER } from '../constants';

type ParsedLineItem = {
  id: string;
  productId: string;
  name: string;
  images: Image[];
  prices: {
    price: string; // one item full price
    discountPrice: string | undefined; // one item discount price. Applied directly without discount codes
    totalFullPrice: string; // total price * quantity
    totalDiscountedPrice: string | undefined; // total price with applied discount codes
  };
  quantity: number;
};

const defaultLineItem = {
  images: [PRODUCT_IMAGE_PLACEHOLDER],
};

const parseLineItem = (item: LineItem): ParsedLineItem => {
  let { images } = defaultLineItem;
  let discountPrice;
  const price = `$${item.price.value.centAmount / 100}`;
  let totalFullPrice = `$${item.totalPrice.centAmount / 100}`;
  if (item.price.discounted) {
    discountPrice = `$${item.price.discounted.value.centAmount / 100}`;
  }

  let totalDiscountedPrice;
  if (item.discountedPricePerQuantity.length) {
    const totalDiscountedPriceAmount = item.discountedPricePerQuantity.reduce(
      (acc, discountedItemPrice) =>
        acc + discountedItemPrice.discountedPrice.value.centAmount * discountedItemPrice.quantity,
      0,
    );
    const totalFullPriceAmount = item.price.value.centAmount * item.quantity;

    // check if discount code reduce total price
    if (totalFullPriceAmount !== totalDiscountedPriceAmount) {
      totalDiscountedPrice = `$${totalDiscountedPriceAmount / 100}`;
      totalFullPrice = `$${totalFullPriceAmount / 100}`;
    }
  }

  if (item.variant.images) {
    images = item.variant.images;
  }

  return {
    id: item.id,
    productId: item.productId,
    name: item.name.en,
    images,
    prices: {
      price,
      discountPrice,
      totalDiscountedPrice,
      totalFullPrice,
    },
    quantity: item.quantity,
  };
};

export default parseLineItem;
